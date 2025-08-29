import { Fragment } from 'react';
import Head from 'next/head';
import { MongoClient } from 'mongodb';
import MeetupList from '../components/meetups/MeetupList';


function HomePage(props) {

    return (
        <Fragment>
            <Head>
                <title>Next js meetup</title>
                <meta
                    name="description"
                    content="Browse a huge list of highly active Next js meetups" />
            </Head>
            <MeetupList meetups={props.meetups} />
        </Fragment>
    );
}

export async function getStaticProps() {
    //fetch some dATA
    const client = await MongoClient.connect(
        'mongodb+srv://iamagugbueikenna:Jesuschrist4ever@cluster1.qbbirro.mongodb.net/meetups?retryWrites=true&w=majority&appName=Cluster1'
    );
    const db = client.db();

    const meetupsCollection = db.collection('meetups');

    const meetups = await meetupsCollection.find().toArray();

    client.close();

    return {
        props: {
            meetups: meetups.map(meetup => ({
                title: meetup.title,
                address: meetup.address,
                image: meetup.image,
                id: meetup._id.toString(),

            }))
        },
        revalidate: 1
    };
};

export default HomePage;