import "./Avatar.css";

function Avatar({ src }: any) {
  return (
    <div className="avatar">
      <img src={src} alt="user avatar" />
    </div>
  );
}

export default Avatar;
