import { useSearchParams } from "react-router-dom";
import {
  useAddCommentMutation,
  useDeleteCommentMutation,
  useLazyBlogDataQuery,
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
    data: {
      _id: "",
      title: "",
      content: "",
      views: 0,
      likes: 0,
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
    },
  });

  const [comment, setComment] = useState("");

  const [fetchBlogData, { isLoading, isFetching }] = useLazyBlogDataQuery();

  const [addComment, { isLoading: isAddingComment }] = useAddCommentMutation();
  const [deleteComment] = useDeleteCommentMutation();

  const isBlogByUser = blogData.data.created_by._id === userData._id; // blog viewed is created by the user logged in

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

  const handlePostComment = async (e) => {
    e.preventDefault();
    const newComment = { blogId, commentText: comment };

    try {
      const res = await addComment(newComment);

      if (res.data)
        setBlogData((prevValue) => {
          return {
            ...prevValue,
            data: {
              ...prevValue.data,
              comments: [res.data.data, ...prevValue.data.comments],
            },
          };
        });
    } catch (error) {
      console.log(error);
    }

    // reset the comment
    setComment("");
  };

  const handleDeleteComment = async (id) => {
    try {
      const res = await deleteComment(id);

      if (res.data) {
        setBlogData((prevValue) => {
          return {
            ...prevValue,
            data: {
              ...prevValue.data,
              comments: prevValue.data.comments.filter((c) => c._id != id),
            },
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
      const res = await addComment(replyData);
      if (res.data) {
        setBlogData((prevValue) => {
          return {
            ...prevValue,
            data: {
              ...prevValue.data,
              comments: prevValue.data.comments.map((c) =>
                c._id === commentId
                  ? { ...c, replies: [...c.replies, res.data.data] }
                  : c
              ),
            },
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
      const res = await deleteComment(replyId);
      if (res.data) {
        setBlogData((prevValue) => {
          return {
            ...prevValue,
            data: {
              ...prevValue.data,
              comments: prevValue.data.comments.map((c) =>
                c._id === commentId
                  ? {
                      ...c,
                      replies: c.replies.filter((r) => r._id != replyId),
                    }
                  : c
              ),
            },
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

            <div>{blogData.data.comments.length} Comments</div>

            <hr className="h-[2px] bg-gray-300" />

            <div className="my-8 flex flex-col gap-8">
              {blogData.data.comments.map((c) => {
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
