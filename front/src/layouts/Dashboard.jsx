import { NavLinks } from "@/components/LinkItems";
import { useAuth } from "@/context/AuthProvider";
import React from "react";
import { Outlet } from "react-router";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const { isAuthenticated, logout } = useAuth();
  return (
    <>
      <div className="drawer h-full">
        <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col h-full">
          {/* Navbar */}
          <nav className="w-full navbar  backdrop-blur-md">
            <div className="flex-none md:hidden">
              <label
                htmlFor="my-drawer-3"
                aria-label="open sidebar"
                className="btn btn-square btn-ghost"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="inline-block w-6 h-6 stroke-current"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  ></path>
                </svg>
              </label>
            </div>
            <div className="flex-1 px-2 mx-2 md:flex hidden text-lg font-bold ">Admission Portal</div>
            <div className="flex-1 px-2 mx-2 md:hidden flex">SAS</div>
            <div className=" hidden md:flex">
              <ul className="menu menu-horizontal gap-2 items-center">
                {/* Navbar menu content here */}
                <NavLinks/>

                {isAuthenticated ? (
                  <li>
                    <button onClick={()=> logout()} className="btn btn-primary btn-sm">Logout</button>
                  </li>
                ) : (
                  <li>
                    <Link className="btn btn-primary btn-sm">Login</Link>
                  </li>
                )}
              </ul>
            </div>
            <div className=" flex md:hidden"></div>
          </nav>
          {/* Page content here */}
          <main className="h-full">
            <Outlet />
          </main>
        </div>
        <aside className="drawer-side">
          <label
            htmlFor="my-drawer-3"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>

          <ul className="menu p-4 w-80 min-h-full bg-base-200">
            {/* Sidebar content here */}
            <li className="mt-10"></li>
            <li>
              <a>Sidebar Item 1</a>
            </li>
            <li>
              <a>Sidebar Item 2</a>
            </li>
          </ul>
        </aside>
      </div>
    </>
  );
}
