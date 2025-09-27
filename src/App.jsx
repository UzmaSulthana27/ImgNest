import React from "react";
import { AppProvider } from "./Context.jsx"; // make sure this file exports AppProvider
import SearchForm from "./components/SearchForm.jsx";
import Gallery from "./components/Gallery.jsx";

const App = () => {
  return (
    <AppProvider>
      <div style={{ fontFamily: "Arial, sans-serif" }}>
        <SearchForm />
        <Gallery />
      </div>
    </AppProvider>
  );
};

export default App;