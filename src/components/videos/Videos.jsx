import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import FormatTime from "../videoPublishTime/formatTime";
import VideoSkeleton from "../Skeleton/VideoSkeleton";

export default function Videos({ currentVidId, handleNextVid }) {
  const { videoData, loading, error } = useSelector(
    (state) => state.getVidByCategory,
  );

  const videos =
    videoData?.items?.length > 0 &&
    !error &&
    loading == false &&
    videoData?.items
      ?.filter((videoInfo) => videoInfo.id.videoId !== currentVidId)
      ?.map((videoInfo) => (
        <li className="video-card" key={videoInfo.id.videoId}>
          <Link onClick={handleNextVid} to={`/video/${videoInfo.id.videoId}`}>
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

                <p>
                  <FormatTime publishTime={videoInfo.snippet.publishTime} />
                </p>
              </div>
            </div>
          </Link>
        </li>
      ));

  return loading ? (
    <VideoSkeleton type="" />
  ) : error ? (
    "Something went wrong, Can not fetch Videos, Please try again later!"
  ) : (
    videos
  );
}
