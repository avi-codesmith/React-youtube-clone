import { Outlet } from "react-router-dom";
import logo from "../../assets/logo.svg";
import searchlogo from "../../assets/search.svg";
import "./header.css";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import { handleType } from "../../store/typeOfVidSlice";
import { Link } from "react-router-dom";

export default function Header() {
  const dispatch = useDispatch();
  const inputRef = useRef();

  function handleInput() {
    const search = inputRef.current.value;
    if (search) {
      dispatch(handleType(search));
    }
  }

  function handleChange(key) {
    if (key.key === "Enter") {
      handleInput();
    }
  }

  return (
    <>
      <header>
        <Link to="/" className="logo">
          <img alt="YouTube" src={logo} />
        </Link>
        <div className="search-engine">
          <input
            ref={inputRef}
            type="search"
            placeholder="Search"
            onKeyDown={handleChange}
          />
          <Link to="/" className="search-btn" onClick={handleInput}>
            <img src={searchlogo} alt="search" />
          </Link>
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
