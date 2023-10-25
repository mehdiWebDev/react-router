import EventsList from '../components/EventsList';
import { useLoaderData } from 'react-router-dom';

function Events() {

  const events = useLoaderData();
  
  // if(events.isError){
  //   return <p>{events.message}</p>
  // }

  return (
    <>
      {<EventsList events={events} />}
    </>
  );
}

export default Events;


export async function loader() {
  const response = await fetch('http://localhost:8080/events');

  if (!response.ok) {
    // return {isError:true,message:"Could not fetch events"}
    throw new Response (JSON.stringify({message:"Could not fetch events"}),{status:500})
  } else {
    const resData = await response.json();
    return resData.events;

  }
}