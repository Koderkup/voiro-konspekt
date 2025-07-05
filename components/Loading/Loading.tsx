import s from "./styles/Loading.module.css";

const Loading = () => {
  return (
    <div
      className={`position-fixed w-100 h-100 text-center ${s.loading}`}
      style={{
        top: 0,
        left: 0,
        zIndex: 9,
      }}
    >
      <svg width="205" height="250" viewBox="0 0 40 50">
        <polygon
          strokeWidth="1"
          stroke="#47A4C8"
          fill="none"
          points="20,1 40,40 1,40"
        ></polygon>
        <text fill="#47A4C8" x="10" y="47">
          ВОИРО
        </text>
      </svg>
    </div>
  );
};

export default Loading;
