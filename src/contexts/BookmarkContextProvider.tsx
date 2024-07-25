import { createContext } from "react";
import { useLocalStorage } from "../lib/hooks";

type TBookmark = {
  children: React.ReactNode
}
type BookmarkContext = {
  bookmarkIDs: number[];
  handleToggleBookmark: (id: number) => void;
}
export const BookmarkContext = createContext<BookmarkContext | null>(null);

export default function BookmarkContextProvider({ children }: TBookmark) {
  const [bookmarkIDs, setBookmarkIDs] = useLocalStorage<number[]>('bookmarkedIds', []);

  const handleToggleBookmark = (id: number) => {
    if (bookmarkIDs.includes(id)) {
      setBookmarkIDs((prev) => prev.filter((item) => item !== id))
    } else {
      setBookmarkIDs((prev) => [...prev, id]);
    }
  }

  return (
    <BookmarkContext.Provider value={{ bookmarkIDs, handleToggleBookmark }}>{children}</BookmarkContext.Provider>
  )
}
