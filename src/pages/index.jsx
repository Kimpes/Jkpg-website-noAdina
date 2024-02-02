// dependencies import
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";

export default function Home() {
  const [data, setData] = useState(null);
  const [factGenerator, setFact] = useState(0);

  useEffect(() => {
    setData("Loading...");

    fetch("/api/catfact")
      .then((res) => res.json())
      .then((data) => {
        setData(data.fact);
      });
  }, [factGenerator]);

  // write html down here, <main> has to wrap around everything
  // instead of "class", write "className" instead like shown in <button>. it should autofill it automatically
  return (
    <main>
      <div className="fact-generator">
        <div>
          <h5>{data}</h5>
        </div>
        <button
          className="px-4 py-1 border border-white"
          onClick={() => setFact((previousFact) => previousFact + 1)}
        >
          Generate another fact
        </button>
      </div>
      <a className="button" href="/stores">
        Stores
      </a>
    </main>
  );
}
