import React, { useState } from "react";
import { useTheme } from "../hooks/useTheme";
import { useAuthContext } from "../hooks/useAuthContext";
import { useFirestore } from "../hooks/useFirestore";

import "./Interest.css";

interface Interest {
  src: string;
  value: string;
}

const interests: Interest[] = [
  { src: "./img/tech.png", value: "Technology" },
  { src: "./img/music.png", value: "Entertainment" },
  { src: "./img/sport.png", value: "Sport" },
  { src: "./img/art.png", value: "Art" },
  { src: "./img/reading.png", value: "Reading" },
];

const selectedInterests: string[] = [];

export default function Interest() {
  const { color }: any = useTheme();
  const { user }: any = useAuthContext();
  const { updateDocument, response } = useFirestore("users");

  const [isClicked, setIsClicked] = useState<{ [key: number]: boolean }>({});

  const handleClick = (interest: string, index: number) => {
    setIsClicked((state) => ({
      ...state,
      [index]: !state[index],
    }));

    if (!selectedInterests.includes(interest)) {
      selectedInterests.push(interest);
    }
  };

  const handleSubmit = async () => {
    await updateDocument(user.uid, {
      interests: selectedInterests,
    });
  };

  return (
    <div className="interest-container">
      <div className="interest">
        {response.error && <div className="error">An error occurred</div>}
        <h2>Interest</h2>
        <p>
          Posts are personalized based on your interests and search history.
          Learn how this works
        </p>
        <ul>
          {interests.map((int, index) => (
            <li
              key={int.value}
              onClick={() => handleClick(int.value, index)}
              className={isClicked[index] ? "active" : ""}
            >
              <img className="interest-img" src={int.src} alt={int.value} />
              <p>{int.value}</p>
              <i className="fi fi-sr-badge-check"></i>
            </li>
          ))}
        </ul>
        <div>
          <button className={`btn color-${color}`} onClick={handleSubmit}>
            Confirm interests
          </button>
        </div>
      </div>
    </div>
  );
}
