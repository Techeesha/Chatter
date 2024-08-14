import React from "react";
import { render, screen } from "@testing-library/react";
import Avatar from "./Avatar";

describe("Avatar", () => {
  test("renders the avatar image with the provided source", () => {
    const imageUrl = "https://example.com/avatar.jpg";
    render(<Avatar src={imageUrl} />);

    const avatarImage = screen.getByAltText("user avatar") as HTMLImageElement;
    expect(avatarImage.src).toBe(imageUrl);
  });
});

// In the above test, we have one test case:

// The first test case checks if the avatar image is rendered with the correct src prop.
