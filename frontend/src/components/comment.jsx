/* eslint-disable react/prop-types */
import { useState } from "react";

const Comment = ({ comment }) => {
  const [showReply, setShowReply] = useState(false);
  return (
    <div className="border-2 flex flex-col gap-4 border-gray-300 rounded-lg py-4">
      <div className="flex gap-2 justify-center items-center">
        <div className="h-12 w-12 rounded-full">
          <img
            className="w-full h-full rounded-full"
            src={comment.postedBy?.profile_pic}
          />
        </div>
        <div className="grow">{comment.commentText}</div>
      </div>
      <button className="w-48" onClick={() => setShowReply(!showReply)}>
        {comment.replies.length} show replies
      </button>
      {showReply && (
        <div className="flex flex-col gap-4 w-11/12 mx-auto ">
          {comment.replies.map((reply) => {
            return (
              <div
                key={reply._id}
                className="py-4 border-gray-300 rounded-lg border-2"
              >
                <div className="flex gap-2 justify-center items-center">
                  <div className="h-12 w-12 rounded-full">
                    <img
                      className="w-full h-full rounded-full"
                      src={reply.replyPostedBy?.profile_pic}
                    />
                  </div>
                  <div className="grow">{reply.commentText}</div>
                </div>
              </div>
            );
          })}

          <div className="flex justify-center items-center gap-4">
            <input
              placeholder="Enter your comment"
              className="grow p-2 rounded-lg"
            />
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg">
              Reply
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Comment;
