import { Routes as RoutePath, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ChatPAge from "./pages/ChatPAge";

const Routes = () => {
  return (
    <RoutePath>
      <Route path="/" element={<Login />} />
      <Route path="/signUp" element={<Register />} />
      <Route path="/chat" element={<ChatPAge />} />
    </RoutePath>
  );
};

export default Routes;
