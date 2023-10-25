
import EventItem from '../components/EventItem';
import { redirect, useRouteLoaderData } from 'react-router-dom';

export default function EventsDetails() {

  const data = useRouteLoaderData('event-detail');
    
  return (
    <>
    <EventItem event={data.event} />
    </>

  )
}

export async function loader({request,params}){

  const id = params.eventid

  const response =  await fetch('http://localhost:8080/events/'+ id);
  if(!response.ok){
    throw new Response(JSON.stringify({message:'could not fetch event'}),{status:500})
  }else {
    return response;
  }

}

export async function action ({params,request}){

  console.log(params);

  const eventId = params.eventid;
console.log(eventId);

 const response = await fetch('http://localhost:8080/events/'+eventId, {
  method:request.method,
  
 })

 if(!response.ok){
  throw new Response(JSON.stringify({message:'could not delete event'}),{status:500})
}else {
  return redirect('/events');
}

}