import { useState } from 'react'

export default function Home() {
  let [number, setNumber] = useState(0);

  // write html down here, <main> has to wrap around everything
  // instead of "class", write "className" instead like shown in <button>. it should autofill it automatically
  return (
    <main>
      <h1>You have clicked {number} times!</h1>
      <button className='border border-white px-4 py-1' onClick={() => setNumber(number + 1)}>
        Add
      </button>
    </main>
  );
}
