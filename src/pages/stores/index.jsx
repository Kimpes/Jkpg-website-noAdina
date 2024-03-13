import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import StoreCard from "@/components/StoreCard";

export default function index(props) {
  const [stores, setStores] = useState([]);
  const [filteredStores, setFilteredStores] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedFilters, setSelectedFilters] = useState([]);
  const router = useRouter();

  let filters = [
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
        });
    }

    fetchAllStores();
  }, []);

  const handleFilterOnClick = (selectedLocation) => {
    if (selectedFilters.includes(selectedLocation)) {
      let filters = selectedFilters.filter((el) => el !== selectedLocation);
      setSelectedFilters(filters);
    } else {
      setSelectedFilters([selectedFilters, selectedLocation].flat(1));
    }
  };

  useEffect(() => {
    filterItems();
  }, [selectedFilters]);

  const filterItems = () => {
    if (selectedFilters.length > 0) {
      let tempItems = selectedFilters.map((selectedLocation) => {
        let temp = stores.filter(
          (store) => store.district === selectedLocation
        );
        return temp;
      });
      setFilteredStores(tempItems.flat());
    } else {
      setFilteredStores([...stores]);
    }
  };

  return (
    <main>
      <div className="store-filter">
        <div className="store-filter-location">
          <h5>Location</h5>
          {filters.map((location, index) => (
            <button
              onClick={() => handleFilterOnClick(location)}
              className={`primary-button ${
                selectedFilters.includes(location) ? "active" : ""
              }`}
              key={`filters-${index}`}
            >
              {location}
            </button>
          ))}
        </div>
        <div className="searchbar">
          <input
            type="text"
            id="search"
            name="search"
            placeholder="Search"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <input type="submit" value="Filter" />
      </div>
      <div className="grid grid-flow-row grid-cols-3 gap-x-10 gap-y-2 place-content-center">
        {(!filteredStores || filteredStores.length === 0
          ? stores
          : filteredStores
        )
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
              />
            );
          })}
      </div>
    </main>
  );
}
