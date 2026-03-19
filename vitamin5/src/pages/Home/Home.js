import React, { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";

function Home() {
  const { theme } = useContext(ThemeContext);

  return (
    <div style={{ backgroundColor: theme === "dark" ? "#222" : "#fff", color: theme === "dark" ? "#fff" : "#333", minHeight: "100vh", padding: "2rem" }}>
      <h1>Welcome to the React App!</h1>
      <p>Use the navigation links above to explore the app.</p>
    </div>
  );
}

export default Home;
