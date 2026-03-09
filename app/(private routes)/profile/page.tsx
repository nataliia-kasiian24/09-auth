import type { Metadata } from 'next';
import { serverApi } from '@/lib/api/serverApi';
import { notFound } from 'next/navigation';
import css from './ProfilePage.module.css';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Profile Page',
  description: 'User profile details',
};

export default async function ProfilePage() {
  
  const response = await serverApi.checkSession();

 
  if (!response || response.status !== 200 || !response.data) {
    return notFound();
  }

  
  const user = response.data;

  
  if (!user.email) {
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