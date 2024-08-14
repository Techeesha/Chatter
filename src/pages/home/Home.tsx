import React from "react";
import { Link } from "react-router-dom";

// styles
import "./Home.css";

// hooks
import { useAuthContext } from "../../hooks/useAuthContext";
import { useCollection } from "../../hooks/useCollection";
import { useFirestore } from "../../hooks/useFirestore";
import { useDocument } from "../../hooks/useDocument";

// components
import PostList from "../../components/PostList";
import Interest from "../../components/Interest";
import Aside from "../../components/Aside";

type swProrps = {
  sw: number;
};

export default function Home({ sw }: swProrps) {
  const { user } = useAuthContext();
  const { documents, error, isPending } = useCollection("posts");
  const { documents: users, error: userError } = useCollection("users");

  const userList = users && users.filter((u) => u.id === user?.uid);

  if (error) return <div className="error">{error}</div>;

  if (documents?.length === 0)
    return <div className="error">Failed to load posts...</div>;

  if (isPending) return <div className="loading">Loading...</div>;

  return (
    <div className="home">
      {userList !== null && userList[0]?.interests.length === 0 && <Interest />}
      {documents && (
        <React.Fragment>
          <div className="main-content">
            <div className="create">
              <div>
                <h1>Feed</h1>
                <p>Explore different content you’d love </p>
              </div>
              <Link className="btn" to="/create-post">
                <i className="fi fi-rr-pencil"></i>
                <span>
                  Post <span className="post-msg">a content</span>
                </span>
              </Link>
            </div>
            <ul className="home-list">
              <li>
                <button>For you</button>
              </li>
              <li>
                <button>Featured</button>
              </li>
              <li>
                <button>Recent</button>
              </li>
            </ul>
            <PostList posts={documents} msg="No posts yet!" />
          </div>
          {sw > 1050 && <Aside />}
        </React.Fragment>
      )}
    </div>
  );
}
