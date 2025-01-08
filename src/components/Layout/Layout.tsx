import { Outlet } from "react-router-dom";
import TopNavbar from "../navigation/TopNavbar";
import BottomNavbar from "../navigation/BottomNavbar";
import "./Layout.css";

function Layout() {
  return (
    <div>
      <TopNavbar />
      <main>
        <Outlet />
      </main>
      <BottomNavbar />
    </div>
  );
}

export default Layout;
