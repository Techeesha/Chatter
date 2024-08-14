import React, { useState } from "react";

// styles
import "./Profile.css";

// components and hooks
import Avatar from "../../components/Avatar";
import PostList from "../../components/PostList";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useTheme } from "../../hooks/useTheme";
import { useDocument } from "../../hooks/useDocument";
import { useCollection } from "../../hooks/useCollection";
import { Post } from "../../types/Types";

interface ProfileProps {
  // Add any additional props if needed
}
interface PostListProps {
  posts: Post[];
  msg: string;
}

const Profile: React.FC<ProfileProps> = () => {
  const { user }: any = useAuthContext();
  const { color }: any = useTheme();
  const { error, document: currentUser } = useDocument("users", user.uid);
  const localColor = localStorage.getItem("color");

  const [isTabbed, setIsTabbed] = useState(true);

  // data
  const { documents: posts } = useCollection("posts", [
    ["author.id", "==", user.uid],
  ]);
  const { documents: bookmarks } = useCollection("bookmarks", [
    ["id", "==", user.uid],
  ]);

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <>
      {currentUser && (
        <div className="profile">
          <div className="banner">
            <Avatar src={user.photoURL} />
          </div>

          <div className="user-info">
            <h2>{currentUser.name}</h2>
            <p>Nigeria</p>

            <ul className="">
              <li>@{currentUser.displayName.toLowerCase()}</li>
              <span>.</span>
              <li>{currentUser.email}</li>
              <span>.</span>
              <li>{currentUser.headline}</li>
            </ul>

            <div className="btns">
              <button className="profile-btn">Message</button>
              <button
                className="profile-btn"
                style={
                  localColor
                    ? { backgroundColor: `#${localColor}` }
                    : { backgroundColor: `#${color}` }
                }
              >
                <i className="fi fi-rr-share-square"></i>
                <span>Share profile</span>
              </button>
            </div>
          </div>
          <div className="interests">
            <h2>Interests</h2>
            <ul>
              {currentUser.interests.map((i: string) => (
                <li key={i}>#{i}</li>
              ))}
            </ul>
          </div>
          <ul className="tabs">
            <li
              className={isTabbed ? "active-tab" : ""}
              onClick={() => setIsTabbed(true)}
            >
              Posts
            </li>
            <li
              className={!isTabbed ? "active-tab" : ""}
              onClick={() => setIsTabbed(false)}
            >
              Bookmarks
            </li>
          </ul>
          {isTabbed ? (
            posts && (
              <PostList
                posts={posts}
                msg="Posts you've made will appear here"
              />
            )
          ) : (
            <PostList posts={bookmarks} msg="No posts in your bookmarks" />
          )}
        </div>
      )}
    </>
  );
};

export default Profile;
