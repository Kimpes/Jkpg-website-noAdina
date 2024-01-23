// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from 'axios';

export default async function handler(req, res) {
  const options = {
    method: `${req.method}`,
    url: 'https://catfact.ninja/fact'
  }

  switch (req.method) {
    case "GET":
      try {
        const response = await axios.request(options);
        res.status(200).json(response.data);
      } catch (error) {
        res.status(404).send("error 404: not found");
      }
      break;
  
    default:
      break;
  }
}
