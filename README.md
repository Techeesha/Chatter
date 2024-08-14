chatter connect with like minds. Chatter is a dynamic online ecosystem where authors and readers converge, accessing and sharing their own content in a rich tapestry of ideas. Our mission is to create a haven for book lovers and a hub for text based content, celebrating the diversity of human experience. We envision a vibrant community that embraces open mindedness, respect, and inclusivity, transcending bacgrounds and beliefs. By fostering meaninful dialogue and understanding, we aim to empower individuals, spark, creativity, and inspired growth.

This repository hosts a blog website built using React, TypeScript, and Firebase. It includes features like user authentication, post creation, bookmarking, post analytics, and more.

## Features

- **Authentication:** Users can sign up with their email and password or log in via their Google account. Custom hooks such as `useGoogle`, and `useSignup` are implemented to manage the authentication process.

- **Content Creation:** Chatter features a rebust rich text editor that allows users to effortlessly create and publish their content. whether write blog posts or other forms of content, users can enrich their work with images or videos. The content is authored and saved in Markdown format, and displayed as HTML when viewed.
  
- **Content Discovery:** Chatter provides a personalized feed tailored to each user's interests and reading history, making it easy to discover engaging new content. Users can also browse and search for others,exploring various categories and tags that capture their interest.
  
- **Social Features:** Chatter encourages users interaction and engagement features like commenting and liking. Users can share their thoughts, users can share their thoughts, participate in discussions and connect with fellow content enthusiasts.

- **Persistent User Data:** The Context API is utilized to maintain user data across the website. ensuring that users can access their information consistently across different pages.

- **Home Page:** The home page act as the main landing page for users. Showcasing a curated list of posts tailored to their interests.

- **Posts Page:** The posts page allow all users to explore all available content, providing access to a diverse collection of articles and blog posts from various authors.

- **Bookmark Page:** Users can bookmark posts they find interesting, and The bookmark page offers a convenient way  to access and revisit these saved posts.

- **Post Details Page:** When users click on a post, they are directed to the post details page, where they can read the full article and participate in comments and discussions.

- **Analytics Page:** The analytics page allows users to gain insights into their posts, offering valuable data on views, likes, shares, and overall user engagement.

## Installation

steps to follow if you want to run this project locally:

1. First Clone the repository:

   ```bash
   git clone https://github.com/Techeesha/chatter-alt-capstone.git
   ```
   
2. Navigate to the project directory:

   ```bash
   cd chatter
   ```
   
3. Install the dependencies:

   ```bash
   npm install
   ```
   
4. Set up Firebase:

 - Create a Firebase project and enable the necessary authentication providers.
 - Update the Firebase configuration in the project's `firebase/config` file.

   
5. Start the development server:

   ```bash
   npm start
   ```
   
5. Open the application in your browser:

   ``` bash
   http://localhost:3000
   ```
