import { Suspense } from "react";
import EventsList from "../components/EventsList";
import { defer, useLoaderData, Await } from "react-router-dom";

function Events() {
  const  {events}  = useLoaderData();
  console.log(events);

  // if(events.isError){
  //   return <p>{events.message}</p>
  // }

  return (
    <Suspense fallback="Loading..">
      <Await resolve={events}>
        {(loadEvents) => <EventsList events={loadEvents} />}
      </Await>
    </Suspense>
  );
}

export default Events;

async function loadEvents() {
  const response = await fetch("http://localhost:8080/events");

  if (!response.ok) {
    // return {isError:true,message:"Could not fetch events"}
    throw new Response(JSON.stringify({ message: "Could not fetch events" }), {
      status: 500,
    });
  } else {
    const resData = await response.json();
    console.log(resData.events);
    return resData.events;
  }
}

export function loader() {
  return defer({
    events: loadEvents(),
  });
}
