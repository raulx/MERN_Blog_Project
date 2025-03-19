import { useSearchParams } from "react-router-dom";
import { useGetUserProfileQuery } from "../../store";
import { formatDate } from "../../utils/functions";
import { BsFillPeopleFill } from "react-icons/bs";
import { GoDotFill } from "react-icons/go";

function AuthorProfile() {
  const [searchParams] = useSearchParams();

  const userId = searchParams.get("userId");

  const { data, isLoading } = useGetUserProfileQuery(userId);

  let render;

  if (isLoading) {
    render = <div>Loading author data ...</div>;
  }
  if (data) {
    render = (
      <div className="flex gap-8 p-6 ml-12 my-6">
        <div className="h-28 w-28 ">
          <img
            className="w-full h-full rounded-full object-cover"
            src={data.data.profile_pic}
          />
        </div>
        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-bold">{data.data.name}</h1>
          <div className="flex gap-2 items-center">
            <span>{data.data.email} </span> <GoDotFill />
            <span>{data.data.blogsWritten}</span>
            <span>blogs</span>
          </div>
          <div className="flex items-center gap-2">
            <BsFillPeopleFill />
            <span>followers</span>
            <span>{data.data.totalFollowers}</span>
          </div>
          <div className="text-sm">
            <span>Joined in : </span>
            {data.data.createdAt && (
              <span>{formatDate(data.data.createdAt)}</span>
            )}
          </div>
        </div>
      </div>
    );
  }

  return <div className="w-11/12 mx-auto">{render}</div>;
}

export default AuthorProfile;
