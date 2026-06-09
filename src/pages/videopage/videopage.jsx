import { useParams } from "react-router-dom";
import Videos from "../../components/videos/Videos";
import "./videopage.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

//icons
import likeLogo from "../../assets/likeLogo.svg";
import shareLogo from "../../assets/shareLogo.svg";
import copyLogo from "../../assets/copyLogo.svg";
import { getVidByCategory } from "../../store/vidByCategorySlice";
import FormatTime from "../../components/videoPublishTime/formatTime";

const API_KEY = import.meta.env.VITE_VID_APIKEY_BY_CATEGORY;

export default function VideoPage() {
  const { vidId: currVidId } = useParams();
  const dispatch = useDispatch();

  const [channelData, setChannelData] = useState([]);
  const [vidData, setVidData] = useState([]);
  const [commentData, setCommentData] = useState([]);
  const [commentError, setCommentError] = useState("");

  const [share, setShare] = useState(false);
  const [copy, setCopy] = useState("Copy");
  const [nextVid, setNextVid] = useState(false);

  const currChannelId = vidData?.items?.[0]?.snippet?.channelId;
  const currVidTitle = vidData?.items?.[0]?.snippet?.title;
  const currChannelName = vidData?.items?.[0]?.snippet.channelTitle;
  const publishTime = vidData?.items?.[0]?.snippet.publishedAt;

  useEffect(() => {
    dispatch(getVidByCategory(currChannelName));
  }, [currChannelName]);

  useEffect(() => {
    async function getData() {
      try {
        const [channelRes, vidRes, vidCommentsRes] = await Promise.all([
          fetch(
            `https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${currChannelId}&key=${API_KEY}`,
            {
              method: "GET",
            },
          ),

          fetch(
            `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics,contentDetails&id=${currVidId}&key=${API_KEY}`,
          ),

          fetch(
            `https://www.googleapis.com/youtube/v3/commentThreads?part=snippet&videoId=${currVidId}&key=${API_KEY}`,
          ),
        ]);

        const [channelData, videoData, vidCommentsData] = await Promise.all([
          channelRes.json(),
          vidRes.json(),
          vidCommentsRes.json(),
        ]);

        if (!channelRes.ok) {
          throw new Error(
            channelData.error.message || "Can not get the channel data",
          );
        }

        if (!vidRes.ok) {
          throw new Error(
            videoData.error.message || "Can not get the video data",
          );
        }

        if (!vidCommentsRes.ok) {
          const error = "Can not fetch comments, please try again!";
          setCommentError(error);
          throw new Error(videoData.error.message || "Can not get comments");
        }

        setChannelData(channelData);
        setVidData(videoData);
        setCommentData(vidCommentsData);
      } catch (error) {
        throw error.message;
      }
    }

    getData();
  }, [currChannelId, currVidId]);

  function formatter(number) {
    const formattedCount = new Intl.NumberFormat("en", {
      notation: "compact",
      maximumFractionDigits: 1,
    }).format(number || "0");

    return formattedCount;
  }

  function handleShare() {
    setShare((prev) => !prev);
  }

  function handleNextVid() {
    setNextVid((prev) => !prev);
    if (nextVid === true) {
      setShare(false);
    }
  }

  async function copyText(text) {
    try {
      await navigator.clipboard.writeText(text);
      setCopy("Copied!");
      setTimeout(() => {
        setCopy("Copy");
      }, 2000);
    } catch (error) {
      throw error;
    }
  }

  const likeCount = vidData?.items?.[0]?.statistics.likeCount;
  const viewCount = vidData?.items?.[0]?.statistics.viewCount;
  const subsCount = channelData?.items?.[0]?.statistics?.subscriberCount;

  const formattedLikeCount = formatter(likeCount);
  const formattedViewCount = formatter(viewCount);
  const formattedSubsCount = formatter(subsCount);

  const playableVid = `https://www.youtube.com/watch?v=${currVidId}`;
  // const comments = commentsData.snippet.topLevelComment.snippet;

  const comments = commentData?.items?.map((comment) => {
    const topComment = comment?.snippet?.topLevelComment?.snippet;

    return (
      <li className="comment-card" key={comment.id}>
        <div className="comment-header">
          <div className="comment-avatar">
            <img src={topComment?.authorProfileImageUrl} />
          </div>

          <div className="comment-user-info">
            <div className="comment-user-flex">
              <p className="comment-author">{topComment?.authorDisplayName}</p>
              <div className="comment-time">
                <FormatTime publishTime={topComment?.publishedAt} />
              </div>
            </div>
            <div className="comment-body">
              <p>{topComment?.textOriginal}</p>
            </div>
          </div>
        </div>

        <div className="comment-actions">
          <div className="comment-like">
            <img src={likeLogo} alt="like" />
            {formatter(topComment?.likeCount)}
          </div>

          <div className="comment-dislike">
            <img src={likeLogo} alt="like" />
            Dislike
          </div>
        </div>
      </li>
    );
  });

  return (
    <div className="video-page">
      <div className="running-video">
        <iframe
          src={`https://www.youtube.com/embed/${currVidId}?autoplay=1`}
          title="YouTube video"
          allow="autoplay; encrypted-media"
        />
        <div className="video-data">
          <div className="video-details">
            <h1>{currVidTitle}</h1>

            <h2>{vidData?.items?.[0]?.snippet?.description}</h2>
            <div className="flex">
              <h2> &#8226; {formattedViewCount} views</h2>
              <h2>
                <FormatTime publishTime={publishTime} />
              </h2>
            </div>
          </div>
          <div className="video-info">
            <div className="channel-avatar">
              {vidData?.items?.[0]?.snippet.channelTitle.charAt(0)}
            </div>

            <div className="video-details">
              <h1>{vidData?.items?.[0]?.snippet.channelTitle}</h1>
              <p>{formattedSubsCount} Subscribers</p>
            </div>

            <div className="video-options">
              <div className="preference">
                <button className="like-btn">
                  <img src={likeLogo} alt="like" />
                  {formattedLikeCount}
                </button>
                <button className="dislike-btn">
                  <img src={likeLogo} alt="Dislike" />
                  Dislike
                </button>
              </div>

              <div className="oth-options">
                <button onClick={handleShare} className="share-btn">
                  <img src={shareLogo} alt="Share" />
                  Share
                </button>
                <div
                  className={
                    share === true ? "show shareLink" : "hide shareLink"
                  }
                >
                  <p>{playableVid}</p>
                  <button
                    className="copyBtn"
                    onClick={() => copyText(playableVid)}
                  >
                    <img src={copyLogo} alt="copy" />
                    <p>{copy}</p>
                  </button>
                </div>
                <button className="sub-btn">Subscribe</button>
              </div>
            </div>
          </div>
        </div>
        <section className="comments-section">
          <h3>Comments</h3>
          {commentError || <ul className="comments-wrapper">{comments}</ul>}
        </section>
      </div>
      <ul className="related-videos">
        <Videos currentVidId={currVidId} handleNextVid={handleNextVid} />
      </ul>
    </div>
  );
}
