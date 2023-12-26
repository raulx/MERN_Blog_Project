/* eslint-disable react/prop-types */
// eslint-disable-next-line react/prop-types
import { filterDate } from "../utils/functions";
// import { Avatar, Button, Box, TextField } from "@mui/material";
// import { TextField, Button, Avatar } from "@radix-ui/themes";
// import { Avatar } from "@mui/material";
import { Avatar } from "@radix-ui/themes";
import { useState } from "react";
import { FcApproval } from "react-icons/fc";
import { FaTrash, FaSpinner, FaEdit } from "react-icons/fa";
import { LuDelete } from "react-icons/lu";
import { ImSpinner10 } from "react-icons/im";
import { IoSend } from "react-icons/io5";
import {
  useRemoveCommentMutation,
  useEditCommentMutation,
  useAuthorReplyMutation,
  useReplyDeleteMutation,
} from "../store";

function BlogComment({
  commentData,
  userData,
  blogData,
  authorData,
  blogId,
  updateBlogComments,
}) {
  const [isEdit, setIsEdit] = useState(false);
  const [isReply, setIsReply] = useState(false);
  const [showReply, setShowReply] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [reply, setReply] = useState("");
  const [removeComment, removingComment] = useRemoveCommentMutation();
  const [editComment, editingComment] = useEditCommentMutation();
  const [authorReply, authorReplying] = useAuthorReplyMutation();
  const [replyDelete, deletingReply] = useReplyDeleteMutation();

  const handleDeleteComment = async (comment) => {
    setIsEdit(false);
    const data = { blogId, commentId: comment._id };
    try {
      const res = await removeComment(data);

      updateBlogComments(res.data.updated.comments);
    } catch (err) {
      console.log(err);
    }
  };
  const handleEdit = (comment) => {
    setCommentText(comment.comment);
    setIsEdit(true);
    setIsReply(false);
  };

  const handleReplyDelete = async (comment) => {
    const data = { commentId: comment._id };

    try {
      const replyDeleted = await replyDelete(data);
      updateBlogComments(replyDeleted.data.updatedBlog.comments);
      setShowReply(false);
    } catch (err) {
      console.log(err);
    }
  };
  const handleAuthorReply = async (e, comment) => {
    e.preventDefault();
    setIsEdit(false);
    const data = { reply, blogId, commentId: comment._id };
    try {
      const newData = await authorReply(data);
      updateBlogComments(newData.data.newblog.comments);
      setIsReply(false);
      setShowReply(true);
      setReply("");
    } catch (error) {
      console.log(error);
    }
  };

  const handleSave = async (e, comment) => {
    e.preventDefault();
    const data = { blogId, commentId: comment._id, newComment: commentText };
    try {
      const edittedComment = await editComment(data);

      updateBlogComments(edittedComment.data.data.comments);
      setIsEdit(false);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex gap-4 mb-8 py-4 border border-gray-400 relative rounded-2xl">
      <div className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2">
        <Avatar
          src={commentData.profile_pic}
          size="4"
          radius="full"
          className="border border-gray-400"
        />
      </div>
      <div className="mx-8 w-full">
        <div className="flex relative justify-start items-center">
          <h1 className="text-xl font-bold text-blue-600">
            {commentData.creator_name}
          </h1>
          <p className="ml-4">{filterDate(commentData.created_at)}</p>
          {userData._id === blogData.data.created_by.id ? (
            <div className="absolute right-10">
              {commentData.replies.length === 0 ? (
                <>
                  <button
                    className="bg-transparent border-none text-blue-700"
                    onClick={() => {
                      setIsEdit(false);
                      setIsReply(!isReply);
                    }}
                  >
                    Reply
                  </button>
                </>
              ) : (
                <div className="flex gap-2 items-center font-extrabold text-green-400">
                  Replied <FcApproval />
                </div>
              )}
            </div>
          ) : null}
        </div>
        <hr className="my-2 border-t-2 " />
        <div className="flex flex-col">
          {isEdit ? (
            <form
              onSubmit={(e) => {
                handleSave(e, commentData);
              }}
            >
              <textarea
                value={commentText}
                className="w-full p-2 h-32 border-2 rounded multiline mb-6"
                required
                onChange={(e) => {
                  setCommentText(e.target.value);
                }}
              />
              <div className="flex gap-4">
                <button
                  className="py-2 px-4 bg-blue-500 text-white rounded-lg"
                  type="submit"
                >
                  {editingComment.isLoading ? (
                    <FaSpinner className="animate-spin text-2xl" />
                  ) : (
                    <>Save</>
                  )}
                </button>
                <button
                  className="py-2 px-4 bg-blue-500 text-white rounded-lg"
                  onClick={() => {
                    setIsEdit(false);
                  }}
                >
                  exit
                </button>
              </div>
            </form>
          ) : (
            <>
              <p>{commentData.comment}</p>
              {userData._id === commentData.creator_id ||
              userData._id === blogData.data.created_by.id ? (
                <div className="self-end mr-10 mt-2 flex gap-5">
                  {commentData.replies.length > 0 ? (
                    <button
                      className="text-blue-700"
                      onClick={() => {
                        setShowReply(!showReply);
                      }}
                    >
                      {showReply ? (
                        <>Hide Reply</>
                      ) : (
                        <>{commentData.replies.length} reply</>
                      )}
                    </button>
                  ) : null}
                  <button
                    className="p-4 bg-blue-500 text-white rounded-lg"
                    onClick={() => {
                      handleEdit(commentData);
                    }}
                  >
                    <FaEdit />
                  </button>
                  <button
                    className="p-4 bg-blue-500 text-white rounded-lg"
                    onClick={() => {
                      handleDeleteComment(commentData);
                    }}
                  >
                    {removingComment.isLoading ? (
                      <ImSpinner10 className="animate-spin text-2xl" />
                    ) : (
                      <FaTrash />
                    )}
                  </button>
                </div>
              ) : null}
            </>
          )}
          <div className="flex items-center">
            {showReply ? (
              <>
                {commentData.replies.map((d) => {
                  return (
                    <div
                      key={d._id}
                      className="ml-36 mt-10 border-2 rounded-xl flex  p-4 bg-gray-200 relative w-2/3"
                    >
                      <div className="absolute left-0 top-0 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 bg-gray-100">
                        <Avatar src={authorData.data.profile_pic} />
                      </div>
                      <div className="flex flex-col gap-4">
                        <h1 className="font-bold text-xl">
                          {authorData.data.name}
                        </h1>
                        <span className="bg-green-400 text-white text-center rounded-3xl w-16">
                          Author
                        </span>
                        <p className="mb-2">{d.reply}</p>
                      </div>
                      {userData._id === blogData.data.created_by.id ? (
                        <div className="font-extrabold text-xl absolute right-4 top-2 flex gap-4">
                          {deletingReply.isLoading ? (
                            <ImSpinner10 className="animate-spin" />
                          ) : (
                            <LuDelete
                              className="cursor-pointer"
                              onClick={() => handleReplyDelete(commentData)}
                            />
                          )}
                        </div>
                      ) : null}
                    </div>
                  );
                })}
              </>
            ) : null}
          </div>
        </div>
        {isReply ? (
          <form
            className="flex ml-24"
            onSubmit={(e) => {
              handleAuthorReply(e, commentData);
            }}
          >
            <Avatar
              src={authorData.data.profile_pic}
              className="mr-4 border-2 rounded-lg"
            />
            <input
              value={reply}
              className="w-4/5"
              required
              onChange={(e) => {
                setReply(e.target.value);
              }}
            />
            <button type="submit" className="py-2 px-4 bg-blue-500 text-white">
              {authorReplying.isLoading ? (
                <ImSpinner10 className="animate-spin text-2xl" />
              ) : (
                <IoSend className="text-2xl" />
              )}
            </button>
          </form>
        ) : null}
      </div>
    </div>
  );
}

export default BlogComment;
