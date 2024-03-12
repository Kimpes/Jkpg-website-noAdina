// dependencies import
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";

import StoreCard from "@/components/StoreCard"
import EventCard from "@/components/EventCard";

export default function Home() {
  const [stores, setStores] = useState([]);
  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function fetchAllStores() {
      await fetch('/api/stores/controller')
        .then((res) => res.json())
        .then((data) => {
          setStores(data)
        });
    }

    fetchAllStores();
  }, [])

  useEffect(() => {
    fetch("/api/events/controller");

    // console.log(store.name)
  }, []);

  useEffect(() => {
    async function fetchAllEvents() {
      await fetch("/api/events/controller")
        .then((res) => res.json())
        .then((data) => {
          setEvents(data);
        });
    }

    fetchAllEvents();
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
           <div className="grid grid-flow-row grid-cols-3 gap-x-16 gap-y-6 place-content-center event-card-container">
        {!!events &&
          events.map((event) => {
            return <EventCard name={event.title} id={event.id} />;
          })}
      </div>
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
          <li>
            <div className="searchbar">
            <img src="/assets/search_icon.svg" alt="" />
              <input
                type="text"
                id="search"
                name="search"
                placeholder="Search"
                onChange={(e) => setSearch(e.target.value)}
               
              />
              
            </div>
        </li>
        </ul>
          <input type="submit" value="Filter" />
      </div>
          <div className="grid grid-flow-row grid-cols-3 gap-x-3 gap-y-3 place-content-center">
            {!!stores &&
              stores
                .filter((store) => {
                  return search.toLowerCase === ""
                    ? store
                    : store.name.toLowerCase().includes(search);
                })
                .map((store) => {
                  return (
                    <StoreCard
                      name={store.name}
                      id={store.id}
                      district={store.district}
                    />
                  );
                })}
          </div>
      </div>
  );
}
