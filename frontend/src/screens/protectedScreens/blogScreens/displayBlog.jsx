import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useGetUserQuery } from "../../../store";
function DisplayBlog() {
  const { blogs } = useSelector((state) => {
    return state.blogs;
  });
  const { id } = useParams();
  const { data, isFetching } = useGetUserQuery(id);

  const selectedBlog = blogs.find((blog) => blog.creatorId === id);

  return (
    <div>
      <img src={selectedBlog.imageUrl} />
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
