import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import avatar from "../../../../src/assets/images/profile-picture.png";
import { BiLogOut, BiUser } from "react-icons/bi";
import { RiSettings2Fill } from "react-icons/ri";
const Header = () => {
  return (
    <>
      <div className="py-2 shadow-lg d-flex justify-content-end  px-3">
        <div className="ms-auto d-flex">
          <div>
            <p className="p-0 m-0 " style={{ fontSize:"14px"}}>
              <strong>Johan Doe</strong>
            </p>
            <p className="text-muted p-0 m-0" style={{ fontSize:"14px"}}>Admin</p>
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
              <Dropdown.Item href="#/action-1">
                <BiUser /> Profile
              </Dropdown.Item>
              <Dropdown.Item href="#/action-2">
                <RiSettings2Fill /> Setting
              </Dropdown.Item>
              <Dropdown.Item href="#/action-3">
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
