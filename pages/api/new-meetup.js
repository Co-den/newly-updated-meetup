import { MongoClient } from 'mongodb';
//api/new-meetup

async function handler(req, res) {
  if (req.method === 'POST') {
    const data = req.body;
    
    const { title, image, address, description } = data;

    const client = await MongoClient.connect(
    'mongodb://0.0.0.0:27017/meetupstore'
      );//'mongodb+srv://iamagugbueikenna:Jesuschrist4ever@cluster0.ganuqut.mongodb.net/meetup?retryWrites=true&w=majority');
    const db = client.db();

    const meetupsCollection = db.collection('meetups');

    const result = await meetupsCollection.insertOne(data);

    console.log(result);

    client.close();

    res.status(201).json({ message: 'succesfully inserted!' });
  }
}

export default handler;