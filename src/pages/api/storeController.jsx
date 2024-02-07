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
        res.status(200).json(req.body);
      } catch (error) {
        res.status(400).send(error);
      }

    default:
      break;
  }
}

startServer();