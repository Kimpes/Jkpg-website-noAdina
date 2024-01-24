// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from 'axios';
import ModelClass from './model';

const startServer = async () => {
  const Model = new ModelClass();
  await Model.init();
  //App.listen(3000) we're not using express
}


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

//startServer(); don't know if we're gonna use this, i don't know how next.js works