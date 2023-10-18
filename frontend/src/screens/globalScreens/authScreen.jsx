import { useState } from "react";
import { Spinner } from "baseui/spinner";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { loggedIn } from "../../store";
import { useLogInMutation } from "../../store";

function AuthScreen() {
  const [authType, setAuthType] = useState({ login: true, register: false });
  const [loginState, setLoginState] = useState({ email: "", password: "" });
  const [logIn, results] = useLogInMutation();
  const [registerState, setRegisterState] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await logIn(loginState.email);
      const userId = res.data[0].id;
      dispatch(loggedIn(userId));
      navigate("/content");
    } catch (err) {
      console.log(`Error:${err}`);
    }
  };
  const handleRegister = () => {
    console.log(registerState);
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
      {results.isLoading ? (
        <div className="h-screen w-full flex justify-center items-center">
          <Spinner $size="120px" $borderWidth="10px" />
        </div>
      ) : (
        <>
          <div className="flex justify-center items-center h-screen w-screen">
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
                    <div className="mt-28 flex flex-col gap-4 w-full">
                      <input
                        type="email"
                        placeholder="email address"
                        className="p-4  border rounded-xl focus:outline-gray-400"
                        autoFocus
                        value={loginState.email}
                        onChange={(e) => {
                          handleChange(e, "email");
                        }}
                      />
                      <input
                        type="password"
                        placeholder="password"
                        className="p-4  border rounded-xl focus:outline-gray-400"
                        value={loginState.password}
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
                        onClick={handleLogin}
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
                        className=" p-4 border rounded-xl focus:outline-gray-400"
                        value={registerState.email}
                        onChange={(e) => {
                          handleChange(e, "email");
                        }}
                      />
                      <input
                        type="password"
                        placeholder="password"
                        className="p-4  border rounded-xl focus:outline-gray-400"
                        value={registerState.password}
                        onChange={(e) => {
                          handleChange(e, "password");
                        }}
                      />
                      <input
                        type="password"
                        placeholder="confirm password"
                        className="p-4 border rounded-xl focus:outline-gray-400"
                        value={registerState.confirmPassword}
                        onChange={(e) => {
                          handleChange(e, "confirmPassword");
                        }}
                      />

                      <button
                        className="bg-gradient-to-r  from-green-700 to-green-500 text-white p-4 rounded-2xl text-xl"
                        onClick={handleRegister}
                      >
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
        </>
      )}
    </>
  );
}

export default AuthScreen;
