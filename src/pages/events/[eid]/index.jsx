import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Page() {
  const router = useRouter();
  const [event, setEvent] = useState([]);

  console.log(event);

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
          setEvent([
            data.id,
            data.title,
            data.description,
            data.location,
            data.type,
            data.date,
          ])
        );
    }

    fetchData();
  }, [router.isReady]);

  async function deleteEvent() {
    await fetch("/api/events/controller", {
      method: "DELETE",
      body: JSON.stringify(router.query),
    });

    router.push("/events");
  }

  return (
    <div>
      <div className="herosection item-page">
        <div className="page-header">
          <span>
            <h1>{event[1] /*Event name*/}</h1>
            <button
              className="primary-button"
              onClick={() => router.push(`/events/${event[0]}/edit`)}
            >
              edit
            </button>
          </span>
        </div>
      </div>
      <ul className="page-selection-buttons">
        <div className="primary-button">
          <li>
            <a>
              <div className="image">
                <img src={`/assets/${event[3]}.png`.toLowerCase()} alt="" />
              </div>
              <h4>{event[3]}</h4>
            </a>
          </li>
        </div>
        <div className="primary-button">
          <li>
            <a href="">
              <div className="image">
                <img src={`/assets/sova.png`} alt="" />
              </div>
              <h4>Sign Up</h4>
            </a>
          </li>
        </div>
        <div className="primary-button">
          <li>
            <a href={`https://${event[4]}`}>
              <img src="/assets/hitta.png" alt="" />
              <h4>Location</h4>
            </a>
          </li>
        </div>
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
        <button className="danger-button" onClick={() => deleteEvent()}>
          Delete store
        </button>
      </div>
    </div>
  );
}
