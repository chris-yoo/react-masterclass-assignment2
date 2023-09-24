import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Detail from "./Detail";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/character/:id",
    element: <Detail />,
  },
]);

export default router;
