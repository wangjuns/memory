import React from 'react';
import logo from './logo.svg';
import './App.css';
import Metamask from './components/Metamask';
import {
  createBrowserRouter,
  RouterProvider,
  Route,
} from "react-router-dom";
import MintFriend from './components/MintFriend';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Metamask />,
  },

]);

function App() {
  return (
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
}

export default App;
