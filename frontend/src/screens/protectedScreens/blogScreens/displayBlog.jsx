import { useSearchParams } from "react-router-dom";
import { useGetAuthorQuery } from "../../../store";
import { useBlogDataQuery } from "../../../store";
import { FaEye } from "react-icons/fa";
import Avatar from "@mui/material//Avatar";
import { Spinner } from "baseui/spinner";
import { contentTypeLinks } from "../../../utils/variables";
import { Link } from "react-router-dom";
import UseMyContext from "../../../hooks/useMyContext";

function DisplayBlog() {
  const [searchParams] = useSearchParams();
  const { phoneNav, setPhoneNav } = UseMyContext();
  const blogId = searchParams.get("blogId");
  const authorId = searchParams.get("authorId");
  const { data: authorData } = useGetAuthorQuery(authorId);
  const { data: blogData } = useBlogDataQuery(blogId);

  return (
    <div>
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
    </div>
  );
}

export default DisplayBlog;
