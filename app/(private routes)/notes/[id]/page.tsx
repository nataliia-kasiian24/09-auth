import { Metadata } from "next";
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { serverApi } from '@/lib/api/serverApi';
import NoteDetailsClient from './NoteDetails.client';


interface NotePageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: NotePageProps): Promise<Metadata> {
  const { id } = await params;
  
  try {
    const note = await serverApi.fetchNoteById(id);
    const title = `${note.title} | NoteHub`;
    const description = note.content.substring(0, 160); 

    return {
      title,
      description,
      openGraph: {
        title,
        description,
        url: `https://08-zustand-rose-eta.vercel.app/notes/${id}`,
        images: ["https://ac.goit.global/fullstack/react/notehub-og-meta.jpg"],
        type: "article",
      },
    };
  } catch {
    return { title: "Note Details | NoteHub" };
  }
}


export default async function NoteDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params; 
  
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['note', id], 
    queryFn: () => serverApi.fetchNoteById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient />
    </HydrationBoundary>
  );
}