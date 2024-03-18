import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Page() {
  const router = useRouter();
  const [store, setStore] = useState([]); //could we make it an object instead of an array?

  useEffect(() => {
    // console.log(queryParams)
    async function fetchData() {
      if (!router.isReady) return;

      await fetch("/api/stores/controller", {
        method: "PUT", //i mean, it's not a post request really, so we should change this
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(router.query),
      })
        .then((res) => res.json())
        .then((data) =>
          setStore([data.id, data.name, data.district, data.type, data.url])
        );
    }

    fetchData();
  }, [router.isReady]);

  async function deleteStore() {
    await fetch("/api/stores/controller", {
      method: "DELETE",
      body: JSON.stringify(router.query),
    });

    router.push("/stores");
  }

  return (
    <div>
      <div className="herosection item-page">
        <div className="page-header">
          <span>
            <h1>{store[1] /*Store name*/}</h1>
            <button
              className="primary-button"
              onClick={() => router.push(`/stores/${store[0]}/edit`)}
            >
              edit
            </button>
          </span>
        </div>
      </div>
      <ul className="page-selection-buttons">
        <li>
          <a>
            <img src={`/assets/${store[3]}.png`} alt="" />
            <h4>{store[3]}</h4>
          </a>
        </li>
        <li>
          <a href="">
            <div className="image">
              <img src={`/assets/${store[2]}.png`} alt="" />
            </div>
            <h4>{store[2]}</h4>
          </a>
        </li>
        <li>
          <a href={`${store[4]}`}>
            <img src="/assets/Link.png" alt="" />
            <h4>Website</h4>
          </a>
        </li>
        {/* <div className="button-delete">
          <li>
            <a href="" onClick={() => deleteStore(store[0])}>
              <img src="/assets/Link.png" alt="" />
              <h4>Delete</h4>
            </a>
          </li>
        </div> */}
      </ul>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce orci sem,
        lacinia ut magna gravida, ornare venenatis felis. Integer in augue sit
        amet dolor sodales auctor sed vitae augue. Vestibulum posuere non libero
        id venenatis. Suspendisse eu leo elementum, tincidunt justo id, finibus
        nunc. Suspendisse potenti.
      </p>

      <div className="buttons-container">
        <button className="danger-button" onClick={() => deleteStore()}>
          Delete store
        </button>
      </div>
    </div>
  );
}
