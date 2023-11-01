import { useSearchParams } from "react-router-dom";
import { useGetAuthorQuery } from "../../../store";
import { useBlogDataQuery } from "../../../store";
import { FaEye } from "react-icons/fa";
import Avatar from "@mui/material//Avatar";
import { Spinner } from "baseui/spinner";

function DisplayBlog() {
  const [searchParams] = useSearchParams();
  const blogId = searchParams.get("blogId");
  const authorId = searchParams.get("authorId");
  const { data: authorData } = useGetAuthorQuery(authorId);
  const { data: blogData } = useBlogDataQuery(blogId);

  return (
    <div className="w-11/12 mx-auto">
      <>
        {blogData && authorData ? (
          <div>
            <div className="flex flex-wrap gap-4">
              <img
                className=" rounded-lg"
                src={blogData.data.image.remote_url}
              />
              <div className="grow p-4">
                <h1 className="text-5xl uppercase font-extrabold mt-10">
                  {blogData.data.title}
                </h1>
                <div className="mt-2">
                  <div className="flex gap-4  items-center ml-4">
                    <FaEye />
                    {blogData.data.likes}
                  </div>
                  <div className="mt-4">{blogData.data.date}</div>
                </div>

                <div className="flex gap-4 items-center mt-4">
                  <Avatar
                    alt={authorData.data.name}
                    src={authorData.data.profilePic}
                  />
                  <p className="font-bold  text-lg">{authorData.data.name}</p>
                </div>
              </div>
            </div>
            <div className="text-lg my-10">{blogData.data.content}</div>
            <div>
              {blogData.data.comments.map((comment) => {
                return (
                  <div className="flex gap-4" key={comment.id}>
                    <Avatar src={comment.profilePic} />
                    <p>{comment.text}</p>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="w-full h-[36rem] flex justify-center items-center">
            <Spinner $size="200px" $borderWidth="10px" $borderColor="pink" />
          </div>
        )}
      </>
    </div>
  );
}

export default DisplayBlog;
