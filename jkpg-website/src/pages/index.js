import { useState } from 'react'

export default function Home() {
  let [number, setNumber] = useState(0);

  return (
    <main>
      <h1>You have clicked {number} times!</h1>
      <button className='border-white border px-4 py-1' onClick={() => setNumber(number + 1)}>
        Add
      </button>
    </main>
  );
}
