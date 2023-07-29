import { Routes as RoutePath, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";

const Routes = () => {
  return (
    <RoutePath>
      <Route path="/" element={<Login />} />
      <Route path="/signUp" element={<Register />} />
    </RoutePath>
  );
};

export default Routes;
