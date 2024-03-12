import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import StoreCard from "@/components/StoreCard";

export default function index(props) {
  const [stores, setStores] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedFilters, setSelectedFilters] = useState([]);
  const router = useRouter();
  console.log(selectedFilters);

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

  const handleFilterOnClick = (selectedLocation) => {
    if (selectedFilters.includes(selectedLocation)) {
      let filters = selectedFilters.filter((el) => el !== selectedLocation);
      setSelectedFilters(filters);
    } else {
      setSelectedFilters([selectedFilters, selectedLocation]);
    }
  };

  // const filterSearch = ({ searchQuery }) => {
  //   const { query } = router;
  //   if (searchQuery) query.searchQuery = searchQuery;

  //   router.push({
  //     pathname: router.pathname,
  //     query: query,
  //   });
  // };

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

  // useEffect(() => {
  //   filterItems();
  // }, [selectedFilters]);

  // const filterItems = () => {
  //   if (selectedFilters.length > 0) {
  //     let tempItems = selectedFilters.map((selectedLocation) => {
  //       let temp = stores.filter(
  //         (store) => store.location === selectedLocation
  //       );
  //       return temp;
  //     });
  //     setStores(tempItems.flat());
  //   } else {
  //     setStores([...stores]);
  //   }
  // };

  return (
    <main>
      <div className="store-filter">
        <div className="store-filter-location">
          <h5>Location</h5>
          {filters.map((location, index) => (
            <button
              onClick={(location) => handleFilterOnClick(location)}
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
    </main>
  );
}

// export async function getServerSideProps({ query }) {
//   const searchQuery = query.query || "";

//   const queryFilter = searchQuery;
// }
