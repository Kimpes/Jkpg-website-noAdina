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

    case "PUT":
      try {
        const id = req.body.eid;
        const response = await Model.getEventById(id);

        res.status(200).json(response);
      } catch (error) {
        res.status(400).send(error);
      }
      break;

    case "DELETE": 
      try {
        const id = JSON.parse(req.body).eid;
        console.log(id)
        const response = await Model.deleteEvent(id)

        res.status(200).json(response);
      } catch (error) {
        res.status(error).send(error)
      }
      break;

    case "PATCH":
      let alteredEvent = req.body

      const response = await Model.editEvent(alteredEvent)
      res.status(200).json(response)
      break;

    default:
      break;
  }
}

startServer();
