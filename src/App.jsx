import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Bounce, toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MainLayout from "./layouts/main-layout/MainLayout";
import Home from "./pages/Home";
import CategoryPage from "./pages/CategoryPage";
import Login from "./pages/Login";
import CreateAccount from "./pages/CreateAccount";
import ProfilePage from "./pages/ProfilePage";
import PrivateRoute from "./components/PrivateRoute";
import Overview from "./pages/dashboardPages/Overview";
import Users from "./pages/dashboardPages/Users";
import Products from "./pages/dashboardPages/Products";
import Categories from "./pages/dashboardPages/Categories";
import Orders from "./pages/dashboardPages/Orders";
import Reports from "./pages/dashboardPages/Reports";
import Support from "./pages/dashboardPages/Support";
import Inventory from "./pages/dashboardPages/Inventory";
import Settings from "./pages/dashboardPages/Settings";
import DashboardLayout from "./components/dashboard/DashboardLayout";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout />,
      children: [
        {
          path: "",
          element: <Home />,
        },
        {
          path: "/category/:category",
          element: <CategoryPage />,
        },
        {
          path: "/create-account",
          element: <CreateAccount />,
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/profile",
          element: (
            <PrivateRoute>
              <ProfilePage />,
            </PrivateRoute>
          ),
        },
      ],
    },
    {
      path: "/dashboard",
      element: <DashboardLayout />,
      children: [
        {
          path: "",
          element: <Overview />,
        },
        {
          path: "users",
          element: <Users />,
        },
        {
          path: "products",
          element: <Products />,
        },
        {
          path: "categories",
          element: <Categories />,
        },
        {
          path: "orders",
          element: <Orders />,
        },
        {
          path: "reports",
          element: <Reports />,
        },
        {
          path: "support",
          element: <Support />,
        },
        {
          path: "inventory",
          element: <Inventory />,
        },
        {
          path: "settings",
          element: <Settings />,
        },
      ],
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer
        position="top-center"
        autoClose={4000}
        hideProgressBar={false}
        closeOnClick
        pauseOnFocusLoss
        pauseOnHover
        draggable
        theme="light"
        transition={Bounce}
      />
    </>
  );
}

export default App;
