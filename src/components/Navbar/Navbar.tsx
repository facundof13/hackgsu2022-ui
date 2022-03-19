import React, { FC, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

interface NavbarProps {}

const Navbar: FC<NavbarProps> = () => {
  const navigate = useNavigate();
  const auth = useAuth();

  function logout() {
    auth.logout();
    navigate("/");
  }

  return (
    <div className="text-slate-100">
      <div className="bg-slate-700 h-16 p-4 flex flex-row">
        <div className="justify-self-start">
          <i className="fa-solid h-full fa-bars cursor-pointer"></i>
        </div>
        <div className="justify-self-center self-center text-xl ml-auto mr-auto">
          <Link to="/">Code Snippets</Link>
        </div>
        <div className="flex gap-4 justify-self-center self-center">
          {auth.authed ? (
            <React.Fragment>
              <Link to="/favorites" className="cursor-pointer">
                Favorites
              </Link>
              <span className="cursor-pointer" onClick={logout}>
                Logout
              </span>
            </React.Fragment>
          ) : (
            <Link to="/login" className="cursor-pointer">
              Login
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
