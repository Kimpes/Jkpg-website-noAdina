// dependencies import
import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

export default function Home() {
  const [store, setStore] = useState(null)

  useEffect(() => {
    fetch('/api/storeController')
      .then((res) => res.json())
      .then((data) => setStore([data.id, data.name, data.district, data.type]));

    // console.log(store.name)
    
  }, [])

  // write html down here, <main> has to wrap around everything
  // instead of "class", write "className" instead like shown in <button>. it should autofill it automatically
  return (
    <main>
      <div className="fact-generator">
        <div>
          <h5>{ store }</h5>
        </div>
      </div>
    </main>
  );
}
