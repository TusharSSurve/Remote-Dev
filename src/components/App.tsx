import { useState } from "react";
import Background from "./layout/Background";
import Container from "./layout/Container";
import Footer from "./layout/Footer";
import Header from "./layout/Header";
import Logo from "./layout/Logo";
import BookmarksButton from "./bookmark/BookmarksButton";
import SearchForm from "./layout/SearchForm";
import Sidebar from "./layout/Sidebar";
import JobItemContent from "./job/JobItemContent";
import ResultsCount from "./ResultsCount";
import SortingControls from "./controls/SortingControls";
import JobList from "./job/JobList";
import PaginationControls from "./controls/PaginationControls";
import { useDebounce, useJobItems } from "../lib/hooks";
import { Toaster } from "react-hot-toast";
import { RESULTS_PER_PAGE } from "../lib/constants";
import { SortBy } from "../lib/types";

function App() {
  // state
  const [searchText, setSearchText] = useState("");
  const debouncedSearchText = useDebounce(searchText);
  const [jobItems, isLoading] = useJobItems(debouncedSearchText);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState<SortBy>('relevant');

  // computed state
  const total = jobItems?.length || 0;
  const totalPages = total / RESULTS_PER_PAGE;
  const jobItemsSorted = [...(jobItems || [])].sort((a, b) => {
    if (sortBy === 'relevant') {
      return b.relevanceScore - a.relevanceScore
    } else {
      return a.daysAgo - b.daysAgo
    }
  })
  const jobItemsSliced = jobItemsSorted.slice(currentPage * RESULTS_PER_PAGE - RESULTS_PER_PAGE, currentPage * RESULTS_PER_PAGE);

  // event handlers
  const handleChangePage = (direction: 'next' | 'prev') => {
    if (direction === 'next') {
      setCurrentPage(prev => prev + 1)
    }
    else if (direction === 'prev') {
      setCurrentPage(prev => prev - 1)
    }
  }

  const handleSortBy = (newSortBy: SortBy) => {
    setCurrentPage(1);
    setSortBy(newSortBy);
  }

  return <>
    <Background />
    <Header>
      <div className="header__top">
        <Logo />
        <BookmarksButton />
      </div>
      <SearchForm setSearchText={setSearchText} searchText={searchText} />
    </Header>
    <Container>
      <Sidebar>
        <div className="sidebar__top">
          <ResultsCount total={total} />
          <SortingControls onClick={handleSortBy} sortBy={sortBy} />
        </div>
        <JobList jobItems={jobItemsSliced} isLoading={isLoading} />
        <PaginationControls onClick={handleChangePage} currentPage={currentPage} totalPages={totalPages} />
      </Sidebar>
      <JobItemContent />
    </Container>
    <Footer />
    <Toaster position="top-right" />
  </>;
}

export default App;
