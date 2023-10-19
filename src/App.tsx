import React, { Fragment } from "react";
import "./App.css";
import { RecoilRoot } from "recoil";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home/home";
import Register from "./pages/Auth/Register/register";
import Login from "./pages/Auth/Login/login";
import { QueryClient, QueryClientProvider } from "react-query";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

const queryClient = new QueryClient();

function App() {
  return (
    <RecoilRoot>
      <Fragment>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      </Fragment>
    </RecoilRoot>
  );
}

export default App;
