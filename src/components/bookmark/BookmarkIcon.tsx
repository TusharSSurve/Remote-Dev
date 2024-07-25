import { BookmarkFilledIcon } from "@radix-ui/react-icons";
import { useBookmarkContext } from "../../lib/hooks";

type BookmarkIconProps = {
  id: number
}
export default function BookmarkIcon({ id }: BookmarkIconProps) {
  const { bookmarkIDs, handleToggleBookmark } = useBookmarkContext();
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
