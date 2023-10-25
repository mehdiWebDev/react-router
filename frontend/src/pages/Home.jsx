import React from "react";
import { Outlet } from "react-router-dom";
import PageContent from "../components/pagecontent";

export default function Home() {
  return (
    <>
      <PageContent title="Welcome !"></PageContent>
      <Outlet />
    </>
  );
}
