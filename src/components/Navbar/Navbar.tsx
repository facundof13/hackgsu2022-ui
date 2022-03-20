import { Transition } from "@headlessui/react";
import CreateSnippetButton from "components/CreateSnippetButton/CreateSnippetButton";
import React, { FC, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

interface NavbarProps {}

const Navbar: FC<NavbarProps> = () => {
  const navigate = useNavigate();
  const auth = useAuth();
  const [showNavigation, setShowNavigation] = useState(false);

  function logout() {
    auth.logout();
    navigate("/");
  }

  return (
    <>
      <div className="bg-slate-700 text-slate-100 sm:grid sm:grid-cols-3 p-3 h-auto flex flex-row items-center sm:h-14">
        <div
          className="absolute sm:flex my-auto ml-2"
          onClick={() => setShowNavigation(!showNavigation)}
        >
          <i className="sm:hidden fa-solid fa-bars cursor-pointer"></i>
        </div>

        <div className="hidden sm:block md:block lg:block xl:block 2xl:block">
          <CreateSnippetButton />
        </div>

        <div className="text-xl flex flex-row justify-center items-end ml-auto mr-auto sm:pb-3">
          <Link className="" to="/">
            Code Snippets
          </Link>
        </div>

        <div className="gap-4 justify-self-end items-end text-sm hidden sm:flex">
          <Link
            to="/"
            className=" underline underline-offset-2 hover:underline-offset-4"
          >
            Home
          </Link>
          {auth.authed ? (
            <React.Fragment>
              {/* <Link
                to="/favorites"
                className="underline underline-offset-2 hover:underline-offset-4"
              >
                Favorites
              </Link> */}
              <span
                className="cursor-pointer underline underline-offset-2 hover:underline-offset-4"
                onClick={logout}
              >
                Logout
              </span>
            </React.Fragment>
          ) : (
            <Link
              to="/login"
              className=" underline underline-offset-2 hover:underline-offset-4"
            >
              Login
            </Link>
          )}
        </div>

        <div className="sm:hidden">
          <CreateSnippetButton />
        </div>
      </div>

      {showNavigation && (
        <div
          className="absolute bg-slate-400 w-full text-black flex flex-col cursor-pointer shadow-md"
          onClick={() => setShowNavigation(false)}
        >
          <Link to="/">
            <div className="p-2 hover:bg-slate-500">Home</div>
          </Link>
          {auth.authed ? (
            <>
              {/* <Link to="/favorites">
                <div className="p-2 hover:bg-slate-500">Favorites</div>
              </Link> */}
              <div className="p-2 hover:bg-slate-500" onClick={logout}>
                <span>Logout</span>
              </div>
            </>
          ) : (
            <Link to="/login">
              <div className="p-2 hover:bg-slate-500">Login</div>
            </Link>
          )}
        </div>
      )}
    </>
  );
};

export default Navbar;
