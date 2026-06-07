import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function Videos({ currentVidId }) {
  const { videoData, loading, error } = useSelector(
    (state) => state.getVidByCategory,
  );

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

  const videos =
    videoData?.items?.length > 0 &&
    !error &&
    loading == false &&
    videoData?.items
      ?.filter((videoInfo) => videoInfo.id.videoId !== currentVidId)
      ?.map((videoInfo) => (
        <li className="video-card" key={videoInfo.id.videoId}>
          <Link to={`/video/${videoInfo.id.videoId}`}>
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

  return videos;
}
