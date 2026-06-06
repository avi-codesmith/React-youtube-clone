import { useDispatch, useSelector } from "react-redux";
import Categories from "../../components/categories/categories";
import { useEffect, useState } from "react";
import { getVidByCategory } from "../../store/vidByCategorySlice";
import "./homepage.css";
import { Link } from "react-router-dom";

export default function Homepage() {
  const dispatch = useDispatch();
  const { videoData } = useSelector((state) => state.getVidByCategory);
  const { type } = useSelector((state) => state.typeOfVid);

  console.log(type);

  const getTimeAgo = (publishTime) => {
    const diff = new Date() - new Date(publishTime);

    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const months = Math.floor(days / 30);
    const years = Math.floor(days / 365);

    if (years > 0) return `${years} year${years > 1 ? "s" : ""} ago`;
    if (months > 0) return `${months} month${months > 1 ? "s" : ""} ago`;
    if (days > 0) return `${days} day${days > 1 ? "s" : ""} ago`;
    if (hours > 0) return `${hours} hour${hours > 1 ? "s" : ""} ago`;

    return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
  };

  const videos = videoData?.items?.map((videoInfo) => (
    <li className="video-card" key={videoInfo.id.videoId}>
      <Link to={`video/${videoInfo.id.videoId}`}>
        <img
          className="video-thumbnail"
          alt={videoInfo.snippet.title}
          src={videoInfo.snippet.thumbnails.high.url}
        />

        <div className="video-info">
          <div className="channel-avatar">
            {videoInfo.snippet.channelTitle.charAt(0)}
          </div>

          <div className="video-details">
            <h1>{videoInfo.snippet.title}</h1>

            <h2>{videoInfo.snippet.channelTitle}</h2>

            <p>{getTimeAgo(videoInfo.snippet.publishTime)}</p>
          </div>
        </div>
      </Link>
    </li>
  ));

  useEffect(() => {
    dispatch(getVidByCategory(type));
  }, [type]);

  return (
    <>
      <div>
        <Categories />
        <ul className="videos-wrapper">{videos}</ul>
      </div>
    </>
  );
}
