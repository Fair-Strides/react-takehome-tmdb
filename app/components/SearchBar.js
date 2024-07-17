"use client";
import { useDeferredValue, useState, Suspense } from "react";
import { SearchResults } from "./SearchResults.js";
import styles from "../page.module.css";

function SearchBar() {
  const [shouldSearch, setShouldSearch] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const deferredSearchValue = useDeferredValue(searchValue);

  function searchForMovies() {
    setShouldSearch(true);
  }
  function updateSearchTerm(term) {
    setShouldSearch(false);
    setSearchValue(term);
  }

  return (
    <div style={{ marginBottom: "20%", width: "80%" }}>
      <div
        style={{ marginBottom: "25px", width: "100%", display: "flex" }}
        className={styles.center}
      >
        <input
          id="tmdbSearchInput"
          type="text"
          placeholder="Search..."
          onChange={(e) => updateSearchTerm(e.target.value)}
          onKeyUp={(e) => {
            if (e.key === "Enter") {
              searchForMovies();
            }
          }}
          value={searchValue}
          style={{
            // width: "200%",
            flex: "1 0 auto",
            height: "50px",
            fontSize: "1.5rem",
            zIndex: "1",
          }}
        />
        <button
          id="tmdbSearch"
          onClick={searchForMovies}
          style={{ fontSize: "1.5rem", height: "50px" }}
        >
          Search
        </button>
      </div>
      <div>
        {shouldSearch ? (
          <SearchResults query={deferredSearchValue} />
        ) : (
          <SearchResults query={null} />
        )}
      </div>
    </div>
  );
}

export { SearchBar };
