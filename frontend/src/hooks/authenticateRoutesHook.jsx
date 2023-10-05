import { Outlet } from "react-router-dom";

function ProtectedRoute() {
  const auth = true;
  if (auth) {
    return <Outlet />;
  } else {
    return <div>Unauthorized</div>;
  }
}

export default ProtectedRoute;
