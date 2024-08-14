import { Link } from "react-router-dom";
import Analytic from "../../img/analytics.svg";
import Social from "../../img/social.svg";
import Content from "../../img/content.svg";

// styles
import "./Landing.css";

// components
import Card from "./components/Card";

// hooks
import { useAuthContext } from "../../hooks/useAuthContext";
import { useLogout } from "../../hooks/useLogout";

const cardContents = [
  {
    image: Analytic,
    title: "Analytics",
    body: "Analytics to track the number of views, likes and comment and also analyze the performance of your articles over a period of time",
  },
  {
    image: Social,
    title: "Social interactions",
    body: "Users on the platform can interact with posts they like, comment and engage in discussions",
  },
  {
    image: Content,
    title: "Content creation",
    body: "Write nice and appealing with our in-built markdown, a rich text editor",
  },
];
export default function Landing() {
  const { user } = useAuthContext();
  const { logout, isPending, error } = useLogout();

  return (
    <div className="landing">
      <nav>
        <div className="logo">
          <i className="fi fi-sr-comment-quote"></i>
          <span>Chatter</span>
        </div>
        <ul>
          <li>
            <Link to="#">Home</Link>
          </li>
          <li>
            <Link to="#">About us</Link>
          </li>
          <li>
            <Link to="#">Contact</Link>
          </li>
          <li>
            <Link to="/posts">Blogs</Link>
          </li>
        </ul>
        {!user && (
          <div className="btns">
            <Link className="btn btn-login" to="/login">
              Log in
            </Link>
            <Link className="btn" to="/signup">
              Sign up
            </Link>
          </div>
        )}
        {user && (
          <div className="btns">
            {isPending ? (
              <button className="btn" disabled>
                Logging out...
              </button>
            ) : (
              <button className="btn" onClick={logout}>
                Logout
              </button>
            )}
          </div>
        )}
      </nav>

      <section id="hero">
        <div>
          <img src="./img/hero.png" alt="welcome message" />
          <h1>Welcome to Chatter: Where ideas flow and connections grow</h1>
          <p>
            Find your tribe: Connect with fellow writers and readers who share your passion
          </p>
          <button className="btn">Get started</button>
        </div>
      </section>

      <section id="about">
        <div className="">
          <h2>About Chatter</h2>
          <p>
            Chatter is a dynamic online ecosystem where authors and readers converge, accessing and sharing their own content in a rich tapestry of ideas. Our mission is to create a haven for book lovers and a hub for text based content, celebrating the diversity of human experience. We envision a vibrant community that embraces open mindedness, respect, and inclusivity, transcending bacgrounds and beliefs. By fostering meaninful dialogue and understanding, we aim to empower individuals, spark, creativity, and inspired growth.{" "}
          </p>
        </div>
        <img src="./img/about.png" alt="about illustration" />
      </section>

      <section id="join">
        <h2>Why you should join chatter</h2>
        <p>
          Our goal is to make writers and readers see our platform as their next
          heaven for blogging, ensuring ease in interactions, connecting with
          like-minded peers, have access to favorite content based on interests
          and able to communicate your great ideas with people
        </p>
        <ul className="cards">
          {cardContents.map((c) => (
            <Card key={c.title} title={c.title} body={c.body} image={c.image} />
          ))}
        </ul>
      </section>

      <section id="review">
        <div className="container">
          <img src="./img/review.png" alt="review preview" />
          <div className="content">
            <p>
              "Chatter has revolutionized my online experience, becoming an indispensable haven for intellectual exploration and connection. As a devoted user of this exceptional blogging platform, i've uncovered a thriving community of like minded individuals who are fervent about sharing their insights and engaging in meaningful dialogues.”
            </p>
            <h4>Aisha Usman</h4>
            <span>Software developer at Yandytech</span>
            <Link to="/signup" className="btn">
              Join chatter
            </Link>
          </div>
        </div>
      </section>

      <section id="connect">
        <div className="images">
          <img src="./img/user-1.png" alt="user" />
          <img src="./img/user-2.png" alt="user" />
          <img src="./img/user-3.png" alt="user" />
        </div>
        <div className="">
          <h2>Write,Read and Connect With Great Minds on Chatter</h2>
          <p>
            Unlock the power of shared knowledge and connention! Share your groundbreaking ideas with a community of like minded individuals and discover writer ups that reasonate with your passions.{" "}
          </p>
          <Link to="/posts" className="btn">
            Get started
          </Link>
        </div>
      </section>

      <footer>
        <div className="logo">
          <i className="fi fi-sr-comment-quote"></i>
          <span>Chatter</span>
        </div>

        <ul className="explore">
          <h5>Explore</h5>
          <li>community</li>
          <li>Trending blogs</li>
          <li>Chatter for teams</li>
        </ul>

        <ul className="support">
          <h5>Support </h5>
          <li>Support docs</li>
          <li>Join slack</li>
          <li>Contact</li>
        </ul>

        <ul className="blog">
          <h5>Official blog</h5>
          <li>Community blog</li>
          <li>Engineering blog</li>
        </ul>
      </footer>
    </div>
  );
}
