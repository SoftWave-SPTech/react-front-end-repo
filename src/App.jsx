import './App.css';
import { RouterProvider } from "react-router-dom";
import React from 'react';
import { AppRouter } from './routes/AppRouter';

function App() {
  return (
    <>
      <RouterProvider router={AppRouter} />
    </>
  );
}
export default App