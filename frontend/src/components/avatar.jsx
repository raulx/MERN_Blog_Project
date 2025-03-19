import { Link } from "react-router-dom";
import PropTypes from "prop-types";

export const Avatar = ({ avatarLink, userId, size, ...rest }) => {
  let sizeClasses = "";

  if (size === "small") {
    sizeClasses = "h-12 w-12";
  } else if (size === "medium") {
    sizeClasses = "h-16 w-16";
  } else if (size === "large") {
    sizeClasses = "h-24 w-24";
  } else {
    sizeClasses = "h-20 w-20";
  }

  return (
    <Link
      className={`${sizeClasses}`}
      to={`/author-profile?userId=${userId}`}
      {...rest}
    >
      <img
        className="w-full h-full rounded-full object-cover"
        src={avatarLink}
      />
    </Link>
  );
};

Avatar.propTypes = {
  avatarLink: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
  size: PropTypes.oneOf(["small", "medium", "large"]),
};
