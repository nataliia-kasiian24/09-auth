import { serverApi } from '@/lib/api/serverApi';
import { notFound } from 'next/navigation';
import css from './ProfilePage.module.css';
import Image from 'next/image';

export default async function ProfilePage() {
  const response = await serverApi.checkSession();

  if (!response || !response.data) {
    return notFound();
  }

  const { avatar, username, email } = response.data;

  return (
    <main className={css.profileContainer}>
      <h1 className={css.title}>My Profile</h1>

      <div className={css.infoCard}>
        <div className={css.avatarWrapper}>
          <Image
            src={avatar || '/default-avatar.png'}
            alt={`${username}'s avatar`}
            className={css.avatar}
          />
        </div>

        <div className={css.details}>
          <div className={css.field}>
            <span className={css.label}>Username:</span>
            <span className={css.value}>{username}</span>
          </div>

          <div className={css.field}>
            <span className={css.label}>Email:</span>
            <span className={css.value}>{email}</span>
          </div>
        </div>
      </div>
    </main>
  );
}
