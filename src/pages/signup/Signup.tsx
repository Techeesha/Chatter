import React, { useState } from "react";
import { Link } from "react-router-dom";
import Select from "react-select";

import { UserCategoryProps } from "../../types/Types";

// styles
import "./Signup.css";

// hooks & components
import { useGoogle } from "../../hooks/useGoogle";
import { useSignup } from "../../hooks/useSignup";

// components
import GoogleButton from "../../components/GoogleButton";

const userCategories: UserCategoryProps[] = [
  { value: "writer", label: "Writer" },
  { value: "reader", label: "Reader" },
];

export default function Signup() {
  // states
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState<string>("");
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [userCategory, setUserCategory] = useState<string>("");

  const [thumbnailError, setThumbnailError] = useState<string | null>(null);
  const [textType, setTextType] = useState<boolean>(false);

  // functions
  const { signup, isPending, error } = useSignup();
  const {
    googleSignUp,
    error: signupError,
    isPending: signupPending,
  } = useGoogle();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    signup(firstName, lastName, email, password, thumbnail, userCategory);
  };

  const handleInputType = (e: React.MouseEvent<HTMLButtonElement>) => {
    setTextType(!textType);
    const inputElement = e.currentTarget
      .previousElementSibling as HTMLInputElement;
    inputElement.type = textType ? "password" : "text";
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setThumbnail(null);
    const selected = e.target.files?.[0];

    if (!selected) {
      setThumbnailError("Please select a file");
      return;
    }
    if (!selected.type.includes("image")) {
      setThumbnailError("Selected file must be an image");
      return;
    }
    if (selected.size > 1000000) {
      setThumbnailError("Image file size must be less than 1MB");
      return;
    }

    setThumbnailError(null);
    setThumbnail(selected);
    console.log("thumbnail updated");
  };

  const handleUserCategoryChange = (option: any) => {
    setUserCategory((option as UserCategoryProps).value);
  };

  return (
    <form onSubmit={handleSubmit} className="auth-form sign-form">
      <div className="auth-img-div">
        <div className="text">
          <h1>Chatter</h1>
          <p>
            Unleash the Power of Words, Connect with Like-minded Readers and
            Writers
          </p>
        </div>
        <img src="./img/bg.png" alt="intro" className="auth-img" />
      </div>

      <div className="auth-content">
        <div className="link">
          <Link className="active" to="/signup">
            Register
          </Link>
          <Link to="/login">Login</Link>
        </div>

        <h3>Register as a Writer/Reader</h3>

        <div className="inputs-wrapper">
          <div className="input-div">
            <label htmlFor="first-name">
              <i className="fi fi-rr-id-card-clip-alt"></i>
            </label>
            <input
              id="first-name"
              required
              type="text"
              onChange={(e) => setFirstName(e.target.value)}
              value={firstName}
              placeholder="First name"
            />
          </div>

          <div className="input-div">
            <label htmlFor="last-name">
              <i className="fi fi-rr-user"></i>
            </label>
            <input
              id="last-name"
              required
              type="text"
              onChange={(e) => setLastName(e.target.value)}
              value={lastName}
              placeholder="Last name"
            />
          </div>

          <div className="input-div">
            <label className="join">You are joining as?</label>
            <Select
              options={userCategories}
              onChange={handleUserCategoryChange}
              // @ts-ignore
              value={userCategories.find(
                (option) => option.value === userCategory
              )}
            />
          </div>

          <div className="input-div">
            <label htmlFor="email">
              <i className="fi fi-rr-envelope"></i>
            </label>
            <input
              id="email"
              required
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              placeholder="Email Address"
            />
          </div>

          <div className="input-div">
            <label htmlFor="password">
              <i className="fi fi-rr-lock"></i>
            </label>
            <input
              id="password"
              required
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              placeholder="Password"
            />
            <i
              onClick={handleInputType}
              className={textType ? "fi fi-rr-eye-crossed" : "fi fi-rr-eye"}
            ></i>
          </div>

          <div className="input-div">
            <label htmlFor="file">
              <i className="fi fi-rr-picture"></i>
            </label>
            <input id="file" required type="file" onChange={handleFileChange} />
            {thumbnailError && <div className="error">{thumbnailError}</div>}
          </div>
        </div>

        {!isPending && <button className="btn">Sign up</button>}
        {isPending && (
          <button className="btn" disabled>
            Signing Up...
          </button>
        )}

        <GoogleButton
          handleSign={googleSignUp}
          error={signupError}
          isPending={signupPending}
          text="Sign up with Google"
        />

        {error && <div className="error">{error}</div>}
      </div>
    </form>
  );
}
