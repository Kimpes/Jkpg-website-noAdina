import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Page() {
  const router = useRouter();
  const [store, setStore] = useState([]); //could we make it an object instead of an array?
  const [name, setName] = useState('')
  const [district, setDistrict] = useState('')
  const [type, setType] = useState('')
  const [url, setURL] = useState('')

  useEffect(() => {
    // console.log(queryParams)
    async function fetchData() {
      if (!router.isReady) return;

      await fetch("/api/stores/controller", {
        method: "PUT", 
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(router.query),
      })
        .then((res) => res.json())
        .then((data) => {
          setStore([data.id, data.name, data.district, data.type, data.url])
          setName(data.name)
          setDistrict(data.district)
          setType(data.type)
          setURL(data.url)
        })
      
    }

    fetchData();
  }, [router.isReady]);

  async function handleSubmit(event) {
    event.preventDefault();

    const altered = {
      id: store[0],
      name,
      district,
      type,
      url
    }
    
    const response = await fetch('/api/stores/controller', {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(altered),
    }).then(router.push(`/stores/${store[0]}`))
  }

  return (
    <main>
      <form onSubmit={ handleSubmit }>
        <ul>
          <li>ID: { store[0] } </li>
          <li>Name:
            <input 
            required 
            type="text" 
            onChange={ (e) => setName(e.target.value) }
            defaultValue={ store[1] }
            />  
          </li>
          <li>District:
          <input 
            type="text" 
            onChange={ (e) => setDistrict(e.target.value) }
            defaultValue={ store[2] }
            />  
          </li>
          <li>Type: 
          <input 
            type="text" 
            onChange={ (e) => setType(e.target.value) }
            defaultValue={ store[3] }
            />  
          </li>
          <li>URL: 
          <input 
            type="text" 
            onChange={ (e) => setURL(e.target.value) }
            defaultValue={ store[4] }
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
