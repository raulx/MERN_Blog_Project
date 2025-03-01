import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import {
  useAddCommentMutation,
  useAddLikeMutation,
  useDeleteCommentMutation,
  useLazyBlogDataQuery,
  useRemoveLikeMutation,
} from "../../store";
import { FaEye } from "react-icons/fa";
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
    likes: 0,
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
          return { ...prevValue, isLikedByUser: true };
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
          return { ...prevValue, isLikedByUser: false };
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
          <div className="sm:w-2/3 my-8  w-full mx-auto bg-slate-100 p-4">
            <div className="w-full bg-black">
              <div className="sm:w-2/3 h-96 sm:mx-auto">
                <img
                  className="w-full h-full object-contain rounded-lg"
                  src={blogData.image.remote_url}
                />
              </div>
            </div>

            <div>
              <h1 className="text-5xl uppercase font-extrabold mt-10">
                {blogData.title}
              </h1>

              <div className="flex gap-4 items-center">
                <FaEye />
                {blogData.views}
              </div>

              <div>
                {blogData.isLikedByUser ? (
                  <div>
                    <div>Liked</div>
                    <button onClick={handleRemoveLike}>Remove Like</button>
                  </div>
                ) : (
                  <div>
                    <div>Not Like</div>
                    <button onClick={handleAddLike}>Add Like</button>
                  </div>
                )}
              </div>

              <div className="flex gap-4 items-center mt-4">
                <p className="font-bold text-lg">{blogData.created_by.name}</p>
              </div>
            </div>

            <div className="text-lg my-10">{blogData.content}</div>

            <div>{blogData.comments.length} Comments</div>

            <hr className="h-[2px] bg-gray-300" />

            <div className="my-8 flex flex-col gap-8">
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
                className="grow p-4 rounded-lg"
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
