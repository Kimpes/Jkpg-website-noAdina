import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Page() {
  const router = useRouter();
  const [event, setEvent] = useState([]);

  useEffect(() => {
    async function fetchData() {
      if (!router.isReady) return;

      await fetch("/api/events/controller", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(router.query),
      })
        .then((res) => res.json())
        .then((data) =>
          setEvent([data.id, data.title, data.description, data.locatiob, data.type, data.date])
        );
    }

    fetchData();
  }, [router.isReady]);

  return (
    <div>
      <ul>
        <li>{event[0]}</li>
        <li>{event[1]}</li>
        <li>{event[2]}</li>
        <li>{event[3]}</li>
        <li>{event[4]}</li>
        <li>{event[5]}</li>
      </ul>
    </div>
  );
}
