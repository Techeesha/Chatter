import React from "react";
import { NavLink, Link } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import Avatar from "./Avatar";
import NavbarOption from "./NavbarOption";
import "./Navbar.css";

// props type
import { AvatarProps } from "../types/Types";

interface NavbarProps {
  screenWidth: number;
  mobileMenu: boolean;
  setMobileMenu: (value: boolean) => void;
}

export default function Navbar({
  screenWidth,
  mobileMenu,
  setMobileMenu,
}: NavbarProps) {
  const { user } = useAuthContext();

  return (
    <nav className="navbar">
      {!mobileMenu && screenWidth < 549 && (
        <button className="burger" onClick={() => setMobileMenu(true)}>
          <i className="fi fi-rr-bars-sort"></i>
        </button>
      )}
      <div className="logo">
        <i className="fi fi-sr-house-chimney"></i>
        <span>Home</span>
      </div>
      <ul>
        <li>
          <NavLink to="/">Feeds</NavLink>
        </li>
        <li>
          <NavLink to="/explore">Explore</NavLink>
        </li>
      </ul>
      <div className="more">
        {screenWidth > 404 && <NavbarOption />}
        <Link to="/profile" className="user">
          <span>{user?.displayName}</span>
          <Avatar src={user?.photoURL} />
        </Link>
      </div>
    </nav>
  );
}
