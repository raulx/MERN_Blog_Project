import { Link } from "react-router-dom";
import { useGetUserQuery } from "../../../store";

function ProfileScreen() {
  const { id } = JSON.parse(localStorage.getItem("user"));

  const { data, isFetching } = useGetUserQuery(id);

  let userData;
  if (isFetching) {
    userData = <div>isFetching...</div>;
  } else if (data) {
    userData = (
      <div>
        <p>{data.id}</p>
        <p>{data.name}</p>
        <img src={data.profilePic} />
        <button>
          <Link to={"/content"}>Go Back</Link>
        </button>
      </div>
    );
  }
  return (
    <div>
      <h1>{userData}</h1>
    </div>
  );
}

export default ProfileScreen;
