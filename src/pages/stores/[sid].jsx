import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Page({params}) {
  const queryParams = params;
  const router = useRouter();
  const [store, setStore] = useState([]); //could we make it an object instead of an array?

  useEffect(() => {
    // console.log(queryParams)
    async function fetchData() {
      if (!router.isReady) return;

      await fetch("/api/stores/controller", {
        method: "POST", //i mean, it's not a post request really, so we should change this
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(router.query),
      })
        .then((res) => res.json())
        .then((data) =>
          setStore([data.id, data.name, data.district, data.type])
        );
    }

    fetchData();
  }, [router.isReady]);

  async function deleteStore() {
    await fetch("/api/stores/controller", {
      method: "DELETE"
    })
  }

  return (
    <div>
      <h1>{ store[1] /*Store name*/ }</h1>
      <ul>
        <li>ID: {store[0]}</li>
        <li>District: {store[2]}</li>
        <li>Type: {store[3]}</li>
      </ul>
      <div className="buttons-container">
        <button className="primary-button">Edit store</button>
        <button className="danger-button" onClick={deleteStore}>Delete store</button>
      </div>
      
    </div>
  );
}
