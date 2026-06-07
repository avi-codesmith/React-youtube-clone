import { useParams } from "react-router-dom";
import Videos from "../../components/videos/Videos";
import "./videopage.css";

export default function VideoPage() {
  const { vidId } = useParams();
  return (
    <div className="video-page">
      <div className="running-video">
        <iframe
          src={`https://www.youtube.com/embed/${vidId}?autoplay=1`}
          title="YouTube video"
          allow="autoplay; encrypted-media"
        />
      </div>
      <ul className="related-videos">
        <Videos currentVidId={vidId} />
      </ul>
    </div>
  );
}
