
import {  AiOutlineUserAdd } from "react-icons/ai";
import { RiUserSettingsLine, RiUserStarLine } from "react-icons/ri";
import { RiUserReceived2Line } from "react-icons/ri";
import { BiCategory } from "react-icons/bi";
import { IoLanguage } from "react-icons/io5";
import { BiLandscape,BiBookAlt } from "react-icons/bi";
import { GoBook } from "react-icons/go";
import {MdCardMembership, MdOutlinePublishedWithChanges,} from "react-icons/md";


export const navItem = [
  {
    title: "Item",
    role: "admin",
    icon: <BiBookAlt />,
    children: [
      {
        title: "Book Item",
        link: "item-list",
        role: "admin",
        icon: <GoBook />,
      },
    ],
  },

  {
    title: "Master Settings",
    role: "admin",
    icon: <RiUserSettingsLine />,
    children: [
      {
        title: "Author",
        link: "author-list",
        role: "admin",
        icon: <RiUserReceived2Line />,
      },
      {
        title: "Category",
        link: "category-list",
        role: "admin",
        icon: <BiCategory />,
      },
      {
        title: "Sub Category",
        link: "sub-category-list",
        role: "admin",
        icon: <BiCategory />,
      },
      {
        title: "Third Sub Category",
        link: "third-sub-category-list",
        role: "admin",
        icon: <BiCategory />,
      },
      {
        title: "Language",
        link: "language-list",
        role: "admin",
        icon: <IoLanguage />,
      },
      {
        title: "Country",
        link: "country-list",
        role: "admin",
        icon: <BiLandscape />,
      },
      {
        title: "Publisher",
        link: "publisher-list",
        role: "admin",
        icon: <MdOutlinePublishedWithChanges />,
      },
      {
        title: "Vendor",
        link: "vendor-list",
        role: "admin",
        icon: <RiUserStarLine />,
      },
      {
        title: "User List",
        link: "user-list",
        role: "admin",
        icon: <AiOutlineUserAdd />,
      },
      {
        title: "Membership Plan",
        link: "membership-plan-list",
        role: "admin",
        icon: <MdCardMembership />,
      },
    ],
  },
];
