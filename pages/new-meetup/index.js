import { Fragment } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import NewMeetupForm from '../../components/meetups/NewMeetupForm';
//our-domain.com/new-meetup

function NewMeetupPage() {
   const router = useRouter();
   async function addMeetupHandler(enteredMeetupData) {
      const response = await fetch('http://localhost:3000/api/new-meetup', {
         method: 'POST',
         body: JSON.stringify(enteredMeetupData),
         headers: {
            'Content-Type': 'application/json'
         }
      });

      const data = await response.json();

      console.log(data);

      router.push('/');
   }
   return (
      <Fragment>
         <Head>
            <title>Add your own meetups</title>
            <meta
               name="description"
               content="Add your own meetup,and create a new networking opportunities." />
         </Head>
         <NewMeetupForm onAddMeetup={addMeetupHandler} />
      </Fragment>

   )
}

export default NewMeetupPage;