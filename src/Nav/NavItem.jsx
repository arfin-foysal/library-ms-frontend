
import { FaHome } from 'react-icons/fa';
import { AiOutlineUser } from 'react-icons/ai';
import { RiUserSettingsLine } from 'react-icons/ri';
import { RiUserReceived2Line } from 'react-icons/ri';

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
