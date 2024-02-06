import { useRouter } from 'next/router'
import { useEffect, useState } from 'react';

export default function Page() {
  const router = useRouter();
  const [store, setStore] = useState([])

  console.log(router);

  useEffect(() => {
    fetch('/api/storeController', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(router.query)
    })
    .then((res) => res.json())
    .then((data) => setStore([data.id, data.name, data.district, data.type]));
  }, [])
  
  return (
    <div>{ router.query.id }</div>
  )
}