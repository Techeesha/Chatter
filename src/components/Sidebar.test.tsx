import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Sidebar from "./Sidebar";

describe("Sidebar", () => {
  const screenWidth = 600;
  const setMobileMenuMock = jest.fn();
  const overviews = [
    { icon: "circle-f", name: "Feed", to: "/posts" },
    { icon: "bookmark", name: "Bookmarks", to: "/bookmarks" },
    { icon: "users", name: "Team blogs", to: "/b" },
    { icon: "envelope", name: "Drafts", to: "/d" },
    { icon: "chart-histogram", name: "Analytics", to: "posts/analytics" },
  ];
  const tags = [
    "Programming",
    "Data science",
    "Technology",
    "Machine learning",
    "Politics",
  ];
  const personal = [
    { icon: "user", name: "Account", to: "/settings" },
    { icon: "bell", name: "Notification", to: "/bookmarks" },
  ];

  test("renders the sidebar with correct menu items", () => {
    render(
      <BrowserRouter>
        <Sidebar
          screenWidth={screenWidth}
          mobileMenu={true}
          setMobileMenu={setMobileMenuMock}
        />
      </BrowserRouter>
    );

    // Test for the presence of the logo element
    const logoElement = screen.getByText("Chatter");
    expect(logoElement).toBeInTheDocument();

    // Test for the presence of overview menu items
    const overviewElements = screen.getAllByRole("link", { name: /overview/i });
    expect(overviewElements).toHaveLength(overviews.length);

    // Test for the presence of trending tags
    const tagElements = screen.getAllByRole("listitem", { name: /tag/i });
    expect(tagElements).toHaveLength(tags.length);

    // Test for the presence of personal menu items
    const personalElements = screen.getAllByRole("link", { name: /personal/i });
    expect(personalElements).toHaveLength(personal.length);
  });

  test("calls setMobileMenu when a NavLink is clicked", () => {
    render(
      <BrowserRouter>
        <Sidebar
          screenWidth={screenWidth}
          mobileMenu={true}
          setMobileMenu={setMobileMenuMock}
        />
      </BrowserRouter>
    );

    // Simulate a click on a NavLink
    fireEvent.click(screen.getByText("Feed"));

    // Verify that setMobileMenuMock is called
    expect(setMobileMenuMock).toHaveBeenCalledTimes(1);
    expect(setMobileMenuMock).toHaveBeenCalledWith(false);
  });

  // Add more test cases to cover other functionalities and user interactions within the Sidebar component
});
