import { MongoClient } from 'mongodb';
//api/new-meetup

async function handler(req, res) {
  if (req.method === 'POST') {
    const data = req.body;
    
    const { title, image, address, description } = data;

    const client = await MongoClient.connect(
      'mongodb+srv://iamagugbueikenna:Jesuschrist4ever@cluster1.qbbirro.mongodb.net/meetups?retryWrites=true&w=majority&appName=Cluster1'
    );
    const db = client.db();

    const meetupsCollection = db.collection('meetups');

    const result = await meetupsCollection.insertOne(data);

    console.log(result);

    client.close();

    res.status(201).json({ message: 'succesfully inserted!' });
  }
}

export default handler;