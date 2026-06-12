import { Outlet, useSearchParams } from "react-router-dom";
import logo from "../../assets/logo.svg";
import searchlogo from "../../assets/search.svg";
import "./header.css";
import { useDispatch } from "react-redux";
import { handleType } from "../../store/typeOfVidSlice";
import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

export default function Header() {
  const dispatch = useDispatch();
  const inputRef = useRef();
  const [value, setValue] = useState();
  const [searchParams, setSearchParams] = useSearchParams();

  const search = searchParams.get("search");

  useEffect(() => {
    dispatch(handleType(search));
    console.log("doing", search);
  }, [value]);

  console.log(search);

  function handleDispatch() {
    const type = inputRef.current.value;
    setValue(type);
    dispatch(handleType(type));
  }

  function handleChange(e) {
    if (e.key === "Enter") {
      handleDispatch();
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
            type="search"
            ref={inputRef}
            placeholder="Search"
            onChange={(e) => setSearchParams({ search: e.target.value })}
            value={search}
            onKeyDown={handleChange}
          />
          <Link to="/" className="search-btn" onClick={handleDispatch}>
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
