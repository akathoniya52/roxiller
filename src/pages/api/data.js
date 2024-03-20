import axios from "axios";
import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.URI);

export default async function handler(req, res) {
  try {
    await client.connect();
    const db = client.db(process.env.DBNAME);
    const collection = db.collection(process.env.CNAME);
    const d = await collection.find({}).toArray();

    if (d.length > 0) {
      await client.close();
      res.status(200).json({ data: d });
    } else {
      const response = await axios.get(process.env.API_URL);
      // console.log(response.data);
      await collection.insertMany(response.data);
      await client.close();
      res.status(200).json({ data: response.data });
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
