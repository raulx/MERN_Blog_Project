import "./App.css";
import { Outlet } from "react-router-dom";
import { Theme } from "@radix-ui/themes";

function App() {
  return (
    <div>
      <Theme>
        <Outlet />
      </Theme>
    </div>
  );
}

export default App;
