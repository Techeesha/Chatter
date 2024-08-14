import { NavLink } from "react-router-dom";

// styles
import "./Sidebar.css";

// hooks
import { useLogout } from "../hooks/useLogout";

// components
import Searchbar from "./Searchbar";
import NavbarOption from "./NavbarOption";

interface OverviewItem {
  icon: string;
  name: string;
  to: string;
}

interface PersonalItem {
  icon: string;
  name: string;
  to: string;
}

const overviews: OverviewItem[] = [
  { icon: "circle-f", name: "Feed", to: "/posts" },
  { icon: "bookmark", name: "Bookmarks", to: "/bookmarks" },
  { icon: "users", name: "Team blogs", to: "/b" },
  { icon: "envelope", name: "Drafts", to: "/d" },
  { icon: "chart-histogram", name: "Analytics", to: "posts/analytics" },
];

const tags: string[] = [
  "Programming",
  "Data science",
  "Technology",
  "Machine learning",
  "Politics",
];

const personal: PersonalItem[] = [
  { icon: "user", name: "Account", to: "/settings" },
  { icon: "bell", name: "Notification", to: "/bookmarks" },
];

interface SidebarProps {
  screenWidth: number;
  mobileMenu: boolean;
  setMobileMenu: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Sidebar({
  screenWidth,
  mobileMenu,
  setMobileMenu,
}: SidebarProps): JSX.Element {
  const { logout, isPending, error } = useLogout();

  return (
    <>
      {(mobileMenu || screenWidth > 550) && (
        <div className="sidebar">
          <div className="container">
            <div className="logo">
              <i className="fi fi-sr-comment-quote"></i>
              <span>Chatter</span>
            </div>

            <Searchbar setMobileMenu={setMobileMenu} />

            <ul>
              <h4>Overview</h4>
              {overviews.map((item: OverviewItem) => (
                <li key={item.name}>
                  <NavLink onClick={() => setMobileMenu(false)} to={item.to}>
                    <i className={`fi fi-rr-${item.icon}`}></i>
                    <span>{item.name}</span>
                  </NavLink>
                </li>
              ))}
            </ul>

            <ul>
              <h4>
                Tranding Tags <i className="fi fi-rr-arrow-trend-up"></i>
              </h4>
              {tags.map((item: string) => (
                <li className="tag-list" key={item}>
                  {item}
                </li>
              ))}
            </ul>

            <ul>
              <h4>Personal</h4>
              {personal.map((item: PersonalItem) => (
                <li key={item.name}>
                  <NavLink onClick={() => setMobileMenu(false)} to={item.to}>
                    <i className={`fi fi-rr-${item.icon}`}></i>
                    <span>{item.name}</span>
                  </NavLink>
                </li>
              ))}
            </ul>

            {error && <div className="error">{error}</div>}
            {!isPending && (
              <button className="btn" onClick={logout}>
                Logout
              </button>
            )}
            {isPending && (
              <button className="btn" disabled>
                Logging out...
              </button>
            )}

            {screenWidth < 404 && <NavbarOption />}
          </div>
        </div>
      )}
    </>
  );
}
