import React, { useState } from "react";
//redux
import { useDispatch } from "react-redux";
import { logoutUser } from "../../../../Redux/actions/auth";

//style
import style from "./navItems.module.css";
import { IoMdSettings, IoIosLogIn, IoIosColorPalette } from "react-icons/io";

//Components
import { Dropdown } from "../../../Dropdown/Dropdown";

export const Settings = (): JSX.Element => {
  const [dropdown, setDropdown] = useState(false);

  //redux
  const dispatch = useDispatch();

  function toggleDropdown() {
    setDropdown(true);
  }

  function closeDropdown() {
    setDropdown(false);
  }

  const settingsIcon = <IoMdSettings />;
  const themeIcon = <IoIosColorPalette />;
  const authIcon = <IoIosLogIn />;

  const dropdownItems = [
    {
      name: "Settings",
      icon: settingsIcon
    },
    {
      name: "Theme",
      icon: themeIcon
    },
    {
      name: "Logout",
      icon: authIcon,
      action: () => dispatch(logoutUser()),
      className: "dropdown__remove"
    }
  ];

  return (
    <li className="pos-relative" onClick={toggleDropdown}>
      <span className={style.navItem}>
        <IoMdSettings />
      </span>
      {dropdown && (
        <Dropdown
          closeDropdown={closeDropdown}
          dropdownItems={dropdownItems}
          left="0"
          top="105"
        />
      )}
    </li>
  );
};
