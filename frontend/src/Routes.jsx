import { Routes as RoutePath, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ChatPage from "./pages/ChatPage";

const Routes = () => {
  return (
    <RoutePath>
      <Route path="/" element={<Login />} />
      <Route path="/signUp" element={<Register />} />
      <Route path="/chat" element={<ChatPage />} />
    </RoutePath>
  );
};

export default Routes;
