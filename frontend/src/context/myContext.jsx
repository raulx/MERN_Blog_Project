import { createContext, useState } from "react";

const myContext = createContext();

function MyContext({ children }) {
  const [phoneNav, setPhoneNav] = useState(false);

  return (
    <myContext.Provider value={{ phoneNav, setPhoneNav }}>
      {children}
    </myContext.Provider>
  );
}

export default myContext;
export { MyContext };
