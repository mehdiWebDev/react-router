import MainNavigation from "../components/MainNavigation";
import PageContent from "../components/pagecontent";
import { useRouteError } from "react-router-dom";

const Error = () => {
  const error = useRouteError();

  let title = "An error ocuured!";
  let message = "Somthing went wrong!";

  console.log(error.status);

  if (error.status === 500) {
    message = JSON.parse(error.data).message;
  }

  if (error.status === 404) {
    title = "Not found!";
    message = "Could not find resource or page";
  }

  return (
    <>
      <MainNavigation />

      <PageContent title={title}>
        <p>{message}</p>
      </PageContent>
    </>
  );
};

export default Error;
