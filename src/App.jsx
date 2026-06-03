import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Navbar from "./components/navbar/navbar";
import Header from "./components/header/Header";
import "./css/App.css";

export default function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Header />,
      children: [
        {
          index: true,
          element: <Navbar />,
        },
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}
