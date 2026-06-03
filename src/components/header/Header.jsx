import { Outlet } from "react-router-dom";
import logo from "../../assets/logo.svg";
import searchlogo from "../../assets/search.svg";
import "./header.css";

export default function Header() {
  return (
    <>
      <header>
        <div className="logo">
          <img alt="YouTube" src={logo} />
        </div>
        <div className="search-engine">
          <input type="search" placeholder="Search" />
          <div className="search-btn">
            <img src={searchlogo} alt="search" />
          </div>
        </div>
        <div className="user-area">
          <button className="btn">Signin</button>
          <button className="btn fill">Sign up</button>
        </div>
      </header>
      <Outlet />
    </>
  );
}
