import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Page() {
  const router = useRouter();
  const [event, setEvent] = useState([]);

  useEffect(() => {
    async function fetchData() {
      if (!router.isReady) return;

      await fetch("/api/events/controller", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(router.query),
      })
        .then((res) => res.json())
        .then((data) =>
          setEvent([data.id, data.title, data.description, data.location, data.type, data.date])
        );
    }

    fetchData();
  }, [router.isReady]);

  return (
    <div>
      <h1>{event[1]}</h1>
      <ul>
        <li>{event[0]}</li>
        <li>{event[2]}</li>
        <li>{event[3]}</li>
        <li>{event[4]}</li>
        <li>{event[5]}</li>
      </ul>
      <div className="buttons-container">
        <button className="primary-button" onClick={() => router.push(`/events/${ event[0] }/edit`)}>Edit event</button>
        <button className="danger-button" onClick={() => deleteStore()}>Delete event</button>
      </div>
    </div>
  );
}
