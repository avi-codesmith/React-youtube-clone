import { useDispatch, useSelector } from "react-redux";
import Categories from "../../components/categories/categories";
import { useEffect } from "react";
import { getVidByCategory } from "../../store/vidByCategorySlice";
import "./homepage.css";
import Videos from "../../components/videos/Videos";
import VideoSkeleton from "../../components/Skeleton/VideoSkeleton";

export default function Homepage() {
  const { videoData, loading, error } = useSelector(
    (state) => state.getVidByCategory,
  );

  const dispatch = useDispatch();
  const { type } = useSelector((state) => state.typeOfVid);

  const message = (error || videoData.length <= 0) && (
    <p
      className={
        (error && "error") ||
        (videoData.length <= 0 && !error && "can-not-find")
      }
    >
      {error ||
        (!loading &&
          !error &&
          videoData.length <= 0 &&
          "Can't find anything related, Pls try something different!")}
    </p>
  );

  useEffect(() => {
    dispatch(getVidByCategory(type));
  }, [type]);

  return (
    <>
      <div>
        <Categories />
        {loading ? (
          <VideoSkeleton type="grid" />
        ) : error ? (
          <div className="message">{message}</div>
        ) : (
          <ul className="videos-wrapper">
            <Videos />
          </ul>
        )}
      </div>
    </>
  );
}
