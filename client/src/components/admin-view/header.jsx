import { AlignJustify, LogOut, ExternalLink } from "lucide-react";
import { Button } from "../ui/button";
import { useDispatch } from "react-redux";
import { logoutUser } from "@/store/auth-slice";

function AdminHeader({ setOpen }) {
  const dispatch = useDispatch();

  function handleLogout() {
    dispatch(logoutUser());
  }

  return (
    <header className="flex items-center justify-between px-4 py-3 bg-background border-b">
      {/* Toggle menu (mobile) */}
      <Button onClick={() => setOpen(true)} className="lg:hidden sm:block">
        <AlignJustify />
        <span className="sr-only">Toggle Menu</span>
      </Button>

      {/* Right buttons */}
      <div className="flex flex-1 justify-end gap-2">
        {/* Accéder au site */}
        {/* <Button
          as="a"
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex gap-2 items-center rounded-md px-4 py-2 text-sm font-medium shadow"
        >
          <ExternalLink />
          Accéder au site
        </Button> */}

        {/* Logout */}
        <Button
          onClick={handleLogout}
          className="inline-flex gap-2 items-center rounded-md px-4 py-2 text-sm font-medium shadow"
        >
          <LogOut />
          Logout
        </Button>
      </div>
    </header>
  );
}

export default AdminHeader;