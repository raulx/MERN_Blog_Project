import { Outlet, Navigate, useLocation } from "react-router-dom";

function ProtectedRoute() {
  const auth = localStorage.getItem("user");
  const location = useLocation();
  if (auth) {
    return <Outlet />;
  } else {
    return (
      <Navigate
        to={"/"}
        state={{
          from: location,
          message: "You Need to Login or Register First.",
        }}
        replace
      />
    );
  }
}

export default ProtectedRoute;
