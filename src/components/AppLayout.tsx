import { Outlet } from "react-router-dom";
import SideNav from "@/components/SideNav";

const AppLayout = () => {
  return (
    <div className="min-h-screen flex bg-background">
      <SideNav />
      <main className="flex-1 min-w-0">
        <Outlet />
      </main>
    </div>
  );
};

export default AppLayout;
