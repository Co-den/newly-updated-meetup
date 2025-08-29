import React from "react";
import { Fragment } from "react";
import Head from "next/head";
import { MongoClient, ObjectId } from "mongodb";
import MeetupDets from "../../components/meetups/MeetupDets";

function MeetupDetails(props) {
  return (
    <Fragment>
      <Head>
        <title>{props.meetupData.title}</title>
        <meta name="description" content={props.meetupData.description} />
      </Head>
      <MeetupDets
        image={props.meetupData.image}
        title={props.meetupData.title}
        address={props.meetupData.address}
        description={props.meetupData.description}
      />
    </Fragment>
  );
}
export async function getStaticPaths() {
  const client = await MongoClient.connect(
    "mongodb+srv://iamagugbueikenna:Jesuschrist4ever@cluster1.qbbirro.mongodb.net/meetups?retryWrites=true&w=majority&appName=Cluster1"
  );

  const db = client.db();

  const meetupsCollection = db.collection("meetups");
  //getting all the meetup data;
  const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();
  client.close();

  return {
    fallback: "blocking",
    paths: meetups.map((meetup) => ({
      params: { meetupId: meetup._id.toString() },
    })),
  };
}

export async function getStaticProps(context) {
  const meetupId = context.params.meetupId;
  const client = await MongoClient.connect(
    "mongodb+srv://iamagugbueikenna:Jesuschrist4ever@cluster1.qbbirro.mongodb.net/meetups?retryWrites=true&w=majority&appName=Cluster1"
  );
  const db = client.db();

  const meetupsCollection = db.collection("meetups");
  //getting all the meetup data;
  const selectedMeetup = await meetupsCollection.findOne({
    _id: new ObjectId(meetupId),
  });
  client.close();

  return {
    props: {
      meetupData: {
        id: selectedMeetup._id.toString(),
        title: selectedMeetup.title,
        address: selectedMeetup.address,
        image: selectedMeetup.image,
        description: selectedMeetup.description,
      },
    },
    revalidate: 1,
  };
}
export default MeetupDetails;
