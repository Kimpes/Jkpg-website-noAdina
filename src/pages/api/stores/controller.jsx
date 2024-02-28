import ModelClass from "./model";
let Model = null;

const startServer = async () => {
  Model = new ModelClass();
  await Model.init();
  await Model.setupDatabase();
};

export default async function handler(req, res) {
  let storeId;

  switch (req.method) {
    case "GET":
      try {
        res.status(200).json(response);
      } catch (error) {
        res.status(400).send(error);
      }
      break;

    case "POST":
      try {
        storeId = req.body.sid;
        const response = await Model.getStoreById(storeId);

        // console.log(req.body);
        res.status(200).json(response);
      } catch (error) {
        res.status(400).send(error);
      }
      break;

    case "DELETE": 
      try {
        const response = await Model.deleteStore(storeId)

        res.status(200).json(response);
      } catch (error) {
        res.status(error).send(error)
      }
      break;

    case "PATCH":
      
      break;

    default:
      break;
  }
}

startServer();
