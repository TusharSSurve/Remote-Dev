import { BookmarkFilledIcon } from "@radix-ui/react-icons";
import { useContext } from "react";
import { BookmarkContext } from "../../contexts/BookmarkContextProvider";

type BookmarkIconProps = {
  id: number
}
export default function BookmarkIcon({ id }: BookmarkIconProps) {
  const { bookmarkIDs, handleToggleBookmark } = useContext(BookmarkContext);
  return (
    <button className="bookmark-btn" onClick={(e) => {
      handleToggleBookmark(id)
      e.stopPropagation();
      e.preventDefault();
    }}>
      <BookmarkFilledIcon className={`${bookmarkIDs.includes(id) ? 'filled' : ''}`} />
    </button>
  );
}
