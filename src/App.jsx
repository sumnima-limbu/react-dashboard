import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Error, Home, Subscription, User } from "./pages";
import DashboardLayout from "./components/layout/DashboardLayout";

const router = createBrowserRouter([
  {
    element: <DashboardLayout />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/subscriptions",
        element: <Subscription />,
      },
      {
        path: "/users",
        element: <User />,
      },
    ],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
