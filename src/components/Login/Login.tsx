import React, {
  FC,
  FormEvent,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { Link, Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

interface LoginProps {
  isRegister?: boolean;
}

const Login: FC<LoginProps> = ({ isRegister }) => {
  const username = useRef(null);
  const password = useRef(null);
  const navigate = useNavigate();
  const auth = useAuth();

  async function login(e: FormEvent) {
    e.preventDefault();

    const data: { username: string; password: string } = {
      username: (username.current as any).value,
      password: (password.current as any).value,
    };

    try {
      const res = await (
        await fetch("/user/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        })
      ).json();

      if (res.successful) {
        auth.login(res.token);
        navigate("/");
        return;
      } else {
        toast.error(
          "The username or password entered is invalid. Please try again."
        );
      }

      (username.current as any).value = "";
      (password.current as any).value = "";
    } catch (err) {
      toast.error("There was an error when attempting to login.");
    }
  }

  async function register(e: FormEvent) {
    e.preventDefault();

    const data: { username: string; password: string } = {
      username: (username.current as any).value,
      password: (password.current as any).value,
    };

    try {
      const res = await (
        await fetch("/user/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        })
      ).json();

      if (res.successful) {
        toast.success(
          "Successfully registered your account. Please proceed to login."
        );
      } else {
        toast.error(
          "This username is already taken. Please try a different username."
        );
      }

      (username.current as any).value = "";
      (password.current as any).value = "";
    } catch (err) {
      toast.error("There was an error registering your account.");
    }
  }

  return auth.authed ? (
    <Navigate to="/" replace />
  ) : (
    <form
      onSubmit={(e) => (isRegister ? register(e) : login(e))}
      className="h-full"
    >
      <div className="sm:grid sm:place-content-center sm:content-center sm:h-full">
        <div className="sm:w-96 sm:h-96 sm:shadow-md sm:bg-zinc-200 sm:rounded-lg flex flex-col items-center pt-4">
          <h1 className="text-2xl text-color-slate">
            {isRegister ? "Register" : "Login"}
          </h1>
          <div className="flex flex-col self-start w-full p-3">
            <label htmlFor="username" className="text-sm mb-1">
              Username
            </label>
            <input
              type="text"
              ref={username}
              className="border-2 border-black rounded-md p-1"
              placeholder="username"
              required
            />
          </div>
          <div className="flex flex-col self-start w-full p-3">
            <label htmlFor="username" className="text-sm mb-1">
              Password
            </label>
            <input
              type="password"
              ref={password}
              className="border-2 border-black rounded-md p-1"
              placeholder="password"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-white p-2 rounded-md border-black border-2 mt-4 sm:mb-3"
          >
            {isRegister ? "Register" : "Login"}
          </button>
          <div className="sm:mt-auto sm:mb-2 mt-5">
            <Link
              className="text-sm text-neutral-500 underline-offset-2 underline"
              to={isRegister ? "/login" : "/register"}
            >
              {isRegister ? "Back to Login" : "Or click here to register"}
            </Link>
          </div>
        </div>
      </div>
    </form>
  );
};
export default Login;
