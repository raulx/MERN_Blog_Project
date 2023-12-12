import { useSearchParams } from "react-router-dom";
import {
  useAddCommentMutation,
  useAuthorReplyMutation,
  useEditCommentMutation,
  useGetAuthorQuery,
  useLazyBlogDataQuery,
  useRemoveCommentMutation,
  useReplyDeleteMutation,
} from "../../../store";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";
import Avatar from "@mui/material//Avatar";
import { Spinner } from "baseui/spinner";
import { contentTypeLinks } from "../../../utils/variables";
import { Link } from "react-router-dom";
import { TextField, Button, Box } from "@mui/material";
import UseMyContext from "../../../hooks/useMyContext";
import { FaSpinner } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { filterDate } from "../../../utils/functions";
import { LuDelete } from "react-icons/lu";
import { ImSpinner10 } from "react-icons/im";
import { IoSend } from "react-icons/io5";
import { FcApproval } from "react-icons/fc";

function DisplayBlog() {
  const [searchParams] = useSearchParams();
  const { phoneNav, setPhoneNav } = UseMyContext();
  const [comment, setComment] = useState("");
  const [commentText, setCommentText] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [isReply, setIsReply] = useState(false);
  const [showReply, setShowReply] = useState(false);
  const [reply, setReply] = useState("");
  const blogId = searchParams.get("blogId");
  const authorId = searchParams.get("authorId");
  const { data: authorData } = useGetAuthorQuery(authorId);
  const [blogData, setBlogData] = useState({ isLoading: true, data: null });
  const [fetchBlogData] = useLazyBlogDataQuery();
  const [authorReply, authorReplying] = useAuthorReplyMutation();
  const [replyDelete, deletingReply] = useReplyDeleteMutation();
  const { userData } = useSelector((state) => {
    return state.user;
  });
  const [addComment, addingComment] = useAddCommentMutation();
  const [removeComment, removingComment] = useRemoveCommentMutation();
  const [editComment, editingComment] = useEditCommentMutation();
  const [buttonClicked, setButtonClicked] = useState({ id: null });

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

  const handleDeleteComment = async (comment) => {
    setButtonClicked((prevValue) => {
      return { ...prevValue, id: comment._id };
    });
    setIsEdit(false);
    const data = { blogId, commentId: comment._id };
    try {
      const res = await removeComment(data);
      setBlogData((prevValue) => {
        return {
          ...prevValue,
          data: { ...prevValue.data, comments: res.data.updated.comments },
        };
      });
    } catch (err) {
      console.log(err);
    }
  };
  const handleEdit = (comment) => {
    setButtonClicked((prevValue) => {
      return { ...prevValue, id: comment._id };
    });
    setCommentText(comment.comment);
    setIsEdit(true);
    setIsReply(false);
  };

  const handleReplyDelete = async (comment) => {
    const data = { commentId: comment._id };
    setButtonClicked((prevValue) => {
      return { ...prevValue, id: comment._id };
    });
    try {
      const replyDeleted = await replyDelete(data);
      setBlogData((prevValue) => {
        return {
          ...prevValue,
          data: {
            ...prevValue.data,
            comments: replyDeleted.data.updatedBlog.comments,
          },
        };
      });
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
      setBlogData((prevValue) => {
        return {
          ...prevValue,
          data: {
            ...prevValue.data,
            comments: newData.data.newblog.comments,
          },
        };
      });
      setIsReply(false);
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
      setBlogData((prevValue) => {
        return {
          ...prevValue,
          data: {
            ...prevValue.data,
            comments: edittedComment.data.data.comments,
          },
        };
      });
      setIsEdit(false);
    } catch (error) {
      console.log(error);
    }
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
                    <Avatar
                      alt={authorData.data.name}
                      src={authorData.data.profile_pic}
                    />
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
                      <div
                        className="flex gap-4 mb-8 py-4 border border-gray-400 relative rounded-2xl"
                        key={comment._id}
                      >
                        <div className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2">
                          <Avatar
                            src={comment.profile_pic}
                            sx={{ width: 48, height: 48 }}
                            className="border border-gray-400"
                          />
                        </div>
                        <div className="mx-8 w-full">
                          <div className="flex relative justify-start items-center">
                            <h1 className="text-xl font-bold text-blue-600">
                              {comment.creator_name}
                            </h1>
                            <p className="ml-4">
                              {filterDate(comment.created_at)}
                            </p>
                            {userData._id === blogData.data.created_by.id ? (
                              <div className="absolute right-10">
                                {comment.replies.length === 0 ? (
                                  <>
                                    <Button
                                      onClick={() => {
                                        setButtonClicked((prevValue) => {
                                          return {
                                            ...prevValue,
                                            id: comment._id,
                                          };
                                        });
                                        setIsEdit(false);
                                        setIsReply(!isReply);
                                      }}
                                    >
                                      Reply
                                    </Button>
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
                            {isEdit && comment._id === buttonClicked.id ? (
                              <Box
                                component="form"
                                onSubmit={(e) => {
                                  handleSave(e, comment);
                                }}
                              >
                                <TextField
                                  value={commentText}
                                  className="w-full"
                                  multiline
                                  required
                                  onChange={(e) => {
                                    setCommentText(e.target.value);
                                  }}
                                />
                                <div>
                                  <Button type="submit">
                                    {editingComment.isLoading ? (
                                      <FaSpinner className="animate-spin text-2xl" />
                                    ) : (
                                      <>Save</>
                                    )}
                                  </Button>
                                  <Button
                                    onClick={() => {
                                      handleEdit(false);
                                    }}
                                  >
                                    exit
                                  </Button>
                                </div>
                              </Box>
                            ) : (
                              <>
                                <p>{comment.comment}</p>
                                {userData._id === comment.creator_id ? (
                                  <div className="self-end mr-10 mt-2">
                                    <Button
                                      onClick={() => {
                                        setButtonClicked((prevValue) => {
                                          return {
                                            ...prevValue,
                                            id: comment._id,
                                          };
                                        });
                                        setShowReply(!showReply);
                                      }}
                                    >
                                      {showReply &&
                                      buttonClicked.id === comment._id ? (
                                        <>Hide Reply</>
                                      ) : (
                                        <>Show Reply</>
                                      )}
                                    </Button>
                                    <Button
                                      onClick={() => {
                                        handleEdit(comment);
                                      }}
                                    >
                                      <FaEdit />
                                    </Button>
                                    <Button
                                      onClick={() => {
                                        handleDeleteComment(comment);
                                      }}
                                    >
                                      {removingComment.isLoading &&
                                      comment._id === buttonClicked.id ? (
                                        <ImSpinner10 className="animate-spin text-2xl" />
                                      ) : (
                                        <FaTrash />
                                      )}
                                    </Button>
                                  </div>
                                ) : null}
                              </>
                            )}
                            <div className="flex items-center">
                              {showReply && buttonClicked.id === comment._id ? (
                                <>
                                  {comment.replies.map((d) => {
                                    return (
                                      <div
                                        key={d._id}
                                        className="ml-36 mt-2 border-2 rounded-xl flex  p-4 bg-gray-200 relative w-2/3"
                                      >
                                        <div className="absolute left-0 top-0 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 bg-gray-100">
                                          <Avatar
                                            src={authorData.data.profile_pic}
                                          />
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
                                        {userData._id ===
                                        blogData.data.created_by.id ? (
                                          <div className="font-extrabold text-xl absolute right-4 top-2 flex gap-4">
                                            {deletingReply.isLoading &&
                                            buttonClicked.id === comment._id ? (
                                              <ImSpinner10 className="animate-spin" />
                                            ) : (
                                              <LuDelete
                                                className="cursor-pointer"
                                                onClick={() =>
                                                  handleReplyDelete(comment)
                                                }
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
                          {isReply && comment._id === buttonClicked.id ? (
                            <Box
                              className="flex ml-24"
                              component="form"
                              onSubmit={(e) => {
                                handleAuthorReply(e, comment);
                              }}
                            >
                              <Avatar
                                src={authorData.data.profile_pic}
                                className="mr-4 border-2 rounded-lg"
                              />
                              <TextField
                                multiline
                                value={reply}
                                className="w-4/5"
                                required
                                onChange={(e) => {
                                  setReply(e.target.value);
                                }}
                              />
                              <Button type="submit">
                                {authorReplying.isLoading ? (
                                  <ImSpinner10 className="animate-spin text-2xl" />
                                ) : (
                                  <IoSend className="text-2xl" />
                                )}
                              </Button>
                            </Box>
                          ) : null}
                        </div>
                      </div>
                    );
                  })}
                <Box component="form" onSubmit={(e) => handleAddComment(e)}>
                  <div className="my-4">
                    <TextField
                      id="outlined-multiline-flexible"
                      multiline
                      fullWidth
                      required
                      value={comment}
                      onChange={(e) => {
                        setComment(e.target.value);
                      }}
                    />
                  </div>

                  <div className="my-6">
                    <Button
                      variant="contained"
                      size="large"
                      sx={{ width: 120, height: 50 }}
                      type="submit"
                    >
                      <>
                        {addingComment.isLoading ? (
                          <FaSpinner className="animate-spin text-2xl" />
                        ) : (
                          <>Add Reply</>
                        )}
                      </>
                    </Button>
                  </div>
                </Box>
              </div>
            </div>
          ) : (
            <div className="w-full h-[36rem] flex justify-center items-center">
              <Spinner $size="200px" $borderWidth="10px" $borderColor="pink" />
            </div>
          )}
        </>
      </div>
    </div>
  );
}

export default DisplayBlog;
