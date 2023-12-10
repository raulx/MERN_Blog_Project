import { useSearchParams } from "react-router-dom";
import {
  useAddCommentMutation,
  useEditCommentMutation,
  useGetAuthorQuery,
  useLazyBlogDataQuery,
  useRemoveCommentMutation,
} from "../../../store";
import { FaEye } from "react-icons/fa";
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

function DisplayBlog() {
  const [searchParams] = useSearchParams();
  const { phoneNav, setPhoneNav } = UseMyContext();
  const [comment, setComment] = useState("");
  const [commentText, setCommentText] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const blogId = searchParams.get("blogId");
  const authorId = searchParams.get("authorId");
  const { data: authorData } = useGetAuthorQuery(authorId);
  const [blogData, setBlogData] = useState({ isLoading: true, data: null });
  const [fetchBlogData] = useLazyBlogDataQuery();
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
  };

  const handleSave = async (comment) => {
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
                          <div className="flex justify-start items-center">
                            <h1 className="text-xl font-bold text-blue-600">
                              {comment.creator_name}
                            </h1>
                            <p className="ml-4">
                              {filterDate(comment.created_at)}
                            </p>
                          </div>
                          <hr className="my-2 border-t-2 " />
                          <div className="flex flex-col">
                            {isEdit && comment._id === buttonClicked.id ? (
                              <>
                                <TextField
                                  value={commentText}
                                  multiline
                                  onChange={(e) => {
                                    setCommentText(e.target.value);
                                  }}
                                />
                                <Button
                                  onClick={() => {
                                    handleSave(comment);
                                  }}
                                >
                                  {editingComment.isLoading ? (
                                    <FaSpinner className="animate-spin text-2xl" />
                                  ) : (
                                    <>Save</>
                                  )}
                                </Button>
                              </>
                            ) : (
                              <>
                                <p>{comment.comment}</p>
                                {userData._id === comment.creator_id ? (
                                  <div className="self-end mr-10 mt-2">
                                    <Button
                                      onClick={() => {
                                        handleEdit(comment);
                                      }}
                                    >
                                      Edit
                                    </Button>
                                    <Button
                                      onClick={() => {
                                        handleDeleteComment(comment);
                                      }}
                                    >
                                      {removingComment.isLoading &&
                                      comment._id === buttonClicked.id ? (
                                        <FaSpinner className="animate-spin text-2xl" />
                                      ) : (
                                        <>Delete</>
                                      )}
                                    </Button>
                                  </div>
                                ) : null}
                              </>
                            )}
                          </div>
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
