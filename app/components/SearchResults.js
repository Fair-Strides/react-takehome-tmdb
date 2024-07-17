"use client";
import React from "react";
import Image from "next/image";
import { useState } from "react";
import useSWR from "swr";
import styles from "../page.module.css";
import { createPortal } from "react-dom";
import { MovieDetails } from "./MovieDetails.js";

const fetcher = (...args) =>
  fetch(...args).then(async (res) => await res.json());

function SearchResults({ query }) {
  let results = [];
  let [showDetails, setShowDetails] = useState(false);
  let [movieId, setMovieId] = useState(-1);

  function setMovieDetails(id, status = true) {
    setMovieId(id);
    setShowDetails(status);
  }

  /**
   * This section should search for movies based on the input in the search bar.
   *
   * To do so, we will get the input and send it to one of our Django API endpoints
   * through a server-side route with a bit of processing to see if we actually need
   * to fetch new results or make use of cached results.
   */
  // Send the search query to our Django API
  let searchQuery = "none";
  if (query !== null) {
    searchQuery = query ? query : "__";
  }
  const { data, error } = useSWR(`api/search/${searchQuery}`, fetcher);

  if (data) {
    if (data.data.results) results = data.data.results;
  } else if (error) {
    console.error("Error fetching search results:", error);
  }

  console.log("SearchResults: ", movieId);
  return (
    <div className={styles.searchListContainer}>
      <>
        {results.length > 0 &&
          results
            .filter((result) => result.overview?.length > 0)
            .map((result) => (
              <div key={result.id} className={styles.card}>
                <div className={styles.cardImage}>
                  <Image
                    src={`https://image.tmdb.org/t/p/w500${result.poster_path}`}
                    alt={result.title}
                    width={200}
                    height={300}
                    priority
                  />
                </div>
                <div className={styles.cardContent}>
                  <h2>
                    {result.title}{" "}
                    <span className={styles.cardReleaseDate}>
                      {formatReleaseDate(result.release_date)}
                    </span>
                  </h2>
                  <hr />
                  <p>{result.overview}</p>
                  <br />
                  <br />
                  <br />
                  <button onClick={() => setMovieDetails(result.id)}>
                    View Details
                  </button>
                </div>
                {/* {movieId === result.id && (
                                
                            )} */}
              </div>
            ))}
        {results.length === 0 && searchQuery !== "none" && (
          <p>No results found</p>
        )}
        {showDetails &&
          createPortal(
            <dialog className={styles.modal}>
              <div
                style={{
                  width: "80%",
                  marginRight: "auto",
                  marginLeft: "auto",
                }}
              >
                <MovieDetails id={movieId} />
                <br />
                <button
                  onClick={() => setMovieDetails(-1, false)}
                  style={{
                    width: "100%",
                    marginTop: "10px",
                    fontSize: "1.5rem",
                    borderRadius: "15px",
                  }}
                >
                  Close
                </button>
              </div>
            </dialog>,
            document.body
          )}
      </>
    </div>
  );
}

function formatReleaseDate(date) {
  if (date === null) {
    return "Unknown release date";
  }
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export { SearchResults };
