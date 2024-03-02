import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Page() {
  const router = useRouter();
  const [event, setEvent] = useState([]); //could we make it an object instead of an array?
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [location, setLocation] = useState('')
  const [type, setType] = useState('')
  const [date, setDate] = useState('')

  useEffect(() => {
    // console.log(queryParams)
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
        .then((data) => {
          setEvent([data.id, data.title, data.description, data.location, data.type, data.date])
          setTitle(data.title)
          setDescription(data.description)
          setLocation(data.location)
          setType(data.type)
          setDate(data.date)
        })
      
    }

    fetchData();
  }, [router.isReady]);

  async function handleSubmit(e) {
    e.preventDefault();

    const altered = {
      id: event[0],
      title,
      description,
      location,
      type,
      date
    }
    
    const response = await fetch('/api/events/controller', {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(altered),
    }).then(router.push(`/events/${event[0]}`))
  }

  return (
    <main>
      <form onSubmit={ handleSubmit }>
        <ul>
          <li>ID: { event[0] } </li>
          <li>Title:
            <input 
            required 
            type="text" 
            onChange={ (e) => setTitle(e.target.value) }
            defaultValue={ event[1] }
            />  
          </li>
          <li>Description:
          <textarea
            required
            name='description'
            onChange={ (e) => setDescription(e.target.value) }
            defaultValue={ event[2] }
            />  
          </li>
          <li>Location: 
          <input 
            type="text" 
            onChange={ (e) => setLocation(e.target.value) }
            defaultValue={ event[3] }
            />  
          </li>
          <li>Type: 
          <input 
            type="text" 
            onChange={ (e) => setType(e.target.value) }
            defaultValue={ event[4] }
            />  
          </li>
          <li>Date: 
          <input 
            type="date" 
            onChange={ (e) => setDate(e.target.value) }
            defaultValue={ event[5] }
            />  
          </li>
        </ul>
        <div className="buttons-container">
          <input className="primary-button" type="submit" name="submit" id="submit" value="Save Changes" />
          <button className="danger-button" onClick={() => router.push(`/stores/${store[0]}`)}>Cancel</button>
        </div>
      </form>
    </main>
  )
}
