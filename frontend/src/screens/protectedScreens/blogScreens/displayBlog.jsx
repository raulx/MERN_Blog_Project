import { useSelector } from "react-redux";
import { useParams, useSearchParams } from "react-router-dom";
import { useGetUserQuery } from "../../../store";
import { useLazyBlogDataQuery } from "../../../store";
import { useEffect, useState } from "react";
import { FaEye } from "react-icons/fa";
import Avatar from "@mui/material//Avatar";
import { Spinner } from "baseui/spinner";

function DisplayBlog() {
  const blogs = useSelector((state) => state.blogs);
  const user = useSelector((state) => state.user);

  const [blogData, setBlogData] = useState(null);
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const blogId = searchParams.get("blogId");
  const { data: authorData } = useGetUserQuery(id);
  const [fetchBlogData] = useLazyBlogDataQuery();

  useEffect(() => {
    const getBlog = async () => {
      let selectedBlog =
        blogs.blogs.find((blog) => blog.id === blogId) ||
        user.blogs.find((blog) => blog.id === blogId);

      if (!selectedBlog) {
        const res = await fetchBlogData(blogId);
        selectedBlog = res.data[0];
      }
      setBlogData(selectedBlog);
    };
    getBlog();
  }, [blogId, blogs.blogs, fetchBlogData, user.blogs]);

  return (
    <div className="w-11/12 mx-auto">
      <>
        {blogData && authorData ? (
          <div>
            <div className="flex flex-wrap gap-4">
              <img className=" rounded-lg" src={blogData.image.remote_url} />
              <div className="grow p-4">
                <h1 className="text-5xl uppercase font-extrabold mt-10">
                  {blogData.title}
                </h1>
                <div className="mt-2">
                  <div className="flex gap-4  items-center ml-4">
                    <FaEye />
                    {blogData.likes}
                  </div>
                  <div className="mt-4">{blogData.date}</div>
                </div>

                <div className="flex gap-4 items-center mt-4">
                  <Avatar alt={authorData.name} src={authorData.profilePic} />
                  <p className="font-bold  text-lg">{authorData.name}</p>
                </div>
              </div>
            </div>
            <div className="text-lg my-10">{blogData.content}</div>
            <div>
              {blogData.comments.map((comment) => {
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
