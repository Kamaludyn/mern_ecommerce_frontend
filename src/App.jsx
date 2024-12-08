import { AppProvider } from "./context/AppContext";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Bounce, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MainLayout from "./layouts/main-layout/MainLayout";
import { DashboardProvider } from "./context/DashboardContext";
import { CartProvider } from "./context/CartContext";
import Home from "./pages/Home";
import CategoryPage from "./pages/CategoryPage";
import Login from "./pages/Login";
import ProfilePage from "./pages/ProfilePage";
import PrivateRoute from "./components/PrivateRoute";
import Overview from "./pages/dashboardPages/Overview";
import Users from "./pages/dashboardPages/Users";
import Products from "./pages/dashboardPages/Products";
import Categories from "./pages/dashboardPages/Categories";
import Orders from "./pages/dashboardPages/Orders";
import Settings from "./pages/dashboardPages/Settings";
import DashboardLayout from "./components/dashboard/DashboardLayout";
import ProductPreview from "./pages/ProductPreview";
import DashboardLogin from "./pages/dashboardPages/DashboardLogin";
import { AuthProvider } from "./context/AuthContext";
import SignUp from "./pages/SignUp";
import ForgotPassword from "./pages/ForgotPassword";
import MyProfile from "./pages/MyProfile";
import MyOrders from "./pages/MyOrders";
import RecentlyViewed from "./pages/RecentlyViewed";
import ProfileSettings from "./pages/ProfileSettings";
import DashboardPrivateRoute from "./components/dashboard/DashboardPrivateRoute";
import UserProfile from "./pages/dashboardPages/UserProfile";
import Customers from "./pages/dashboardPages/Customers";
import DashboardProductPreview from "./pages/dashboardPages/DashboardProductPreview";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <CartProvider>
          <AppProvider>
            <MainLayout />,
          </AppProvider>
        </CartProvider>
      ),
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
          path: "/product/:id",
          element: <ProductPreview />,
        },
        {
          path: "/Signup",
          element: <SignUp />,
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/forgot-password",
          element: <ForgotPassword />,
        },
        {
          path: "/profile",
          element: (
            <PrivateRoute>
              <ProfilePage />,
            </PrivateRoute>
          ),
          children: [
            {
              path: "",
              element: <MyProfile />,
            },
            {
              path: "my-orders",
              element: <MyOrders />,
            },
            {
              path: "recently-viewed",
              element: <RecentlyViewed />,
            },
            {
              path: "settings",
              element: <ProfileSettings />,
            },
          ],
        },
      ],
    },
    {
      path: "/dashboard/login",
      element: (
        <AuthProvider>
          <DashboardLogin />
        </AuthProvider>
      ),
    },
    {
      path: "/dashboard",
      element: (
        <DashboardPrivateRoute>
          <AuthProvider>
            <DashboardProvider>
              <DashboardLayout />,
            </DashboardProvider>
          </AuthProvider>
        </DashboardPrivateRoute>
      ),
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
          path: "customers",
          element: <Customers />,
        },
        {
          path: "products",
          element: <Products />,
        },
        {
          path: "products/:id",
          element: <DashboardProductPreview />,
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
          path: "settings",
          element: <Settings />,
        },
        {
          path: "profile",
          element: <UserProfile />,
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
