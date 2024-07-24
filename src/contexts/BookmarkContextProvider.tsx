import { createContext, useEffect, useState } from "react";

type TBookmark = {
  children: React.ReactNode
}
export const BookmarkContext = createContext(null);

export default function BookmarkContextProvider({ children }: TBookmark) {
  const [bookmarkIDs, setBookmarkIDs] = useState<number[]>(() => JSON.parse(localStorage.getItem('bookmarkedIds') || "[]"));


  const handleToggleBookmark = (id: number) => {
    if (bookmarkIDs.includes(id)) {
      setBookmarkIDs((prev) => prev.filter((item) => item !== id))
    } else {
      setBookmarkIDs((prev) => [...prev, id]);
    }
  }

  useEffect(() => {
    localStorage.setItem('bookmarkedIds', JSON.stringify(bookmarkIDs))
  }, [bookmarkIDs]);

  return (
    <BookmarkContext.Provider value={{ bookmarkIDs, handleToggleBookmark }}>{children}</BookmarkContext.Provider>
  )
}
