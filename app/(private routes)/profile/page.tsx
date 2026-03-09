import type { Metadata } from 'next';
import { serverApi } from '@/lib/api/serverApi';
import { notFound } from 'next/navigation';
import css from './ProfilePage.module.css';
import Image from 'next/image';
import { User } from '@/types/user';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Profile Page',
  description: 'User profile details',
};

export default async function ProfilePage() {
  const response = await serverApi.checkSession();

  if (!response) {
    return notFound();
  }

  const userData = response as unknown as User;

  const user = 'data' in userData ? (userData.data as User) : userData;

  if (!user || !user.email) {
    return notFound();
  }

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <div className={css.header}>
          <h1 className={css.formTitle}>Profile Page</h1>
          <Link href="/profile/edit" prefetch={false} className={css.editProfileButton}>
            Edit Profile
          </Link>
        </div>

        <div className={css.avatarWrapper}>
          <Image
            src={user.avatar || '/default-avatar.png'}
            alt="User Avatar"
            width={120}
            height={120}
            className={css.avatar}
            priority
          />
        </div>

        <div className={css.profileInfo}>
          <p>Username: {user.username || 'your_username'}</p>
          <p>Email: {user.email}</p>
        </div>
      </div>
    </main>
  );
}
