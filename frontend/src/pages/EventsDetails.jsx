import EventItem from "../components/EventItem";
import { Await, defer, redirect, useRouteLoaderData } from "react-router-dom";
import EventsList from "../components/EventsList";
import { Suspense } from "react";

export default function EventsDetails() {
  const { event, events } = useRouteLoaderData("event-detail");

  return (
    <>
    <Suspense fallback="loading...">
      <Await resolve={event}>
          {loadEvent => <EventItem event={loadEvent} />}
        </Await>
    </Suspense>

    <Suspense fallback="loading...">
      <Await resolve={events}>
          {loadEvents =>   <EventsList events={loadEvents}/> }
      </Await>

    </Suspense>

    </>
  );
}

async function loadEvent(id) {
  const response = await fetch("http://localhost:8080/events/" + id);
  if (!response.ok) {
    throw new Response(JSON.stringify({ message: "could not fetch event" }), {
      status: 500,
    });
  } else {
    const resData = await response.json();
    return resData.event;
  }
}

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

export async function loader({ request, params }) {
  console.log(params.eventid);
  return defer({
    event: await loadEvent(params.eventid),
    events: loadEvents(),
  });
}

export async function action({ params, request }) {
  console.log(params);

  const eventId = params.eventid;
  console.log(eventId);

  const response = await fetch("http://localhost:8080/events/" + eventId, {
    method: request.method,
  });

  if (!response.ok) {
    throw new Response(JSON.stringify({ message: "could not delete event" }), {
      status: 500,
    });
  } else {
    return redirect("/events");
  }
}
