import React, { useState } from "react";
import axios from "axios";

export default function WikiSearch() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const res = await axios.get(
        `http://localhost:5000/api/wiki?query=${encodeURIComponent(query)}`
      );
      setResult(res.data);
    } catch (err) {
      setError("Could not fetch data. Check spelling or try another place.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-6 p-6">
      {/* Search Bar */}
      <form onSubmit={handleSearch} className="flex gap-2 w-full max-w-md">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter a tourist place..."
          className="flex-1 p-2 rounded-2xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-2xl shadow hover:bg-blue-600"
        >
          Search
        </button>
      </form>

      {/* Loading */}
      {loading && <p className="text-gray-600">Fetching data...</p>}

      {/* Error */}
      {error && <p className="text-red-500">{error}</p>}

      {/* Result */}
      {result && !loading && (
        <div className="max-w-lg bg-white rounded-2xl shadow p-4">
          {result.thumbnail?.source && (
            <img
              src={result.thumbnail.source}
              alt={result.title}
              className="w-full rounded-xl mb-4"
            />
          )}
          <h2 className="text-xl font-bold">{result.title}</h2>
          {result.description && (
            <p className="text-gray-600 italic">{result.description}</p>
          )}
          <p className="mt-2">{result.extract}</p>

          <a
            href={result.content_urls?.desktop?.page}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline mt-3 inline-block"
          >
            Read more on Wikipedia →
          </a>
        </div>
      )}
    </div>
  );
}
