import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Page() {
  const router = useRouter();
  const [store, setStore] = useState([]); //could we make it an object instead of an array?

  useEffect(() => {
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

  return (
    <div>
      <ul>
        <li>{store[0]}</li>
        <li>{store[1]}</li>
        <li>{store[2]}</li>
        <li>{store[3]}</li>
      </ul>
      <button className="primary-button">Edit store</button>
    </div>
  );
}
