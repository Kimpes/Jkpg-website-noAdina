// dependencies import
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";

import StoreCard from "@/components/StoreCard"
import EventCard from "@/components/EventCard";

export default function Home() {
  const [stores, setStores] = useState([]);
  const [events, setEvents] = useState([]);

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
        </ul>
        <div className='grid grid-flow-row grid-cols-3 gap-x-5 gap-y-5 place-content-center'>
        {
          !!stores && stores.map((store) => {
            return (
              <StoreCard 
                name={store.name}
                id={store.id}
              />
            )
          })
        }
      </div>
      </div>
    
    </div>
  );
}
