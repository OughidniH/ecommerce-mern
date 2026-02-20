<<<<<<< HEAD
import { AlignJustify, LogOut, ExternalLink } from "lucide-react";
=======
import { AlignJustify, LogOut } from "lucide-react";
>>>>>>> 0af58a59d3f77ea0ed43e63857ac20f0a1e0d172
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
<<<<<<< HEAD
      {/* Toggle menu (mobile) */}
=======
>>>>>>> 0af58a59d3f77ea0ed43e63857ac20f0a1e0d172
      <Button onClick={() => setOpen(true)} className="lg:hidden sm:block">
        <AlignJustify />
        <span className="sr-only">Toggle Menu</span>
      </Button>
<<<<<<< HEAD

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
=======
      <div className="flex flex-1 justify-end">
>>>>>>> 0af58a59d3f77ea0ed43e63857ac20f0a1e0d172
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

<<<<<<< HEAD
export default AdminHeader;
=======
export default AdminHeader;
>>>>>>> 0af58a59d3f77ea0ed43e63857ac20f0a1e0d172
