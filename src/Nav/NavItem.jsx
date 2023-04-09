
import { FaHome } from 'react-icons/fa';
import { AiOutlineUser } from 'react-icons/ai';
import { FaSuperpowers } from 'react-icons/fa';
import { BsPaypal } from 'react-icons/bs';
export const navItem = [
   
  {
    title: "Admin",
    link: "admin",
    role: "admin",
    icon: <AiOutlineUser/>,
  },
  {
    // UID:"super_admin",
    title: "Super Admin",
    role: "admin",
    icon: <FaSuperpowers/>,
    
    children: [


      

      {
        title: "Payment",
        link: "payment",
        role: "admin",
        icon: <BsPaypal/>,
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
