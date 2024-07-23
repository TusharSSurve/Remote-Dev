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

function App() {
  // state
  const [searchText, setSearchText] = useState("");
  const debouncedSearchText = useDebounce(searchText);
  const [jobItems, isLoading] = useJobItems(debouncedSearchText);
  const [currentPage, setCurrentPage] = useState(1);

  // computed state
  const total = jobItems?.length || 0;
  const totalPages = total / 7;
  const jobItemsSliced = jobItems?.slice(currentPage * 7 - 7, currentPage * 7) || [];

  // event handlers
  const handleChangePage = (direction: 'next' | 'prev') => {
    if (direction === 'next') {
      setCurrentPage(prev => prev + 1)
    }
    else if (direction === 'prev') {
      setCurrentPage(prev => prev - 1)
    }
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
          <SortingControls />
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
