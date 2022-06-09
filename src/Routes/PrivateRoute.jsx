import { Navigate, Outlet, useLocation } from "react-router-dom";

const PrivateRoute = ({ component: Component, ...props }) => {
  let auth = localStorage.getItem('token') ?? false;
  let location = useLocation();

  console.log('isAuth:', auth)
  if (!auth) {
    return <Navigate to="/" state={{ from: location }} />;
  }

  return <Outlet />;
}

export default PrivateRoute;