import ModelClass from "../events/model";
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
        res.status(200).json(response);
      } catch (error) {
        res.status(400).send(error);
      }
      break;

    case "POST":
      try {
        const id = req.body.eid;
        const response = await Model.getEventById(id);

        console.log(req.body);
        res.status(200).json(response);
      } catch (error) {
        res.status(400).send(error);
      }

    default:
      break;
  }
}

startServer();
