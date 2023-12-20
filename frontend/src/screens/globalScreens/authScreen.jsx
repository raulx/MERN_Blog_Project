import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { loggedIn } from "../../store";
import { useLogInMutation } from "../../store";
import { useRegisterUserMutation } from "../../store";
import toast, { Toaster } from "react-hot-toast";
import { FaSpinner } from "react-icons/fa";

function AuthScreen() {
  const [authType, setAuthType] = useState({ login: true, register: false });
  const [loginState, setLoginState] = useState({ email: "", password: "" });
  const [logIn, logging] = useLogInMutation();
  const [registerUser, registering] = useRegisterUserMutation();
  const [registerState, setRegisterState] = useState({
    name: "",
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    const user = { email: loginState.email, password: loginState.password };
    try {
      const res = await logIn(user);
      const userId = res.data.id;
      if (userId) {
        dispatch(loggedIn(userId));
        navigate("/content");
      } else {
        throw new Error(res.data.message);
      }
    } catch (err) {
      toast.error(`${err.message}`);
    }
  };
  const handleRegister = async (e) => {
    e.preventDefault();
    const user = {
      name: registerState.name,
      email: registerState.email,
      password: registerState.password,
    };
    try {
      const res = await registerUser(user);
      dispatch(loggedIn(res.data.id));
      navigate("/content");
    } catch (err) {
      console.error(err);
    }
  };

  const setInput = (prevValue, inputType, typedInput) => {
    const key = inputType;
    return { ...prevValue, [key]: typedInput };
  };

  const handleChange = (event, inputType) => {
    const typedInput = event.target.value;
    if (authType.login) {
      setLoginState((prevValue) => {
        return setInput(prevValue, inputType, typedInput);
      });
    } else if (authType.register) {
      setRegisterState((prevValue) => {
        return setInput(prevValue, inputType, typedInput);
      });
    }
  };

  return (
    <>
      {logging.isLoading || registering.isLoading ? (
        <div className="h-screen w-full flex justify-center items-center">
          <FaSpinner className="animate-spin text-5xl" />
        </div>
      ) : (
        <>
          <div className="flex justify-center items-center h-screen w-screen">
            <Toaster />
            <div className="auth_box w-1/4  bg-white shadow-2xl rounded-2xl px-6 py-4 ">
              <div className="relative w-full h-full overflow-hidden">
                <div
                  className={`h-full custom_width flex transition-all duration-200 text-center ${
                    authType.login ? "translate-x-0" : "-translate-x-2/4"
                  }`}
                >
                  <div className="login w-full h-full ">
                    <h1 className="capitalize font-extrabold text-4xl py-4">
                      Login Form
                    </h1>
                    <form
                      className="mt-28 flex flex-col gap-4 w-full"
                      onSubmit={(e) => {
                        handleLogin(e);
                      }}
                    >
                      <input
                        type="email"
                        placeholder="Email Address"
                        className="p-4  border rounded-xl focus:outline-gray-400"
                        autoFocus
                        required
                        value={loginState.email}
                        onChange={(e) => {
                          handleChange(e, "email");
                        }}
                      />
                      <input
                        type="password"
                        placeholder="Password"
                        className="p-4  border rounded-xl focus:outline-gray-400"
                        value={loginState.password}
                        required
                        onChange={(e) => {
                          handleChange(e, "password");
                        }}
                      />
                      <Link
                        to={"/recoverAccount"}
                        className="text-start text-blue-900"
                      >
                        Forgot password ?
                      </Link>
                      <button
                        className="bg-gradient-to-r from-green-700 to-green-500 text-white p-4  rounded-2xl text-xl"
                        type="submit"
                      >
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
                    </form>
                  </div>
                  <div className="register w-full h-full">
                    <h1 className="capitalize font-extrabold text-4xl py-4">
                      Register Form
                    </h1>
                    <form
                      className="mt-24 flex flex-col gap-4 w-full"
                      onSubmit={handleRegister}
                    >
                      <input
                        type="text"
                        placeholder="Enter Username"
                        className=" p-4 border rounded-xl focus:outline-gray-400"
                        value={registerState.name}
                        required
                        onChange={(e) => {
                          handleChange(e, "name");
                        }}
                      />
                      <input
                        type="email"
                        placeholder="Enter Email"
                        className="p-4  border rounded-xl focus:outline-gray-400"
                        value={registerState.email}
                        required
                        onChange={(e) => {
                          handleChange(e, "email");
                        }}
                      />
                      <input
                        type="password"
                        placeholder="Enter Password"
                        className="p-4 border rounded-xl focus:outline-gray-400"
                        value={registerState.password}
                        required
                        onChange={(e) => {
                          handleChange(e, "password");
                        }}
                      />

                      <button className="bg-gradient-to-r  from-green-700 to-green-500 text-white p-4 rounded-2xl text-xl">
                        Sign Up
                      </button>
                    </form>
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
        </>
      )}
    </>
  );
}

export default AuthScreen;
