import ModelClass from "./model";
let Model = null;

const startServer = async () => {
  Model = new ModelClass();
  await Model.init();
  await Model.setupDatabase();
};

export default async function handler(req, res) {

  switch (req.method) {
    case "GET":
      try {
        let store = {
          id: 141,
          name: "silly store",
          url: "google.com",
          district: "Väster",
          type: "Shoppa"
        };
        const response = await Model.editStore(store);
        console.log(response);
        res.status(200).json(response);
      } catch (error) {
        res.status(400).send(error);
      }
      break;

    case "POST":
      try {
        const id = req.body.id;
        const response = await Model.getStoreById(id);
        
        console.log(req.body)
        res.status(200).json(response);
      } catch (error) {
        res.status(400).send(error);
      }

    default:
      break;
  }
}

startServer();