import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { FaTag } from "react-icons/fa";
import { useGetBlogsQuery } from "../store/api/blogApi";
import { addBlog, addPage } from "../store";
import { useEffect } from "react";

function Blogs() {
  const { blogs, currentPage } = useSelector((state) => {
    return state.blogs;
  });
  const { data, isFetching } = useGetBlogsQuery({
    page: currentPage,
    pageSize: 15,
  });
  const dispatch = useDispatch();
  const { type } = useParams();

  useEffect(() => {
    if (data) {
      console.log(data);
      dispatch(addBlog(data));
    }
  }, [data, dispatch]);

  const handleAddMoreData = () => {
    dispatch(addPage());
  };

  let blogData = blogs;

  if (type != "all") {
    blogData = blogData.filter((blog) => {
      return blog.category === type;
    });
  }

  return (
    <>
      <div className="p-4 flex flex-wrap w-full gap-4 h-full justify-center ">
        {blogData.map((blog) => {
          return (
            <div key={blog.id} className="w-96 h-96 border-2">
              <img
                src={blog.imageUrl}
                className="w-full h-1/2 object-cover object-center rounded-lg"
              />
              <div className="flex flex-col p-4">
                <h1 className="font-bold text-2xl">{blog.title}</h1>
                <p>
                  {blog.content.substring(0, 100)}...
                  <Link to={"/blog"} className="text-blue-500">
                    Read More
                  </Link>
                </p>
                <p className="rounded bg-gray-200 py-2 px-4 w-2/3 flex justify-start items-center gap-4">
                  <FaTag />
                  {blog.category}
                </p>
              </div>
            </div>
          );
        })}
        {type === "all" ? (
          <>
            {isFetching ? (
              <div>Fetching data....</div>
            ) : (
              <button onClick={handleAddMoreData}>Add more Data</button>
            )}
          </>
        ) : null}
      </div>
    </>
  );
}

export default Blogs;
