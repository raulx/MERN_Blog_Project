import { useSelector } from "react-redux";

const UseUserData = () => {
  return useSelector((store) => store.user.data);
};

export default UseUserData;
