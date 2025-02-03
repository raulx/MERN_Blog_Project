import { Outlet } from "react-router-dom";

function ContentScreen() {
  return (
    <div className="h-full w-full md:grid grid-cols-6 grid-rows-6 flex flex-col justify-between">
      <div className="md:col-span-6  md:row-span-6 grow bg-white">
        <Outlet />
      </div>
    </div>
  );
}

export default ContentScreen;
