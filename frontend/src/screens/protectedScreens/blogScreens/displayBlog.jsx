import { useSearchParams } from "react-router-dom";
import { useAddCommentMutation, useGetAuthorQuery } from "../../../store";
import { useBlogDataQuery } from "../../../store";
import { FaEye } from "react-icons/fa";
import Avatar from "@mui/material//Avatar";
import { Spinner } from "baseui/spinner";
import { contentTypeLinks } from "../../../utils/variables";
import { Link } from "react-router-dom";
import { TextField, Button, Box } from "@mui/material";
import UseMyContext from "../../../hooks/useMyContext";
import { FaSpinner } from "react-icons/fa";
import { useState } from "react";
import { useSelector } from "react-redux";
import { filterDate } from "../../../utils/functions";

function DisplayBlog() {
  const [searchParams] = useSearchParams();
  const { phoneNav, setPhoneNav } = UseMyContext();
  const [comment, setComment] = useState("");
  const blogId = searchParams.get("blogId");
  const authorId = searchParams.get("authorId");
  const { data: authorData } = useGetAuthorQuery(authorId);
  const { data: blogData } = useBlogDataQuery(blogId);
  const { userData } = useSelector((state) => {
    return state.user;
  });
  const [isAddingComment, setIsAddingComment] = useState(false);
  const [addComment] = useAddCommentMutation();

  const handleAddComment = async (e) => {
    e.preventDefault();
    const data = {
      blogId,
      userId: userData._id,
      comment,
    };
    try {
      setIsAddingComment(true);
      const res = await addComment(data);
      if (res.data) {
        setIsAddingComment(false);
      }
    } catch (err) {
      console.error(err);
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
          {blogData && authorData ? (
            <div>
              <div className="flex flex-wrap gap-4">
                <img
                  className=" rounded-lg max-h-96"
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
                    <p className="font-bold  text-lg">{authorData.data.name}</p>
                  </div>
                </div>
              </div>
              <div className="text-lg my-10">{blogData.data.content}</div>
              <div>
                <p className="text-2xl capitalize font-bold border-b-2 mb-10">
                  Comments
                </p>
                {blogData.data.comments
                  .slice()
                  .reverse()
                  .map((comment) => {
                    return (
                      <div className="flex gap-4" key={comment._id}>
                        <Avatar src={comment.profile_pic} />
                        <p>
                          {comment.comment} {filterDate(comment.created_at)}
                        </p>
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
                      {" "}
                      <>
                        {isAddingComment ? (
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
