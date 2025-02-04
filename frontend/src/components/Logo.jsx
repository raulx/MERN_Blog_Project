/* eslint-disable react/prop-types */
import classNames from "classnames";
import { LiaBlogSolid } from "react-icons/lia";

const Logo = ({ size }) => {
  const textSize = {
    sm: "text-lg",
    md: "text-2xl",
    lg: "text-3xl",
  };

  const iconSize = {
    sm: "text-3xl",
    md: "text-5xl",
    lg: "text-7xl",
  };

  return (
    <div className={` flex justify-center items-center gap-1`}>
      <LiaBlogSolid className={classNames(iconSize[size], "text-[#FF8669]")} />
      <span
        className={classNames(
          textSize[size],
          "font-orbitron tracking-wider text-white font-semibold"
        )}
      >
        Blogs
      </span>
    </div>
  );
};

export default Logo;
