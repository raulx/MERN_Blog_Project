/* eslint-disable react/prop-types */
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { Avatar } from "@radix-ui/themes";
import { MdArrowRight, MdArrowDropDown } from "react-icons/md";
import { ImProfile } from "react-icons/im";
import { BiLogOut } from "react-icons/bi";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loggedOut } from "../store";
import { setUserData } from "../store";
import { useLogOutMutation } from "../store";

function AccounMenu({ avatarLink }) {
  const [isOpen, setIsOpen] = useState(false);
  const [logOut] = useLogOutMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  console.log(avatarLink);
  const handleLogout = async () => {
    try {
      await logOut().unwrap();
      dispatch(loggedOut());
      dispatch(setUserData({ userData: "", blogs: [] }));
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <>
      <DropdownMenu.Root onOpenChange={() => setIsOpen(!isOpen)}>
        <DropdownMenu.Trigger className="select-none outline-none  flex justify-center items-center gap-2 transition-all duration-150">
          <Avatar size="4" radius="full" src={avatarLink} />
          {isOpen ? (
            <MdArrowDropDown className="text-2xl" />
          ) : (
            <MdArrowRight className="text-2xl" />
          )}
        </DropdownMenu.Trigger>

        <DropdownMenu.Portal>
          <DropdownMenu.Content
            sideOffset={10}
            className="py-2 px-4 text-lg border-2 border-gray-300 bg-white rounded-lg  animate-slideDownAndFade"
          >
            <DropdownMenu.Arrow className="fill-white" />
            <DropdownMenu.Item
              onSelect={() => navigate("/profile")}
              className="p-2 my-4 cursor-pointer select-none outline-none flex gap-4 items-center"
            >
              <ImProfile />
              <span>Profile</span>
            </DropdownMenu.Item>

            <DropdownMenu.Item
              onSelect={() => {
                handleLogout();
              }}
              className="p-2 my-4 rounded-md select-none outline-none flex gap-4 items-center cursor-pointer"
            >
              <BiLogOut />
              <span>Logout</span>
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
    </>
  );
}

export default AccounMenu;
