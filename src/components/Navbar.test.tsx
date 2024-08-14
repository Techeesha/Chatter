import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Navbar from "./Navbar";

describe("Navbar", () => {
  const screenWidth = 600;
  const setMobileMenuMock = jest.fn();

  test("renders the navbar with correct menu items", () => {
    render(
      <BrowserRouter>
        <Navbar
          screenWidth={screenWidth}
          mobileMenu={false}
          setMobileMenu={setMobileMenuMock}
        />
      </BrowserRouter>
    );

    // Test for the presence of the logo element
    const logoElement = screen.getByText("Home");
    expect(logoElement).toBeInTheDocument();

    // Test for the presence of menu items
    const feedLinkElement = screen.getByRole("link", { name: /feeds/i });
    expect(feedLinkElement).toBeInTheDocument();

    const exploreLinkElement = screen.getByRole("link", { name: /explore/i });
    expect(exploreLinkElement).toBeInTheDocument();

    // Test for the presence of the user profile link
    const profileLinkElement = screen.getByRole("link", { name: /john/i });
    expect(profileLinkElement).toBeInTheDocument();

    // Test for the presence of the user avatar
    const avatarElement = screen.getByRole("img", { name: /john/i });
    expect(avatarElement).toBeInTheDocument();
    expect(avatarElement).toHaveAttribute("src", "avatar.jpg");
  });

  // Add more test cases to cover other functionalities and user interactions within the Navbar component
});
