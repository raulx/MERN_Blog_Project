import { useSearchParams } from "react-router-dom";
import {
  useAddCommentMutation,
  useGetAuthorQuery,
  useLazyBlogDataQuery,
} from "../../store";
import { FaEye } from "react-icons/fa";
import Comment from "../../components/blogComment";
import { contentTypeLinks } from "../../utils/variables";
import { Link } from "react-router-dom";
import UseMyContext from "../../hooks/useMyContext";
import { FaSpinner } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function ViewBlog() {
  const [searchParams] = useSearchParams();
  const { phoneNav, setPhoneNav } = UseMyContext();
  const [comment, setComment] = useState("");
  const blogId = searchParams.get("blogId");
  const authorId = searchParams.get("authorId");
  const { data: authorData } = useGetAuthorQuery(authorId);
  const [blogData, setBlogData] = useState({ isLoading: true, data: null });
  const [fetchBlogData] = useLazyBlogDataQuery();

  const { userData } = useSelector((state) => {
    return state.user;
  });
  const [addComment, addingComment] = useAddCommentMutation();

  useEffect(() => {
    const getBlogData = async () => {
      try {
        const res = await fetchBlogData(blogId);
        if (res.status === "fulfilled") {
          setBlogData((prevValue) => {
            return { ...prevValue, isLoading: false, data: res.data.data };
          });
        }
      } catch (err) {
        console.log(err);
      }
    };
    getBlogData();
  }, [blogId, fetchBlogData]);

  const handleAddComment = async (e) => {
    e.preventDefault();
    const data = {
      blogId,
      userId: userData._id,
      comment,
    };

    try {
      const newComment = await addComment(data);
      if (newComment.data) {
        setBlogData((prevValue) => {
          return {
            ...prevValue,
            data: {
              ...prevValue.data,
              comments: newComment.data.blog.comments,
            },
          };
        });
      }
    } catch (err) {
      console.error(err);
    }
    setComment("");
  };

  const updateBlogComments = (newData) => {
    setBlogData((prevValue) => {
      return {
        ...prevValue,
        data: { ...prevValue.data, comments: newData },
      };
    });
  };

  return (
    <div className="h-screen overflow-y-scroll">
      <div
        className={`col-span-1  text-lg flex md:hidden absolute z-20 top-24 left-0 w-full h-full  row-span-6 gap-2 sidebar rounded shadow-sm flex-col md:translate-x-0 items-center border bg-white md:py-6 transition-all duration-200 md:px-4 overflow-y-scroll ${
          phoneNav ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {contentTypeLinks.map((link) => {
          return (
            <Link
              key={link.type}
              className={`w-full hover:bg-green-400 hover:text-white uppercase py-4 rounded transition-all duration-200 text-center  ${
                location.pathname === link.url
                  ? "bg-green-500 text-white"
                  : null
              }`}
              to={link.url}
              onClick={() => setPhoneNav(false)}
            >
              {link.type}
            </Link>
          );
        })}
      </div>
      <div className="w-11/12 mx-auto">
        <>
          {blogData.data && authorData ? (
            <div>
              <div className="flex flex-wrap gap-4">
                <img
                  className="rounded-lg max-h-96"
                  src={blogData.data.image.remote_url}
                />
                <div className="grow p-4">
                  <h1 className="text-5xl uppercase font-extrabold mt-10">
                    {blogData.data.title}
                  </h1>
                  <div className="mt-2">
                    <div className="flex gap-4  items-center ml-4">
                      <FaEye />
                      {blogData.data.views}
                    </div>
                    <div className="mt-4">{blogData.data.date}</div>
                  </div>

                  <div className="flex gap-4 items-center mt-4">
                    <p className="font-bold text-lg">{authorData.data.name}</p>
                  </div>
                </div>
              </div>
              <div className="text-lg my-10">{blogData.data.content}</div>
              <div>
                <p className="text-2xl capitalize font-bold border-b-2 mb-16">
                  {blogData.data.comments.length} Comments
                </p>
                {blogData.data.comments
                  .slice()
                  .reverse()
                  .map((comment) => {
                    return (
                      <Comment
                        key={comment._id}
                        commentData={comment}
                        userData={userData}
                        blogData={blogData}
                        authorData={authorData}
                        updateBlogComments={updateBlogComments}
                        blogId={blogId}
                      />
                    );
                  })}
                <form onSubmit={(e) => handleAddComment(e)}>
                  <div className="my-4">
                    <input
                      type="text"
                      required
                      value={comment}
                      onChange={(e) => {
                        setComment(e.target.value);
                      }}
                      className="border-2 h-12 w-2/3 outline-none select-none px-4"
                    />
                  </div>

                  <div className="my-6">
                    <button
                      type="submit"
                      className="py-2 px-4 bg-blue-500 text-white"
                    >
                      <>
                        {addingComment.isLoading ? (
                          <FaSpinner className="animate-spin text-2xl" />
                        ) : (
                          <>Add Reply</>
                        )}
                      </>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          ) : (
            <div className="w-full h-[36rem] flex justify-center items-center">
              <FaSpinner className="animate-spin text-5xl" />
            </div>
          )}
        </>
      </div>
    </div>
  );
}

export default ViewBlog;
