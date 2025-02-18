import { useSearchParams } from "react-router-dom";
// import { useAddCommentMutation } from "../../store";
import { useLazyBlogDataQuery } from "../../store";
import { FaEye } from "react-icons/fa";
// import Comment from "../../components/blogComment";
import { FaSpinner } from "react-icons/fa";
import { useEffect, useState } from "react";
import { Footer } from "../../components/footer";
// import { useSelector } from "react-redux";

function ViewBlog() {
  const [searchParams] = useSearchParams();
  // const [comment, setComment] = useState("");
  const blogId = searchParams.get("blogId");
  const [blogData, setBlogData] = useState({ isLoading: true, data: null });
  const [fetchBlogData] = useLazyBlogDataQuery();

  // const { userData } = useSelector((state) => {
  //   return state.user;
  // });
  // const [addComment, addingComment] = useAddCommentMutation();

  useEffect(() => {
    const getBlogData = async () => {
      try {
        const res = await fetchBlogData(blogId);
        console.log(res);
        console.log(res.data.data.comments[0].postedBy);
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

  // const handleAddComment = async (e) => {
  //   e.preventDefault();

  //   const data = {
  //     blogId,
  //     userId: userData._id,
  //     comment,
  //   };

  //   try {
  //     const newComment = await addComment(data);

  //     if (newComment.data) {
  //       setBlogData((prevValue) => {
  //         return {
  //           ...prevValue,
  //           data: {
  //             ...prevValue.data,
  //             comments: newComment.data.blog.comments,
  //           },
  //         };
  //       });
  //     }
  //   } catch (err) {
  //     console.error(err);
  //   }
  //   setComment("");
  // };

  // const updateBlogComments = (newData) => {
  //   setBlogData((prevValue) => {
  //     return {
  //       ...prevValue,
  //       data: { ...prevValue.data, comments: newData },
  //     };
  //   });
  // };

  return (
    <>
      {blogData.data ? (
        <>
          <div className="sm:w-2/3 my-8  w-full mx-auto bg-slate-100 p-4">
            <div className="w-full bg-black">
              <div className="sm:w-2/3 h-96 sm:mx-auto">
                <img
                  className="w-full h-full object-contain rounded-lg"
                  src={blogData.data.image.remote_url}
                />
              </div>
            </div>

            <div>
              <h1 className="text-5xl uppercase font-extrabold mt-10">
                {blogData.data.title}
              </h1>

              <div className="flex gap-4 items-center">
                <FaEye />
                {blogData.data.views}
              </div>

              <div className="flex gap-4 items-center mt-4">
                <p className="font-bold text-lg">
                  {blogData.data.created_by.name}
                </p>
              </div>
            </div>

            <div className="text-lg my-10">{blogData.data.content}</div>

            {/* <div>
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
                    authorData={blogData.data.created_by}
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
          </div> */}

            <div>{blogData.data.comments.length} Comments</div>

            <hr className="h-[2px] bg-gray-300" />

            <div className="my-8 flex flex-col gap-8">
              {blogData.data.comments.map((c) => {
                return (
                  <div
                    key={c._id}
                    className="flex gap-2 justify-center items-center"
                  >
                    <div className="h-12 w-12 rounded-full">
                      <img
                        className="w-full h-full rounded-full"
                        src={c.postedBy.profile_pic}
                      />
                    </div>
                    <div className="grow">{c.commentText}</div>
                  </div>
                );
              })}
            </div>

            <div className="flex justify-center items-center gap-4">
              <input
                placeholder="Enter your comment"
                className="grow p-4 rounded-lg"
              />
              <button className="p-4 bg-blue-600 text-white rounded-lg">
                Add Comment
              </button>
            </div>
          </div>
          <Footer />
        </>
      ) : (
        <div className="w-full h-[36rem] flex justify-center items-center">
          <FaSpinner className="animate-spin text-5xl" />
        </div>
      )}
    </>
  );
}

export default ViewBlog;
