'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { useDebouncedCallback } from "use-debounce";
import { clientApi } from "@/lib/api/clientApi";
import { NoteList } from "@/components/NoteList/NoteList";
import { Pagination } from "@/components/Pagination/Pagination";
import { SearchBox } from "@/components/SearchBox/SearchBox";
import { NoteTag } from "@/types/note";
import css from "./NotesPage.module.css";

export default function NotesClient({ activeTag }: { activeTag?: NoteTag }) {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  
  useEffect(() => {
    if (page !== 1) {
      setPage(1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTag]);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["notes", activeTag, page, search], 
    queryFn: () => clientApi.fetchNotes({ 
      page,
      perPage: 12,
      search, 
      tag: activeTag 
    }),
    placeholderData: keepPreviousData,
  });

  const handleSearch = useDebouncedCallback((value: string) => {
    setSearch(value);
    setPage(1);
  }, 500);

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox onChange={handleSearch} />
        {data && data.totalPages > 1 && (
          <Pagination
            totalPages={data.totalPages}
            currentPage={page}
            onPageChange={(newPage) => setPage(newPage)}
          />
        )}
        <Link href="/notes/action/create" className={css.button}>
          Create note +
        </Link>
      </header>

      <main>
        {isLoading && <p>Завантаження нотаток...</p>}
        {isError && <p style={{ color: 'red' }}>Сталася помилка при завантаженні (400 Bad Request).</p>}
        
        {data && data.notes.length > 0 ? (
          <NoteList notes={data.notes} />
        ) : (
          !isLoading && <p>Нотаток не знайдено</p>
        )}
      </main>
    </div>
  );
}