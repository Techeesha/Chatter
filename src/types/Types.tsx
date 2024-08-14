export interface Post {
  id: string;
  author: {
    firstName: string;
    lastName: string;
    photoURL: string;
    id: string;
    headline: string;
  };
  createdAt: any;
  content: string;
  imageURL: string;
  comments: [];
  likes: [];
  share: string;
  views: [];
  bookmarks: [];
  expands: number;
  title: string;
  tags: [];
}

export interface AvatarProps {
  src: string | null;
}

export interface BookmarkIconProps {
  post: Post;
}

export interface BookmarkedItem {
  userId: string;
}

export interface BookmarkToAdd {
  userId?: string;
  id: number;
  postId: string;
}

export interface BookmarkProps {
  userId?: string;
  postId: string;
  author: {
    firstName: string;
    lastName: string;
    photoURL: string;
    id: string;
    headline: string;
  };
  title: string;
  content: string;
  imageURL: string;
  comments: [];
  likes: [];
  share: string;
  views: [];
  bookmarks: [];
}

export interface UserCategoryProps {
  value: string;
  label: string;
}
