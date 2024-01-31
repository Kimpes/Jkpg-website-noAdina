// dependencies import
import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

export default function Home() {
  const [data, setData] = useState(null)
  const [isLoading, setLoading] = useState(true)
  const [factGenerator, setFact] = useState(0)

  useEffect(() => {
    setLoading(false);

    fetch('/api/hello')
      .then((res) => res.json())
      .then((data) => {
        setData(data.fact);
        setLoading(false);
      })
  }, [factGenerator])

  // write html down here, <main> has to wrap around everything
  // instead of "class", write "className" instead like shown in <button>. it should autofill it automatically
  return (
    <main>
      <div className="fact-generator">
        <div>
          { isLoading ? <h5>Loading...</h5> : <h5>{ data }</h5>}
        </div>
        <button className='px-4 py-1 border border-white' onClick={() => setFact(factGenerator + 1)}>
          Generate another fact, test
        </button>
      </div>
    </main>
  );
}
