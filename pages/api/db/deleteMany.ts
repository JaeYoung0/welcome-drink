import { connectToDatabase } from "@lib/mongodb";
import { NextApiRequest, NextApiResponse } from "next";

const deleteMany = async (req: NextApiRequest, res: NextApiResponse) => {
  const { db } = await connectToDatabase();
  const { body } = req;

  const { payload, collection } = body;

  try {
    await db.collection(collection).deleteMany(payload);
    res.status(200).json({ result: "success", name: payload.name });
  } catch (e) {
    console.error(e);
    res.status(500).send(e);
  }
};

export default deleteMany;
