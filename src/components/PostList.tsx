import { useState } from "react";
import { Link } from "react-router-dom";
// import { v5 as uuid } from "uuid";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { Post } from "../types/Types";

// styles
import "./PostList.css";

// hooks
import { useAuthContext } from "../hooks/useAuthContext";
import { useFirestore } from "../hooks/useFirestore";
import { useReadTime } from "../hooks/useReadTime";

//components
import BookmarkIcon from "../components/BoomarkIcon";
import Reaction from "./Reaction";
import Options from "./Options";
import Confirm from "./Confirm";
import Avatar from "./Avatar";

interface PostListProps {
  posts: Post[] | null;
  msg: string;
}

interface ViewedItem {
  uid: any;
}

export default function PostList({ posts, msg }: PostListProps) {
  const { user } = useAuthContext();
  const { updateDocument } = useFirestore("posts");
  const { calculateReadingTime } = useReadTime();

  const [options, setOptions] = useState<{ [key: number]: boolean }>({});

  const handleClick = async (post: Post) => {
    await updateDocument(post.id, {
      expands: (post.expands += 1),
    });
  };

  const handleMouseEnter = async (post: Post) => {
    const viewed: ViewedItem[] =
      post.views && post.views.filter((view: any) => view.uid === user?.uid);

    const views = {
      uid: user?.uid,
      id: new Date(),
    };

    if (viewed) {
      if (viewed.length && viewed[0].uid === user?.uid) {
        //
      } else {
        await updateDocument(post.id, {
          views: [...post.views, views],
        });
      }
    }
  };

  const handleOptions = (index: number) => {
    setOptions((state) => ({
      ...state,
      [index]: !state[index],
    }));
  };

  return (
    <div className="">
      {posts?.length === 0 && <p className="msg">{msg}</p>}
      {posts?.map((post, index) => (
        <div
          className="post"
          key={post.id}
          onMouseEnter={() => handleMouseEnter(post)}
        >
          <div className="info">
            <Avatar src={post.author.photoURL} />
            <li>
              <span className="name">
                {post.author.firstName} {post.author.lastName}
              </span>
              <div className="post-date">
                <span>{post.createdAt.toDate().toDateString().slice(3)}</span>
                <span>.{post.author.headline}</span>
              </div>
            </li>
            <div className="option-wrapper">
              {options[index] && <Options post={post} />}
              {user?.uid !== post.author.id && <BookmarkIcon post={post} />}
              {user?.uid === post.author.id && (
                <button
                  className="icon-btn"
                  onClick={() => handleOptions(index)}
                >
                  <i className="fi fi-sr-menu-dots-vertical"></i>
                </button>
              )}
            </div>
          </div>
          <div onClick={() => handleClick(post)}>
            <Link to={`/posts/${post.id}`}>
              <h2>{post?.title}</h2>
              <div className="read">
                <i className="fi fi-rr-book-alt"></i>
                <span>{calculateReadingTime(post.content)}</span>
              </div>
              <p
                className="post-content"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
              {post.imageURL && (
                <img className="post-img" src={post.imageURL} alt="" />
              )}
            </Link>
          </div>
          <Reaction post={post} />
        </div>
      ))}
    </div>
  );
}
