import "./skeleton.css";

export default function VideoSkeleton({ type }) {
  return (
    <ul className={`vid-skeleton ${type}`}>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
    </ul>
  );
}
