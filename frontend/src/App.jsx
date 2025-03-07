import "./App.css";
import { Outlet } from "react-router-dom";
import { Theme } from "@radix-ui/themes";

function App() {
  return (
    <>
      <Theme>
        <Outlet />
      </Theme>
    </>
  );
}

export default App;
