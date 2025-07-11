"use client";

import { MenuSquare } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

const Nav = () => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const isProfilePage = pathname.startsWith("/profile/");
  const isCreatePage = pathname.startsWith("/create");

  return (
    <div className={`absolute top-0 w-full z-30 ${isCreatePage || pathname.startsWith("/admin") ? "hidden" : ""}`}>
      <div
        className={`relative ${
          isProfilePage ? "bg-[#33401c]" : "bg-transparent"
        } flex justify-between md:px-20 px-10 py-5 text-white z-20`}
      >
        <h1 className="text-2xl font-semibold text-center z-10">Title</h1>

        <ul
          className={`h-screen md:h-auto w-1/2 md:w-auto md:flex md:bg-transparent bg-[#6a760c] md:gap-10 fixed md:static z-0 top-0 max-md:py-24 left-0 flex-shrink-0 ${
            open ? "left-0 duration-500" : "left-[-100%] duration-500"
          } max-md:px-5 max-md:space-y-5`}
        >
          <li className="max-md:hover:bg-[#9dae11] p-2 rounded-md duration-300 w-full block">
            Home
          </li>
          <li className="max-md:hover:bg-[#9dae11] p-2 rounded-md duration-300 w-full block">
            About
          </li>
          <li className="max-md:hover:bg-[#9dae11] p-2 rounded-md duration-300 w-full block">
            {/* Dropdown Wrapper */}
            <DropdownMenu>
              <DropdownMenuTrigger className="outline-none focus:outline-none" asChild>
                <button onClick={() => console.log("hello")} className="w-full text-left">Wars</button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuSeparator />
                <DropdownMenuItem >
                  Indo-Pak 1947
                </DropdownMenuItem>
                <DropdownMenuItem >
                  Indo-Pak 1965
                </DropdownMenuItem>
                <DropdownMenuItem >
                  Indo-Pak 1971
                </DropdownMenuItem>
                <DropdownMenuItem>
                  Kargil 1999
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </li>
          <li className="max-md:hover:bg-[#9dae11] p-2 rounded-md duration-300 w-full block">
            Contact
          </li>
        </ul>

        <li onClick={() => setOpen(!open)} className="list-none md:hidden">
          <MenuSquare />
        </li>
      </div>
    </div>
  );
};

export default Nav;
