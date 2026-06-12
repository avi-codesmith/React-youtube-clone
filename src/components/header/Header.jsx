import { Outlet, useNavigate, useSearchParams } from "react-router-dom";
import logo from "../../assets/logo.svg";
import searchlogo from "../../assets/search.svg";
import "./header.css";
import { useDispatch } from "react-redux";
import { handleType } from "../../store/typeOfVidSlice";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [value, setValue] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const storedSearch = localStorage.getItem("searchKeyword");
    const URLSearch = searchParams.get("search");

    const searchType = URLSearch || storedSearch || "";

    dispatch(handleType(searchType));
    setValue(searchType);
  }, [dispatch, searchParams]);

  function handleDispatch() {
    if (value) {
      localStorage.setItem("searchKeyword", value);
      setSearchParams({ search: value });
      dispatch(handleType(value));

      navigate(`/?search=${value}`);
    }
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
            placeholder="Search"
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={handleChange}
            value={value}
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
