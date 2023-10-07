import { useState } from "react";
import { Link } from "react-router-dom";
function AuthScreen() {
  const [authType, setAuthType] = useState({ login: true, register: false });
  return (
    <div className="flex justify-center items-center h-screen w-screen bg-gradient-to-r">
      <div className="auth_box w-1/4  bg-white shadow-2xl rounded-2xl px-6 py-4 ">
        <div className="relative w-full h-full overflow-hidden">
          <div
            className={`h-full width flex transition-all duration-200 text-center ${
              authType.login ? "translate-x-0" : "-translate-x-2/4"
            }`}
          >
            <div className="login w-full h-full ">
              <h1 className="capitalize font-extrabold text-4xl py-4">
                Login Form
              </h1>
              <div className="mt-28 flex flex-col gap-4 w-full">
                <input
                  type="email"
                  placeholder="email address"
                  className="p-4  uppercase border rounded-xl focus:outline-gray-400"
                  autoFocus
                />
                <input
                  type="password"
                  placeholder="password"
                  className="p-4  uppercase border rounded-xl focus:outline-gray-400"
                />
                <Link
                  to={"/recoverAccount"}
                  className="text-start text-blue-900"
                >
                  Forgot password ?
                </Link>
                <button className="bg-gradient-to-r from-green-700 to-green-500 text-white p-4  rounded-2xl text-xl">
                  Login
                </button>
                <p>
                  Not a member ?
                  <span
                    className="text-blue-500 cursor-pointer"
                    onClick={() => {
                      setAuthType({ login: false, register: true });
                    }}
                  >
                    Sign up now
                  </span>
                </p>
              </div>
            </div>
            <div className="register w-full h-full">
              <h1 className="capitalize font-extrabold text-4xl py-4">
                Register Form
              </h1>
              <div className="mt-24 flex flex-col gap-4 w-full">
                <input
                  type="email"
                  placeholder="email address"
                  className=" p-4 uppercase  border rounded-xl focus:outline-gray-400"
                />
                <input
                  type="password"
                  placeholder="password"
                  className="p-4 uppercase  border rounded-xl focus:outline-gray-400"
                />
                <input
                  type="password"
                  placeholder="confirm password"
                  className="p-4 uppercase  border rounded-xl focus:outline-gray-400"
                />

                <button className="bg-gradient-to-r  from-green-700 to-green-500 text-white p-4 rounded-2xl text-xl">
                  Sign Up
                </button>
              </div>
            </div>
          </div>

          <div className="absolute w-full top-20 left-0 justify-between gap-0 flex border-2 rounded-2xl">
            <button
              className={`z-10 px-8 py-4 text-2xl w-full font-bold ${
                authType.login && "text-white"
              }`}
              onClick={() => {
                setAuthType({ login: true, register: false });
              }}
            >
              Login
            </button>
            <button
              className={`z-10 px-8 py-4 text-2xl w-full font-bold ${
                authType.register && "text-white"
              }`}
              onClick={() => {
                setAuthType({ login: false, register: true });
              }}
            >
              Register
            </button>
            <span
              className={`w-1/2 h-full bg-gradient-to-r from-green-700 to-green-500 rounded-2xl absolute transition-all duration-200 ${
                authType.login ? "left-0 top-0" : "left-2/4 top-0"
              }`}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthScreen;
