import { useParams } from "react-router-dom";

export default function VideoPage() {
  const { vidId } = useParams();

  return (
    <>
      <div>
        <iframe
          width="1200"
          height="600"
          src={`https://www.youtube.com/embed/${vidId}?autoplay`}
          title="YouTube video"
          allow="autoplay; encrypted-media"
        />
      </div>
    </>
  );
}
