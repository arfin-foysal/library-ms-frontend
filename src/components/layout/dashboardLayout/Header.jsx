import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import avatar from "../../../../src/assets/images/profile-picture.png";
import { BiLogOut, BiUser } from "react-icons/bi";
import { RiSettings2Fill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../features/authSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const Header = () => {


  const authUser = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const handelLogout = () => {
    dispatch(logout());
    navigate("/dashboard-login");
    toast.success("Logout Successfully");
    window.location.reload(false);
  };

  return (
    <>
      <div className="py-2 shadow-lg d-flex justify-content-end  px-3">
        <div className="ms-auto d-flex">
          <div>
            <p className="p-0 m-0 " style={{ fontSize: "14px" }}>
              <strong className="text-capitalize">{ authUser?.name}</strong>
            </p>
            <p className="text-muted p-0 m-0 text-capitalize" style={{ fontSize: "12px" }}>
              {authUser?.user_role}
            </p>
          </div>

          <Dropdown>
            <Dropdown.Toggle
              variant="white"
              className=" border-0"
              id="dropdown-basic"
            >
              <img
                src={avatar}
                alt=""
                width={25}
                align="end"
                title=""
                id="dropdown-menu-align-start"
              />
            </Dropdown.Toggle>
            <Dropdown.Menu style={{ marginLeft: "-90px" }}>
              {/* <Dropdown.Item >
                <BiUser /> Profile
              </Dropdown.Item> */}
              {/* <Dropdown.Item >
                <RiSettings2Fill /> Setting
              </Dropdown.Item> */}
              <Dropdown.Item onClick={() => handelLogout()}>
                <BiLogOut /> Logout
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
    </>
  );
};

export default Header;
