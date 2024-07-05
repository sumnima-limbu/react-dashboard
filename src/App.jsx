import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Error, Home, Subscription, SubscriptionList, User } from "./pages";
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
        path: "/users",
        element: <User />,
      },
      {
        path: "/subscriptions",
        element: <SubscriptionList />,
      },
      {
        path: "/subscription/:id",
        element: <Subscription />,
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
