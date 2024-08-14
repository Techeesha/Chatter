import React, { useState, ChangeEvent, FormEvent } from "react";
import { timestamp } from "../firebase/config";
import { useAuthContext } from "../hooks/useAuthContext";
import { useFirestore } from "../hooks/useFirestore";
// import { v5 as uuid } from "uuid";

import "./Input.css";

interface InputProps {
  post: Post;
}

interface Comment {
  displayName: string;
  photoURL: string;
  content: string;
  createdAt: any;
  id: any;
}

interface Post {
  id: string;
  comments: Comment[];
}

export default function Input({ post }: InputProps) {
  const { updateDocument, response } = useFirestore("posts");
  const { user } = useAuthContext();

  const [newComment, setNewComment] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const commentToAdd: Comment = {
      displayName: user?.displayName!,
      photoURL: user?.photoURL!,
      content: newComment,
      createdAt: timestamp.fromDate(new Date()),
      id: Math.random(),
    };

    await updateDocument(post.id, {
      comments: [...post.comments, commentToAdd],
    });

    if (!response.error) {
      setNewComment("");
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewComment(e.target.value);
  };

  return (
    <form className="comment-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Leave a comment"
        required
        onChange={handleChange}
        value={newComment}
      />
    </form>
  );
}
