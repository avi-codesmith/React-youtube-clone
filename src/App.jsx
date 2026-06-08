import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Navbar from "./components/navbar/navbar";
import Header from "./components/header/Header";
import "./css/App.css";
import VideoPage, { SubsCountLoader } from "./pages/videopage/videopage";

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
        {
          path: "video/:vidId",
          element: <VideoPage />,
          loader: SubsCountLoader,
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
