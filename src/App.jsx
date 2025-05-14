import React from 'react';
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from './pages/Home.jsx';
import Signup from './pages/Signup.jsx';
import Login from './pages/Login.jsx';
import About from './pages/about.jsx';
import Contact from './pages/contact.jsx';
import Fabric from './pages/fabric.jsx';
import Leather from './pages/leather.jsx';
import FabricContext from './pages/fabricContext.jsx';
import LeatherContext from './pages/leatherContext.jsx';
import Navbar from './components/Navbar.jsx';
import Footer from './components/footer.jsx';
import Cart from './pages/cart.jsx';
import Profile from './pages/profile.jsx';
import Wishlist from './pages/wishlist.jsx';
import Order_History from './pages/Order_History.jsx';
import { ShopContextProvider } from './components/context/shopContext.jsx';
import './index.css';

// Layout component for shared Navbar and Footer
const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <main className='grow'> <Navbar /></main>
      <main className="grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};


// Create Browser Router
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/about_us", element: <About /> },
      { path: "/contact", element: <Contact /> },
      { path: "/cart", element: <Cart /> },
      { path: "/upholstery_fabric", element: <Fabric /> },
      { path: "/upholstery_leather", element: <Leather /> },
      { path: "/fabric/:id/:name", element: <FabricContext /> },
      { path: "/leather/:id/:name", element: <LeatherContext /> },
      { path: "/profile", element: <Profile /> },
      { path: "/order_history", element: <Order_History /> },
      { path: "/wishlist", element: <Wishlist /> },
    ],
  },
  { path: "/signup", element: <Signup /> },
  { path: "/login", element: <Login /> },
]);

// App component to wrap the RouterProvider with ShopContextProvider
const App = () => {
  return (

    <ShopContextProvider>
      <RouterProvider router={router} />
    </ShopContextProvider>

  );
};

export default App;
