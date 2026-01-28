import { Outlet } from "react-router";
import Navbar from "./Nav";

const Layout = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
};

export default Layout;
