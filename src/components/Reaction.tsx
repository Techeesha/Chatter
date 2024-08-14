import { timestamp } from "../firebase/config";
import { Link } from "react-router-dom";

// styles
import "./Reaction.css";

// hooks
import { useTheme } from "../hooks/useTheme";
import { useAuthContext } from "../hooks/useAuthContext";
import { useFirestore } from "../hooks/useFirestore";

interface ReactionProps {
  post: {
    id: string;
    views: [];
    likes: {
      uid: string;
      displayName: string;
      photoURL: string;
      createdAt: {
        toDate(): Date;
      };
      id: number;
    }[];
    comments: any[];
  };
}

export default function Reaction({ post }: ReactionProps) {
  const { updateDocument, response } = useFirestore("posts");
  const { user } = useAuthContext();
  const { color }: any = useTheme();
  const localColor = localStorage.getItem("color");

  const like = post.likes.filter((like) => like.uid === user?.uid);

  const handleLike = async () => {
    const likeToAdd = {
      displayName: user?.displayName,
      photoURL: user?.photoURL,
      createdAt: timestamp.fromDate(new Date()),
      id: Math.random(),
      uid: user?.uid,
    };

    if (like.length && like[0].uid === user?.uid) {
      console.log("you already like this post");
    } else {
      await updateDocument(post.id, {
        likes: [...post.likes, likeToAdd],
      });
    }
  };

  return (
    <div className="reaction">
      <button className="reactions">
        <Link to={`/posts/${post.id}`}>
          <i className="fi fi-rr-comments"></i>
          <span className="count">{post.comments.length}</span>
        </Link>
      </button>

      <button className="reactions" onClick={handleLike}>
        {like.length && like[0].uid === user?.uid ? (
          <i className="fi fi-sr-heart"></i>
        ) : (
          <i className="fi fi-rr-heart"></i>
        )}

        <span className="count">{post.likes.length}</span>
      </button>

      <button className="reactions">
        <i className="fi fi-rr-dice-three"></i>
        <span className="count">{post.views.length}</span>
        <span className="r-span">views</span>
      </button>
    </div>
  );
}
