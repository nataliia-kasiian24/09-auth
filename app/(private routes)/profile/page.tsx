import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import css from "./ProfilePage.module.css";

export const metadata: Metadata = {
  title: "Profile | NoteHub",
  description: "View and edit your NoteHub profile information.",
};

export default function ProfilePage() {
  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <div className={css.header}>
          <h1 className={css.formTitle}>Profile Page</h1>
          <Link href="/profile/edit" className={css.editProfileButton}>
            Edit Profile
          </Link>
        </div>
        
        <div className={css.avatarWrapper}>
          <Image
            src="https://ac.goit.global/fullstack/react/avatar.png" 
            alt="User Avatar"
            width={120}
            height={120}
            className={css.avatar}
            priority
          />
        </div>

        <div className={css.profileInfo}>
          <p>
            <strong>Username:</strong> your_username
          </p>
          <p>
            <strong>Email:</strong> your_email@example.com
          </p>
        </div>
      </div>
    </main>
  );
}