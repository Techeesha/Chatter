import { useLocation } from "react-router-dom";
import { useEffect } from "react";

// styles
import "./Search.css";

// hooks and components
import { useCollection } from "../../hooks/useCollection";
import PostList from "../../components/PostList";

export default function Search() {
  const queryString = useLocation().search;
  const queryParams = new URLSearchParams(queryString);
  const query = queryParams.get("q");

  const { documents } = useCollection("posts");

  const posts =
    documents &&
    documents.filter(
      (doc) =>
        (doc.content &&
          doc.content.toLowerCase().includes(query?.toLocaleLowerCase())) ||
        doc.author?.firstName
          .toLowerCase()
          .includes(query?.toLocaleLowerCase()) ||
        doc.author?.lastName.includes(query?.toLocaleLowerCase()) ||
        doc.author?.headline
          .toLowerCase()
          .includes(query?.toLocaleLowerCase()) ||
        doc.title?.toLocaleLowerCase().includes(query?.toLocaleLowerCase()) ||
        query?.toLocaleLowerCase().includes(doc?.tags)
    );

  return (
    <>
      {posts && (
        <div className="search">
          <h2 className="navigation">
            Posts including "{query}" ({posts.length})
          </h2>
          <PostList posts={posts} msg="" />
        </div>
      )}
    </>
  );
}
