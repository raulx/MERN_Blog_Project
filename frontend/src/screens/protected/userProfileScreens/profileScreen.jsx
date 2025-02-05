import { Link } from "react-router-dom";
import { useGetUserQuery } from "../../../store";

function ProfileScreen() {
  const { id } = JSON.parse(localStorage.getItem("user"));

  const { data, isLoading } = useGetUserQuery(id);

  let userData;

  if (isLoading) {
    userData = <div>isFetching...</div>;
  } else if (data) {
    userData = (
      <div>
        <p>{data.data._id}</p>
        <p>{data.data.name}</p>
        <img src={data.data.profile_pic} className="h-40 w-40" />
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
