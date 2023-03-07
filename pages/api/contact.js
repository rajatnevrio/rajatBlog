import { MongoClient } from "mongodb";
async function handler(req, res) {
  if (req.method === "POST") {
    const { email, name, message } = req.body;
    if (
      !email ||
      !email.includes("@") ||
      !name ||
      name.trim() === "" ||
      !message ||
      message.trim() === ""
    ) {
      res.status(422).json({ message: "Invalid input" });
      return;
    }

    //store in database
    const newMessage = {
      email,
      name,
      message,
    };
    let client;
    //"mongodb+srv://rajat:rajat234@cluster0.iket6ow.mongodb.net/myBlog?retryWrites=true&w=majority"

    const connectionString = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_USERNAME}@${process.env.DB_CLUSTER}.${process.env.DB_PWD}.mongodb.net/${process.DB_DATABASE}?retryWrites=true&w=majority`;
    try {
      client = await MongoClient.connect(connectionString);
    } catch (error) {
      res.status(500).json({ message: "Could Not connect to dataBase" });
      return;
    }

    const db = client.db();
    try {
      const result = await db.collection("messages").insertOne(newMessage);
      newMessage.id = result.insertedId;
    } catch (error) {
      client.close();
      res.status(500).json({ message: "Storing messsage failed" });
      return;
    }
    client.close();
    res
      .status(201)
      .json({ message: "Successfully Stored Message!", message: newMessage });
  }
}

export default handler;
