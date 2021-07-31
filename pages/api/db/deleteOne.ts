import { connectToDatabase } from "../../../lib/mongodb";

const deleteOne = async (req, res) => {
  const { db } = await connectToDatabase();
  const { body } = req;

  const { payload, collection } = body;
  console.log("@@@@@", payload, collection);

  try {
    await db.collection(collection).deleteOne(payload);
    res.status(200).json({ result: "success", name: payload.name });
  } catch (e) {
    console.error(e);
    res.status(500).send(e);
  }
};

export default deleteOne;
