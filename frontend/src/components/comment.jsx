/* eslint-disable react/prop-types */
import { useState } from "react";
import UseUserData from "../hooks/useUserData";
import { FaCaretDown, FaCaretUp } from "react-icons/fa";
import { Avatar } from "./avatar";

const Comment = ({
  comment,
  onDelete,
  isBlogByUser,
  onReplyAdd,
  onReplyDelete,
}) => {
  const userData = UseUserData();
  const [replyText, setReplyText] = useState("");
  const [showReply, setShowReply] = useState(false);

  return (
    <div className="border-l-2 flex flex-col gap-2 relative  px-8 border-black">
      <div className="h-8 w-8 rounded-full absolute left-0 top-0 -translate-x-1/2">
        <Avatar
          userId={comment.postedBy._id}
          avatarLink={comment.postedBy?.profile_pic}
          size="small"
        />
      </div>
      <h1 className="font-semibold">{comment.postedBy?.name}</h1>
      <p className="text-gray-600">{comment.commentText}</p>

      <div className="flex items-center justify-between">
        <div
          onClick={() => setShowReply(!showReply)}
          className="flex cursor-pointer gap-2 items-center"
        >
          <span>replies {comment.replies.length}</span>
          {showReply ? <FaCaretDown /> : <FaCaretUp />}
        </div>

        {/* show delete button only if comment is created by user or the blog  viewed is created by user  */}
        {comment.postedBy._id === userData._id || isBlogByUser ? (
          <button onClick={onDelete} className="w-48 text-sm text-red-600">
            Delete
          </button>
        ) : null}
      </div>
      {showReply && (
        <div className="flex flex-col gap-4 ml-4 mt-2">
          {comment.replies.map((reply) => {
            return (
              <div
                key={reply._id}
                className="border-l-2 flex flex-col gap-2 border-black"
              >
                <div className="flex gap-2 flex-col relative px-8">
                  <div className="h-8 w-8 absolute left-0 top-0 -translate-x-1/2 rounded-full">
                    <Avatar
                      userId={reply.replyPostedBy._id}
                      avatarLink={reply.replyPostedBy?.profile_pic}
                      size="small"
                    />
                  </div>
                  <h1>{reply.replyPostedBy.name}</h1>
                  <p>{reply.commentText}</p>
                </div>

                {reply.replyPostedBy._id === userData._id || isBlogByUser ? (
                  <button
                    className="w-48 self-end text-sm text-red-600"
                    onClick={() => onReplyDelete(reply._id, comment._id)}
                  >
                    Delete
                  </button>
                ) : null}
              </div>
            );
          })}

          <form
            className="flex justify-center items-center gap-4"
            onSubmit={(e) =>
              onReplyAdd(e, comment._id, replyText, setReplyText)
            }
          >
            <input
              placeholder="Enter your Reply"
              className="grow p-2 border-2 rounded-lg"
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
            />
            <button
              className="px-4 py-2 bg-blue-600 text-white rounded-lg"
              type="submit"
            >
              Reply
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Comment;
