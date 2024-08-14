import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// styles
import "./Searchbar.css";

interface SearchbarProps {
  setMobileMenu: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Searchbar({ setMobileMenu }: SearchbarProps) {
  const [term, setTerm] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    navigate(`/search?q=${term}`);

    setTerm("");
    setMobileMenu(false);
  };

  return (
    <div className="searchbar">
      <form className="seachbar-input-div" onSubmit={handleSubmit}>
        <i className="fi fi-rr-search"></i>

        <input
          type="text"
          onChange={(e) => setTerm(e.target.value)}
          value={term}
          required
          placeholder="Explore chatter..."
        />
      </form>
    </div>
  );
}
