import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import {
  useAddCommentMutation,
  useAddLikeMutation,
  useDeleteCommentMutation,
  useLazyBlogDataQuery,
  useRemoveLikeMutation,
} from "../../store";
import { FaEye, FaThumbsUp } from "react-icons/fa";
import { FaSpinner } from "react-icons/fa";
import { useEffect, useState } from "react";
import { Footer } from "../../components/footer";
import Comment from "../../components/comment";
import UseUserData from "../../hooks/useUserData";

function ViewBlog() {
  const [searchParams] = useSearchParams();

  const blogId = searchParams.get("blogId");
  const { userData } = UseUserData();

  const [blogData, setBlogData] = useState({
    _id: "",
    title: "",
    content: "",
    views: 0,
    totalLikes: 0,
    isLikedByUser: false,
    category: "",
    image: { public_id: "", remote_url: "" },
    created_by: { _id: "", name: "", email: "", profile_pic: "" },
    createdAt: "",
    updatedAt: "",
    comments: [
      {
        _id: "",
        blogId: "",
        commentText: "",
        parentId: "",
        createdAt: "",
        updatedAt: "",
        postedBy: { _id: "", name: "", email: "", profile_pic: "" },
        replies: [
          {
            _id: "",
            blogId: "",
            commentText: "",
            parentId: "",
            createdAt: "",
            updatedAt: "",
            replyPostedBy: {
              _id: "",
              name: "",
              email: "",
              profile_pic: "",
            },
          },
        ],
      },
    ],
  });

  const [comment, setComment] = useState("");

  const [fetchBlogData, { isLoading, isFetching }] = useLazyBlogDataQuery();

  const [addComment, { isLoading: isAddingComment }] = useAddCommentMutation();

  const [removeLike] = useRemoveLikeMutation();
  const [addLike] = useAddLikeMutation();
  const [deleteComment] = useDeleteCommentMutation();
  const navigate = useNavigate();
  const location = useLocation();

  const isBlogByUser = blogData.created_by._id === userData._id; // blog viewed is created by the user logged in

  useEffect(() => {
    const getBlogData = async () => {
      try {
        const res = await fetchBlogData({ blogId, userId: userData._id });

        if (res.status === "fulfilled") {
          // set the initial blog data.
          setBlogData((prevValue) => {
            return { ...prevValue, ...res.data.data };
          });
        }
      } catch (err) {
        console.log(err);
      }
    };
    getBlogData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [blogId, fetchBlogData]);

  const handlePostComment = async (e) => {
    e.preventDefault();
    const newComment = { blogId, commentText: comment };

    try {
      const res = await addComment(newComment); // add comment in the database

      if (res.data) {
        // add comment in the local state
        setBlogData((prevValue) => {
          return {
            ...prevValue,
            comments: [res.data.data, ...prevValue.comments],
          };
        });
      }
    } catch (error) {
      console.log(error);
    }

    // reset the comment
    setComment("");
  };

  const handleDeleteComment = async (id) => {
    try {
      const res = await deleteComment(id); // remove comment from database

      if (res.data) {
        // remove comment from local state
        setBlogData((prevValue) => {
          return {
            ...prevValue,
            comments: prevValue.comments.filter((c) => c._id != id),
          };
        });
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleReplyAdd = async (e, commentId, replyText, setReplyText) => {
    e.preventDefault();

    const replyData = { blogId, commentText: replyText, parentId: commentId };

    try {
      const res = await addComment(replyData); // add the comment to the replies array in the database
      if (res.data) {
        // add the comment to the replies array in the local state.
        setBlogData((prevValue) => {
          return {
            ...prevValue,
            comments: prevValue.comments.map((c) =>
              c._id === commentId
                ? { ...c, replies: [...c.replies, res.data.data] }
                : c
            ),
          };
        });
      }
    } catch (error) {
      console.log(error);
    }
    setReplyText(""); // reset replyText
  };

  const handleReplyDelete = async (replyId, commentId) => {
    try {
      const res = await deleteComment(replyId); // delete the comment reply from backend database

      if (res.data) {
        // delete the comment reply from local state
        setBlogData((prevValue) => {
          return {
            ...prevValue,
            comments: prevValue.comments.map((c) =>
              c._id === commentId
                ? { ...c, replies: c.replies.filter((r) => r._id != replyId) }
                : c
            ),
          };
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddLike = async () => {
    try {
      const res = await addLike(blogData._id);

      if (res.data) {
        setBlogData((prevValue) => {
          return {
            ...prevValue,
            isLikedByUser: true,
            totalLikes: prevValue.totalLikes + 1,
          };
        });
      } else {
        const redirectUrl = `${location.pathname}${location.search}`;
        navigate(`/auth?redirect=${encodeURIComponent(redirectUrl)}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleRemoveLike = async () => {
    try {
      const res = await removeLike(blogData._id);

      if (res.data) {
        setBlogData((prevValue) => {
          return {
            ...prevValue,
            isLikedByUser: false,
            totalLikes: prevValue.totalLikes - 1,
          };
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {isLoading || isFetching ? (
        <div className="w-full h-[36rem] flex justify-center items-center">
          <FaSpinner className="animate-spin text-5xl" />
        </div>
      ) : (
        <>
          <div className="sm:w-2/3 my-4 w-full flex flex-col gap-4 shadow-lg mx-auto bg-white border rounded-lg border-slate-100 p-4">
            <div className="w-full bg-black">
              <div className="sm:w-2/3 h-96 sm:mx-auto">
                <img
                  className="w-full h-full object-contain rounded-lg"
                  src={blogData.image.remote_url}
                />
              </div>
            </div>

            <div className="flex justify-between items-center px-4">
              <div className="text-3xl uppercase font-bold w-2/3">
                {blogData.title} the thanos destroyer, saviour of earth,a
                billionaire
              </div>
              <div className=" text-gray-400 tracking-wide">
                Posted On : 22/12/23
              </div>
            </div>

            <div className="px-4 flex gap-4">
              <div className="flex gap-4 items-center">
                <FaEye />
                {blogData.views}
              </div>

              {/* condionally show the add like and remove like button  */}

              {blogData.isLikedByUser ? (
                <div
                  className={
                    "flex items-center gap-4 text-blue-600 cursor-pointer"
                  }
                  onClick={handleRemoveLike}
                >
                  <FaThumbsUp />
                  {blogData.totalLikes}
                </div>
              ) : (
                <div
                  className="flex gap-4 items-center cursor-pointer"
                  onClick={handleAddLike}
                >
                  <FaThumbsUp /> {blogData.totalLikes}
                </div>
              )}
            </div>

            <div className="text-lg px-4 leading-8">{blogData.content}</div>
            <div className="px-4 flex justify-end">
              <div className="flex flex-col gap-4 mr-8">
                <div className="font-bold text-black border-b-2">Author:</div>
                <div className="flex justify-center items-center gap-4">
                  <div className="h-8 w-8  rounded-full">
                    <img
                      className="w-full h-full rounded-full"
                      src={blogData.created_by.profile_pic}
                    />
                  </div>
                  <div className="font-semibold">
                    {blogData.created_by.name}
                  </div>
                </div>
              </div>
            </div>

            <div className="px-4 font-semibold">
              {blogData.comments.length} Comments
            </div>

            <hr className="h-[2px] bg-gray-300" />

            <div className="my-8 py-4 px-8 max-h-[500px] overflow-y-scroll scrollbar-none scroll-smooth overflow-x-hidden flex flex-col gap-8">
              {blogData.comments.map((c) => {
                return (
                  <Comment
                    key={c._id}
                    comment={c}
                    isBlogByUser={isBlogByUser}
                    onDelete={() => handleDeleteComment(c._id)}
                    onReplyAdd={handleReplyAdd}
                    onReplyDelete={handleReplyDelete}
                  />
                );
              })}
            </div>

            <form
              className="flex justify-center items-center gap-4"
              onSubmit={handlePostComment}
            >
              <input
                placeholder="Enter your comment"
                className="grow p-4 rounded-lg border"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
              <button
                className="p-4 w-24 bg-blue-600 flex justify-center items-center text-white rounded-lg"
                type="submit"
              >
                {isAddingComment ? (
                  <FaSpinner className="animate-spin" />
                ) : (
                  <>Post</>
                )}
              </button>
            </form>
          </div>
          <Footer />
        </>
      )}
    </>
  );
}

export default ViewBlog;
