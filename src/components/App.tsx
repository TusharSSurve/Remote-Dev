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

function App() {
  const [searchText, setSearchText] = useState("");
  const debouncedSearchText = useDebounce(searchText);
  const [jobItems, isLoading] = useJobItems(debouncedSearchText);

  const total = jobItems.length;
  const jobItemsSliced = jobItems.slice(0, 7);
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
        <PaginationControls />
      </Sidebar>
      <JobItemContent />
    </Container>
    <Footer />
  </>;
}

export default App;
