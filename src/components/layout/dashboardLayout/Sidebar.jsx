import React from "react";
import {NavLink } from "react-router-dom";

function Sidebar({ item }) {
  let activeStyle = {
    backgroundColor: "#4e73df",
    color: "white",
    borderRadius: "0px 50px 50px 0px",
  };

  if (item.children) {
    return (
      <li className="nav-item">
        <NavLink
          className="nav-link collapsed nav-hover"
          to="#"
          data-toggle="collapse"
          data-target={`#${item.UID}`}
          aria-expanded="true"
          aria-controls="collapseTwo"
        >
          {item.icon}
          <span className="font-style ms-1">{item.title}</span>
          
        </NavLink>
        <div
          id={item.UID}
          className="collapse"
          aria-labelledby="headingTwo"
          data-parent="#accordionSidebar"
        >
          <div className=" bg-primary sub-manu-bg py-2 collapse-inner rounded">
            {item.children.map((c, i) => (
              <NavLink
                key={i}
                className="sub-manu-style"
                to={`${c.link}`}
                style={({ isActive }) => (isActive ? activeStyle : undefined)}
              >
                <span className="me-2">{c.icon}</span>

                {c.title}
              </NavLink>
            ))}
          </div>
        </div>
      </li>
    );
  } else {
    return (
      <li className="nav-item">
        <NavLink className="nav-link nav-hover" to={item.link}>
          {item.icon}
          <span className="font-style">{item.title}</span>
        </NavLink>
      </li>
    );
  }
}

export default Sidebar;
