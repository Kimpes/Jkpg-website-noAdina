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
      <div className="page-selection">
        <h2>Verksamheter på Tändsticksområdet</h2>
        <h3>Vad vill du göra?</h3>
        <ul className="page-selection-buttons">
          <li>
            <a href="#">
              <img src="/assets/square-placeholder.svg" alt="" />
              <h4>SHOPPA</h4>
            </a>
          </li>
          <li>
            <a href="#">
              <img src="/assets/square-placeholder.svg" alt="" />
              <h4>MÅ BRA</h4>
            </a>
          </li>
          <li>
            <a href="#">
              <img src="/assets/square-placeholder.svg" alt="" />
              <h4>UPPLEV</h4>
            </a>
          </li>
          <li>
            <a href="#">
              <img src="/assets/square-placeholder.svg" alt="" />
              <h4>ÄTA</h4>
            </a>
          </li>
          <li>
            <a href="#">
              <img src="/assets/square-placeholder.svg" alt="" />
              <h4>SOVA</h4>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
