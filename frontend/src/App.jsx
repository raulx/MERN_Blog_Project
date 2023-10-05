import "./App.css";
import Navbar from "./components/navbar";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <div className="w-screen h-screen bg-gray-50 overflow-hidden">
      <Navbar />
      <Outlet />
    </div>
  );
}

export default App;
