"use client";
import useSWR from "swr";
import Image from "next/image";

const fetcher = (...args) =>
  fetch(...args).then(async (res) => await res.json());

function MovieDetails({ id }) {
  const { data, error } = useSWR(`api/movieDetails/${id}`, fetcher);
  if (data) {
    console.log("MovieDetails: ", data.data);
  }
  return (
    <>
      {data && (
        <>
          <h1 className="flex flex-col gap-1">
            {data.data.title}
            <br />
            <span style={{ fontSize: "1rem", fontStyle: "italic" }}>
              {data.data.tagline}
            </span>
          </h1>
          <hr style={{ marginBottom: "10px" }} />
          <p>
            <strong>Runtime: </strong>
            {formatRuntime(data.data.runtime)}
          </p>
          <p>
            <strong>Budget (USD): </strong>
            {formatMoney(data.data.budget)}
          </p>
          <p>
            <strong>Revenue (USD): </strong>
            {formatMoney(data.data.revenue)}
          </p>
          {data.data.genres && (
            <div>
              <h3 style={{ marginTop: "25px" }}>Genres</h3>
              {data.data.genres.map((genre) => (
                <span
                  key={genre.id}
                  style={{
                    borderRadius: "15px",
                    paddingLeft: "15px",
                    paddingRight: "15px",
                    marginRight: "5px",
                    backgroundColor: "black",
                    color: "#d6d6d6",
                  }}
                >
                  {genre.name}
                </span>
              ))}
            </div>
          )}
          {data.data.production_companies && (
            <div>
              <h3 style={{ marginTop: "25px" }}>Production Companies</h3>
              <ul style={{ listStyle: "none" }}>
                {data.data.production_companies.map((company) => (
                  <li key={company.id}>
                    <Image
                      src={`https://image.tmdb.org/t/p/w500${company.logo_path}`}
                      alt={company.name}
                      height={50}
                      width={50}
                    />{" "}
                    <span style={{ paddingLeft: "15px" }}>{company.name}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          <h3 style={{ marginTop: "25px" }}>Overview</h3>
          <p>{data.data.overview}</p>
          <Image
            src={`https://image.tmdb.org/t/p/w500${data.data.backdrop_path}`}
            alt={data.data.title}
            width={400}
            height={320}
            priority
            style={{ marginTop: "25px" }}
          />
        </>
      )}
      {error && <p>Error fetching movie details</p>}
    </>
  );
}

function formatMoney(amount) {
  return "$" + amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
}

function formatRuntime(runtime) {
  const hours = Math.floor(runtime / 60);
  const minutes = runtime % 60;
  return `${hours}h ${minutes}m`;
}

export { MovieDetails };
