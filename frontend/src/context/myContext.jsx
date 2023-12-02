import { createContext, useState } from "react";

const myContext = createContext();

// eslint-disable-next-line react/prop-types
function MyContext({ children }) {
  const [phoneNav, setPhoneNav] = useState(false);

  return (
    <myContext.Provider value={{ phoneNav, setPhoneNav }}>
      {children}
    </myContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export default myContext;
export { MyContext };
