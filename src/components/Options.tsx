import { useState } from "react";
import { Post } from "../types/Types";

// styles
import "./Options.css";

// components
import Confirm from "./Confirm";

export default function Options({ post }: any) {
  const [isConfirm, setIsConfirm] = useState(false);

  return (
    <div className="options">
      <button className="icon-btn" onClick={() => setIsConfirm(true)}>
        <i className="fi fi-rr-cross-circle"></i>
      </button>

      {isConfirm && (
        <Confirm
          title={`Post ${post.id}`}
          type="delete"
          item="post"
          setIsConfirm={setIsConfirm}
          post={post}
        />
      )}
    </div>
  );
}
