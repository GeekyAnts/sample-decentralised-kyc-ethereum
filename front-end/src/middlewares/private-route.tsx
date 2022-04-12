import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuthContext } from "../contexts/auth-context";

const PrivateRoute = () => {
  const {
    state: { isUserLoggedIn },
  } = useAuthContext();
  const state = useLocation();

  return isUserLoggedIn ? (
    <Outlet />
  ) : (
    <Navigate replace to={"/"} state={{ from: state.pathname }} />
  );
};

export default PrivateRoute;
