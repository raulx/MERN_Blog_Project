import { useSelector } from "react-redux";
import { useParams, useSearchParams } from "react-router-dom";
import { useGetUserQuery } from "../../../store";
function DisplayBlog() {
  const { blogs, user } = useSelector((state) => {
    return state;
  });

  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const blogId = searchParams.get("blog");
  const { data, isFetching } = useGetUserQuery(id);

  const selectedBlog =
    blogs.blogs.find((blog) => blog.id === blogId) ||
    user.blogs.find((blog) => blog.id === blogId);
  return (
    <div className="overflow-y-scroll">
      <img src={selectedBlog.image.remote_url} />
      <p>{selectedBlog.title}</p>
      <p>{selectedBlog.content}</p>
      {isFetching ? (
        <div>fetching...</div>
      ) : (
        <div>
          <img src={data.profilePic} />
          {data.name}
        </div>
      )}
    </div>
  );
}

export default DisplayBlog;
