import "./App.css";
import { Outlet } from "react-router-dom";
import { Theme } from "@radix-ui/themes";

function App() {
  console.log(import.meta.env.VITE_API_URL);
  return (
    <>
      <Theme>
        <Outlet />
      </Theme>
    </>
  );
}

export default App;
