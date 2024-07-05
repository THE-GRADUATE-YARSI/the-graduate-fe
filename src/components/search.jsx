import { useEffect } from "react";
import { useRef } from "react";

function Search({ query, setQuery }) {
    const inputEl = useRef(null);
  
    useEffect(() => {
      function callback(e) {
        if (document.activeElement === inputEl.current) return;
    
        if (e.code === "Enter") {
          inputEl.current.focus();
          setQuery("");
        }
      }
    
      document.addEventListener("keydown", callback);
      return () => document.removeEventListener("keydown", callback);
    }, [setQuery]);
  
  
    return (
      <input
      className="p-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-sm sm:text-sm focus:ring-1 ms-1"
  
        type="text"
        placeholder="Cari mahasiswa"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        ref={inputEl}
      />
    );
  }

  export default Search;
