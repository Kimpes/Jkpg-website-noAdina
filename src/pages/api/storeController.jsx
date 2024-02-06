import ModelClass from "./model";
let Model = null;

const startServer = async () => {
  Model = new ModelClass();
  await Model.init();
};

export default async function handler(req, res) {

  switch (req.method) {
    case "GET":
      try {
        const response = await Model.getStoreById(1);
        res.status(200).json(response.data);
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