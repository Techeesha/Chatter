import { useParams, useNavigate } from "react-router-dom";
import { useDocument } from "../../hooks/useDocument";
import PostDetails from "./PostDetails";
import PostComment from "./PostComment";

const Post: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: any }>();
  const { error, document } = useDocument("posts", id);

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!document) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <>
      <button className="navigation" onClick={() => navigate("-1")}>
        <i className="fi fi-rr-arrow-left"></i>
        <span>Posts</span>
      </button>

      <div className="post-details">
        <PostDetails post={document} />
        <PostComment post={document} />
      </div>
    </>
  );
};

export default Post;
