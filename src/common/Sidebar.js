import React, { useState } from "react";
import SidebarData from "./SidebarData";
import "./Sidebar.css";
import { BiChevronDown } from "react-icons/bi";

const Sidebar = ({ showForm }) => {
  const { menuData, subMenuData, subMenuData1, subMenuData2, subMenuData3, subMenuDataHome } =
    SidebarData;


  // Create a separate state for each list item
  const [toggledLists, setToggledLists] = useState({});

  const handleToggle = (menuName) => {
    setToggledLists((prevState) => ({
      ...prevState,
      [menuName]: !prevState[menuName],
    }));
  };

  


  return (
    <div className="aside_wrapper">
      <ul className="unordered_list">
        {menuData.map((list) => (
          <li className="list_item" key={list.menuName}>
            <div
              className="listHeading d-flex justify-content-between"
              onClick={() => handleToggle(list.menuName)}
            >
              {list.menuName}{" "}
              <span className="">
                <BiChevronDown />{" "}
              </span>
            </div>
            {toggledLists[list.menuName] && (
              <ul className="sub_list">
                {list.menuName === "Home"
                  ? subMenuDataHome.map((submenu) => (
                      <li className="list_item" key={submenu.subMenuName} onClick={() => showForm(submenu)} >
                        {submenu.subMenuName}{" "}
                      </li>
                     
                  ))
                  : list.menuName === "Explore"
                    ? subMenuData.map((submenu) => (
                      <li className="list_item" key={submenu.subMenuName} onClick={() => showForm(submenu)}>
                        {submenu.subMenuName}{" "}
                      </li>
                    ))
                    : list.menuName === "Build"
                      ? subMenuData1.map((submenu) => (
                        <li className="list_item" key={submenu.subMenuName} onClick={() => showForm(submenu)}>
                          {submenu.subMenuName}{" "}
                        </li>
                      ))
                      : list.menuName === "Community"
                        ? subMenuData2.map((submenu) => (
                          <li className="list_item" key={submenu.subMenuName} onClick={() => showForm(submenu)}>
                            {submenu.subMenuName}{" "}
                          </li>
                        ))
                        : subMenuData3.map((submenu) => (
                          <li className="list_item" key={submenu.subMenuName} onClick={() => showForm(submenu)}>
                            {submenu.subMenuName}{" "}
                          </li>
                        ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
