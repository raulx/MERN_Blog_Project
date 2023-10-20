import { useSelector } from "react-redux";
import { useParams, useSearchParams } from "react-router-dom";
import { useGetUserQuery } from "../../../store";
import { useLazyBlogDataQuery } from "../../../store";
import { useEffect, useState } from "react";
import Avatar from "@mui/material//Avatar";

function DisplayBlog() {
  const { blogs, user } = useSelector((state) => {
    return state;
  });

  const [blogData, setBlogData] = useState(null);
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const blogId = searchParams.get("blog");
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
                <p className="mt-2">{blogData.date}</p>

                <div className="flex gap-4 items-center mt-6">
                  <Avatar alt={authorData.name} src={authorData.profilePic} />
                  <p className="font-bold  text-lg">{authorData.name}</p>
                </div>
              </div>
            </div>
            <div className="text-lg my-10">{blogData.content}</div>
          </div>
        ) : (
          <p>Fetching Data</p>
        )}
      </>
    </div>
  );
}

export default DisplayBlog;

{
  /* <div>
              <img src={blogData.image.remote_url} />
              <p>{blogData.title}</p>
              <p>{blogData.content}</p>
            </div>
            <div>
              <p>{authorData.name}</p>
              <img src={authorData.profilePic} />
            </div> */
}
