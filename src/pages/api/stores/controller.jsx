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
        const response = await Model.getAllStores();
        res.status(200).json(response);
      } catch (error) {
        res.status(400).send(error);
      }
      break;

    case "PUT":
      try {
        const storeId = req.body.sid;
        const response = await Model.getStoreById(storeId);

        // console.log(req.body);
        res.status(200).json(response);
      } catch (error) {
        res.status(400).send(error);
      }
      break;

    case "DELETE":
      try {
        const storeId = JSON.parse(req.body).sid;
        console.log(storeId);
        const response = await Model.deleteStore(storeId);

        res.status(200).json(response);
      } catch (error) {
        res.status(error).send(error);
      }
      break;

    case "PATCH":
      let alteredStore = req.body;

      const response = await Model.editStore(alteredStore);
      res.status(200).json(response);
      break;

    default:
      break;
  }
}

startServer();
