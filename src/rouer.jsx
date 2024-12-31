import Home from './pages/Home'
export const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
      loader: rootLoader,
      children: [
        {
          path: "team",
          element: <Team />,
          loader: teamLoader,
        },
      ],
    },
  ]);