import React, { useState } from "react";
import { useGlobalContext } from "../Context";

const SearchForm = () => {
  const { setSearch, setFilters } = useGlobalContext();
  const [value, setValue] = useState("");
  const [orientation, setOrientation] = useState("");
  const [color, setColor] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearch(value);
    setFilters({ orientation, color });
  };

  return (
    <div style={{ textAlign: "center", marginTop: "40px" }}>
      <h2 style={{ color: "#1976d2", marginBottom: "20px" }}>
        Unsplash Image Search
      </h2>

      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "15px",
          flexWrap: "wrap",
          marginTop: "20px",
        }}
      >
        {/* Search Input */}
        <input
          type="text"
          placeholder="Search images..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
          style={{
            padding: "10px",
            border: "1px solid #ccc",
            borderRadius: "5px",
            minWidth: "200px",
          }}
        />

        {/* Orientation Select */}
        <select
          value={orientation}
          onChange={(e) => setOrientation(e.target.value)}
          style={{
            padding: "10px",
            border: "1px solid #ccc",
            borderRadius: "5px",
            minWidth: "140px",
          }}
        >
          <option value="">Any Orientation</option>
          <option value="landscape">Landscape</option>
          <option value="portrait">Portrait</option>
          <option value="squarish">Square</option>
        </select>

        {/* Color Select */}
        <select
          value={color}
          onChange={(e) => setColor(e.target.value)}
          style={{
            padding: "10px",
            border: "1px solid #ccc",
            borderRadius: "5px",
            minWidth: "140px",
          }}
        >
          <option value="">Any Color</option>
          <option value="black_and_white">Black & White</option>
          <option value="black">Black</option>
          <option value="white">White</option>
          <option value="yellow">Yellow</option>
          <option value="orange">Orange</option>
          <option value="red">Red</option>
          <option value="purple">Purple</option>
          <option value="magenta">Magenta</option>
          <option value="green">Green</option>
          <option value="teal">Teal</option>
          <option value="blue">Blue</option>
        </select>

        {/* Submit Button */}
        <button
          type="submit"
          style={{
            padding: "10px 20px",
            backgroundColor: "#1976d2",
            color: "white",
            border: "none",
            borderRadius: "5px",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchForm;