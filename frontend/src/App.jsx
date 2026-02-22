import { useState } from "react";
import { Outlet } from "react-router";
import Navbar from "./components/Navbar";

function App({ children }) {
  console.log("children", children);
  // const [count, setCount] = useState(0);

  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

export default App;
