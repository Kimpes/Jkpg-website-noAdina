// dependencies import
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";

export default function Home() {
  const [store, setStore] = useState(null);

  useEffect(() => {
    fetch("/api/events/controller");

    // console.log(store.name)
  }, []);

  // write html down here, <main> has to wrap around everything
  // instead of "class", write "className" instead like shown in <button>. it should autofill it automatically
  return (
    <div className="main-content">
      <div>
        <h1>Welcome to Jönköping City</h1>
      </div>
      <a href="/long-page">Go to the long page</a>
    </div>
  );
}
