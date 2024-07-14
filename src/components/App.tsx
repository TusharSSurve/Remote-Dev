import { useEffect, useState } from "react";
import Background from "./Background";
import Container from "./Container";
import Footer from "./Footer";
import Header from "./Header";

function App() {
  const [jobItems, setJobItems] = useState([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    if (!searchText) return;
    fetch(`https://bytegrad.com/course-assets/projects/rmtdev/api/data?search=${searchText}`).then(res => {
      if (!res.ok) {
        return
      }
      return res.json()
    }).then(data => {
      setJobItems(data.jobItems);
    })
  }, [searchText]);

  return <>
    <Background />
    <Header searchText={searchText} setSearchText={setSearchText} />
    <Container jobItems={jobItems} />
    <Footer />
  </>;
}

export default App;
