import { Metadata } from 'next';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { notFound } from 'next/navigation';
import { serverApi } from '@/lib/api/serverApi';
import NotesClient from './Notes.client';
import { NoteTag } from '@/types/note';

interface PageProps {
  params: Promise<{ slug: string[] }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const rawTag = slug?.[0] || 'All';
  const formattedTag =
    rawTag.charAt(0).toUpperCase() + rawTag.slice(1).toLowerCase();

  const title = `Notes: ${formattedTag} | NoteHub`;
  const description = `View and manage all your ${formattedTag} notes in one place.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://your-domain.com/notes/filter/${rawTag}`,
      images: ['https://ac.goit.global/fullstack/react/notehub-og-meta.jpg'],
    },
  };
}

export default async function FilteredNotesPage({ params }: PageProps) {
  const { slug } = await params;

  const rawTag = Array.isArray(slug) ? slug[0] : slug;

  const allowedTags: string[] = [
    'Work',
    'Personal',
    'Meeting',
    'Shopping',
    'Todo',
  ];

  let currentTag: NoteTag | undefined = undefined;

  if (rawTag && rawTag !== 'all') {
    const formattedTag =
      rawTag.charAt(0).toUpperCase() + rawTag.slice(1).toLowerCase();

    if (!allowedTags.includes(formattedTag)) {
      return notFound();
    }

    currentTag = formattedTag as NoteTag;
  }

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['notes', currentTag, 1, ''],

    queryFn: () =>
      serverApi.fetchNotes({ page: 1, tag: currentTag, search: '' }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <section>
        <NotesClient activeTag={currentTag} />
      </section>
    </HydrationBoundary>
  );
}
