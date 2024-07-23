import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons";
type TPagination = {
  onClick: (direction: 'next' | 'prev') => void;
  currentPage: number;
  totalPages: number;
}
export default function PaginationControls({ onClick, currentPage, totalPages }: TPagination) {
  return <section className="pagination">
    {
      currentPage > 1 && <button onClick={(e) => {
        onClick('prev');
        e.currentTarget.blur()
      }} className="pagination__button pagination__button--back">
        <ArrowLeftIcon />
        Page {currentPage - 1}</button>
    }
    {
      currentPage < totalPages && <button onClick={(e) => {
        onClick('next')
        e.currentTarget.blur()
      }} className="pagination__button pagination__button--next">Page {currentPage + 1}
        <ArrowRightIcon />
      </button>
    }

  </section>;
}
