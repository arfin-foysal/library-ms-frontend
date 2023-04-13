
import { FaHome } from 'react-icons/fa';
import { AiOutlineUser } from 'react-icons/ai';
import { RiUserSettingsLine } from 'react-icons/ri';
import { RiUserReceived2Line } from 'react-icons/ri';
import { BiCategory } from 'react-icons/bi';
import { IoLanguage } from 'react-icons/io5';
import { BiLandscape } from 'react-icons/bi';
import { MdOutlinePublishedWithChanges } from 'react-icons/md';

export const navItem = [
   
  {
    title: "Admin",
    link: "admin",
    role: "admin",
    icon: <AiOutlineUser/>,
  },
  {
    // UID:"super_admin",
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
   


      
    ],
  },

























































  {
    title: "Worker",
    link: "worker",
    role: "worker",
    icon: <FaHome/>,
  },
  {
    title: "worker",
    link: "worker",
    role: "worker",
    icon: <FaHome/>,
  },
  {
    title: "maneger",
    link: "maneger",
    role: "maneger",
    icon: <FaHome />,
  },
  {
    title: "seller",
    link: "seller",
    role: "seller",
    icon: <FaHome/>,
  },
];
