/* eslint-disable react/prop-types */
import classNames from "classnames";

function Skeleton({ ...rest }) {
  const classes = classNames(rest.className, "bg-gray-200  animate-pulse");
  return <div className={classes} {...rest} />;
}

export default Skeleton;
