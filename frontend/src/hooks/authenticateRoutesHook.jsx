import { Outlet, Navigate, useLocation } from "react-router-dom";

function ProtectedRoute() {
  const auth = true;
  const location = useLocation();
  if (auth) {
    return <Outlet />;
  } else {
    return (
      <Navigate
        to={"/auth"}
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
