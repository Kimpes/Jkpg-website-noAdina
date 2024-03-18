// dependencies import
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";

import StoreCard from "@/components/StoreCard";
import EventCard from "@/components/EventCard";

export default function Home() {
  const [stores, setStores] = useState([]);
  const [filteredStores, setFilteredStores] = useState([]);
  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedFilters, setSelectedFilters] = useState([]);

  let types = ["Shoppa", "Health", "Upplev", "Äta", "Sova"];
  let locations = [
    "Atollen",
    "Öster",
    "Väster",
    "Högskolan",
    "Resecentrum",
    "Rådhusparken",
    "Spira",
    "Tändsticksområdet",
  ];

  useEffect(() => {
    async function fetchAllStores() {
      await fetch("/api/stores/controller")
        .then((res) => res.json())
        .then((data) => {
          setStores(data);
          setFilteredStores(data);
        });
    }

    fetchAllStores();
  }, []);

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

  const handleFilterOnClick = (selectedItem) => {
    if (selectedFilters.includes(selectedItem)) {
      let types = selectedFilters.filter((el) => el !== selectedItem);
      setSelectedFilters(types);
    } else {
      setSelectedFilters([selectedFilters, selectedItem].flat(1));
    }
  };

  useEffect(() => {
    filterItems();
  }, [selectedFilters]);

  const filterItems = () => {
    if (selectedFilters.length > 0) {
      let tempItems = selectedFilters.map((selectedItem) => {
        let temp = stores.filter(
          (store) =>
            store.type === selectedItem || store.district === selectedItem
        );
        return temp;
      });
      setFilteredStores(tempItems.flat());
    } else {
      setFilteredStores([...stores]);
    }
  };

  // write html down here, <main> has to wrap around everything
  // instead of "class", write "className" instead like shown in <button>. it should autofill it automatically
  return (
    <div>
      <div className="herosection">
        <img src="/assets/map.jpg" alt="" />
      </div>
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
          <h5>Sort by type</h5>
          <ul className="page-selection-buttons">
            {types.map((type, index) => (
              <li>
                <a
                  onClick={() => handleFilterOnClick(type)}
                  className={`primary-button ${
                    selectedFilters.includes(type) ? "active" : ""
                  }`}
                  key={`filters-${index}`}
                >
                  <img src={`/assets/${type}.png`} alt="" />
                  <h4>{type.toUpperCase()}</h4>
                </a>
              </li>
            ))}
            <li>
              <div className="searchbar">
                <img src="/assets/hitta.png" alt="" />
                <input
                  type="text"
                  id="search"
                  name="search"
                  placeholder="SEARCH"
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </li>
          </ul>
          <h5>Sort by location</h5>
          <div className="store-filter">
          <ul className="page-selection-buttons">
           
          {locations.map((location, index) => (
            <li>
                <a
                  onClick={() => handleFilterOnClick(location)}
                  className={`primary-button ${
                    selectedFilters.includes(location) ? "active" : ""
                  }`}
                  key={`filters-${index}`}
                >
                  <div className="image">
                  <img src={`/assets/${location}.png`} alt="" />
                  </div>

                  <h4>{location.toUpperCase()}</h4>
                </a>
            </li>
            ))}
          </ul>
          </div>
        </div>
        <div className="grid grid-flow-row grid-cols-3 gap-x-3 gap-y-3 place-content-center">
          {(!!filteredStores && filteredStores)
            .filter((store) => {
              return search.toLowerCase === ""
                ? store
                : store.name.toLowerCase().includes(search);
            })
            .sort((a, b) => a.name.localeCompare(b.name))
            .map((store) => {
              return (
                <StoreCard
                  name={store.name}
                  id={store.id}
                  district={store.district}
                  key={store.id}
                  type={store.type}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
}
