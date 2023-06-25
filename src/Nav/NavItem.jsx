
import {  AiOutlineUserAdd } from "react-icons/ai";
import { RiUserSettingsLine, RiUserStarLine } from "react-icons/ri";
import { RiUserReceived2Line,RiFileListLine } from "react-icons/ri";
import { BiBook, BiBookBookmark, BiBookContent, BiCategory } from "react-icons/bi";
import { IoLanguage } from "react-icons/io5";
import { BiLandscape,BiBookAlt ,BiBookAdd} from "react-icons/bi";
import { GoBook } from "react-icons/go";
import { MdOutlinePublishedWithChanges, MdPayments, } from "react-icons/md";
import { AiOutlineBorderOuter } from "react-icons/ai";
import { CiViewList } from "react-icons/ci";
import { BsBasket, BsDashSquare, BsDashSquareDotted, BsFilterSquare, BsReverseLayoutTextSidebarReverse } from "react-icons/bs";



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
    title: "Item Order",
    role: "admin",
    icon: <CiViewList />,
    children: [
      {
        title: "Order List",
        link: "order-list",
        role: "admin",
        icon: <BsReverseLayoutTextSidebarReverse size={12} />,
      },
      {
        title: "Item Quantity List",
        link: "Item-qty-list",
        role: "admin",
        icon: <BsBasket size={14} />,
      },
      {
        title: "Item Received List",
        link: "item-received-list",
        role: "admin",
        icon: <BsFilterSquare size={12} />,
      },
    ],
  },
  {
    title: "Vendor Payment",
    role: "admin",
    icon: <BsDashSquare size={13} />,
    children: [
      {
        title: "Vendor Payment",
        link: "vandor-payment",
        role: "admin",
        icon: <MdPayments size={16} />,
      },
    ],
  },
  {
    title: "Book Rents",
    role: "admin",
    icon: <BiBookContent />,
    children: [
      {
        title: "Book Rents",
        link: "rent-list",
        role: "admin",
        icon: <BiBookAdd />,
      },
      {
        title: "Book Return List",
        link: "return-list",
        role: "admin",
        icon: <BiBookBookmark />,
      },
      {
        title: "Return Date Expired",
        link: "return-date-expired-list",
        role: "admin",
        icon: <BiBookBookmark />,
      },
      {
        title: "Damage Book",
        link: "book-damage-list",
        role: "admin",
        icon: <BiBook />,
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
      // {
      //   title: "Membership Plan",
      //   link: "membership-plan-list",
      //   role: "admin",
      //   icon: <MdCardMembership />,
      // },
    ],
  },
];
