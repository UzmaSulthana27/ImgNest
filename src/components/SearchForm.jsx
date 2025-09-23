import React, { useState } from 'react';
import { useGlobalContext } from '../Context';
import { FiSearch } from "react-icons/fi";

const SearchForm = () => {
  const { setSearch } = useGlobalContext();
  const [value, setValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (value.trim() !== "") {
      setSearch(value);
      setValue("");
    }
  }

  return (
    <div
      id='search'
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        margin: "20px 0",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1 style={{ color: "#1976d2", marginBottom: "15px" }}>Search Images</h1>
      <form 
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          width: "90%",
          maxWidth: "500px",
          gap: "10px",
        }}
      >
        <input 
          type="text"
          name='search'
          value={value}
          onChange={(e)=> setValue(e.target.value)}
          placeholder="Type to search..."
          style={{
            flex: 1,
            padding: "12px 15px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            fontSize: "14px",
            outline: "none",
            transition: "0.3s",
          }}
        />
        <button 
          type='submit'
          style={{
            padding: "12px 20px",
            border: "none",
            borderRadius: "8px",
            backgroundColor: "#1976d2",
            color: "#fff",
            fontSize: "16px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "5px",
            transition: "0.3s",
          }}
        >
          <FiSearch /> Search
        </button>
      </form>
    </div>
  )
}

export default SearchForm;
