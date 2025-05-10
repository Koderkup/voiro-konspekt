import s from "./styles/Loading.module.scss";

const Loading = () => {
  return (
    <div
      className={`position-fixed w-100 h-100 text-center ${s.loading}`}
      style={{
        background: "#0008",
        color: "white",
        top: 0,
        left: 0,
        zIndex: 9,
      }}
    >
      <svg width="205" height="250" viewBox="0 0 40 50">
        <polygon
          strokeWidth="1"
          stroke="#fff"
          fill="none"
          points="20,1 40,40 1,40"
        ></polygon>
        <text fill="#fff" x="3" y="47">
          ВОИРО
        </text>
      </svg>
    </div>
  );
};

export default Loading;
