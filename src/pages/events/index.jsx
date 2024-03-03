import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import EventCard from "@/components/EventCard"

export default function index() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    async function fetchAllEvents() {
      await fetch('/api/events/controller')
        .then((res) => res.json())
        .then((data) => {
          setEvents(data)
        });
    }

    fetchAllEvents();
  }, [])
  return (
    <main>
      <div className='grid grid-flow-row grid-cols-3 gap-x-16 gap-y-6 place-content-center'>
        {
          !!events && events.map((event) => {
            return (
              <EventCard 
                name={event.title}
                id={event.id}
              />
            )
          })
        }
      </div>
    </main>
  )
}
