import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from './App.jsx';
import Home from './pages/Home';
import ErrorPage from './pages/Error';
import GameLevels from './pages/GameLevels.jsx';
import GamePage from './pages/GamePage.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: 'gamelevels',
        element: <GameLevels />
      },
      {
        path: 'gamepage/:level',
        element: <GamePage />
      }
      
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
