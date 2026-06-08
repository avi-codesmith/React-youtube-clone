import { useParams } from "react-router-dom";
import Videos from "../../components/videos/Videos";
import "./videopage.css";
import { useSelector } from "react-redux";
import { useLoaderData } from "react-router-dom";
import { useEffect, useState } from "react";

const API_KEY = import.meta.env.VITE_VID_APIKEY_BY_CATEGORY;

export default function VideoPage() {
  const [channelData, setChannelData] = useState(null);
  const [vidData, setVidData] = useState(null);

  const data = useLoaderData();
  const { vidId } = useParams();
  const { videoData } = useSelector((state) => state.getVidByCategory);

  const currVidData =
    videoData?.items?.length > 0 &&
    videoData.items.filter((video) => video.id.videoId == vidId);

  const currChannelId = currVidData?.[0]?.snippet?.channelId;

  useEffect(() => {
    const getSubs = async () => {
      try {
        if (!currChannelId) return;

        const data = await SubsCountLoader(currChannelId);

        setChannelData(data.channelData);
        console.log(data.channelData);
        return data.channelData;
      } catch (error) {
        console.error(error);
        return error;
      }
    };

    getSubs();
  }, [currChannelId]);

  useEffect(() => {
    setVidData(data.vidData);
  }, []);

  const likeCount = vidData?.items?.[0]?.statistics.likeCount;
  const viewCount = vidData?.items?.[0]?.statistics.viewCount;

  const subsCount = channelData?.items?.[0]?.statistics?.subscriberCount;

  const formattedsubsCount = new Intl.NumberFormat("en", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(subsCount);

  console.log(subsCount);

  return (
    <div className="video-page">
      <div className="running-video">
        <iframe
          src={`https://www.youtube.com/embed/${vidId}?autoplay=1`}
          title="YouTube video"
          allow="autoplay; encrypted-media"
        />
        <div className="video-data">
          <div className="video-details">
            <h1>{currVidData?.[0]?.snippet?.title}</h1>

            <h2>{currVidData?.[0]?.snippet?.description}</h2>

            <h2> &#8226; {viewCount} views</h2>
          </div>
          <div className="video-info">
            <div className="channel-avatar">
              {currVidData?.[0]?.snippet.channelTitle.charAt(0)}
            </div>

            <div className="video-details">
              <h1>{currVidData?.[0]?.snippet.channelTitle}</h1>

              <p>{formattedsubsCount} Subscribers</p>
            </div>
          </div>
        </div>
      </div>
      <ul className="related-videos">
        <Videos currentVidId={vidId} />
      </ul>
    </div>
  );
}

export const SubsCountLoader = async ({ params }, channelId) => {
  try {
    const [channelResponse, vidResponse] = await Promise.all([
      fetch(
        `https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${channelId}&key=${API_KEY}`,
        {
          method: "GET",
        },
      ),

      fetch(
        `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics,contentDetails&id=${params.vidId}&key=${API_KEY}`,
      ),
    ]);

    const [channelData, vidData] = await Promise.all([
      channelResponse.json(),
      vidResponse.json(),
    ]);

    if (!channelResponse.ok) {
      throw new Error(
        channelData.error?.message ||
          "something went wrong, can't get access to channel data",
      );
    }

    if (!vidResponse.ok) {
      throw new Error(
        vidData.error?.message ||
          "something went wrong can't get access to video data",
      );
    }

    return {
      channelData,
      vidData,
    };
  } catch (error) {
    throw error;
  }
};
