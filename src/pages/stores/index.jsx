import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import StoreCard from "@/components/StoreCard"

export default function index() {
  const [stores, setStores] = useState([]);

  useEffect(() => {
    async function fetchAllStores() {
      await fetch('/api/stores/controller')
        .then((res) => res.json())
        .then((data) => {
          setStores(data)
        });
    }

    fetchAllStores();
  }, [])
  return (
    <main>
      <div className='grid grid-flow-row grid-cols-3 gap-x-10 gap-y-2 place-content-center'>
        {
          !!stores && stores.map((store) => {
            return (
              <StoreCard 
                name={store.name}
                id={store.id}
              />
            )
          })
        }
      </div>
    </main>
  )
}
