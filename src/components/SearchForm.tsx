import { useEffect, useState } from "react";

export default function SearchForm() {
  const [searchText, setSearchText] = useState("");
  const [jobItems, setJobItems] = useState([]);

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
  return (
    <form action="#" className="search" onSubmit={(e) => e.preventDefault()}>
      <button type="submit">
        <i className="fa-solid fa-magnifying-glass"></i>
      </button>

      <input
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        spellCheck="false"
        type="text"
        required
        placeholder="Find remote developer jobs..."
      />
    </form>
  );
}
