import React from "react";
import InteractiveCard from "./InteractiveCard";
import "./InteractiveCard.css";
import { Helmet } from "react-helmet";

function App() {
  return (
    <>
    <Helmet>
      <title>Kevin Hyun Portfolio</title>
      <meta name="description" content="Interactive portfolio with business card" />
    </Helmet>
    <div style={{ display: "flex",
      justifyContent: "center",  // horizontal centering
      alignItems: "center",      // vertical centering
      height: "100vh" }}>
      <InteractiveCard width={1050} height={600}>
        <img
          src="download.jpeg"
          alt="demo"
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
        />
      </InteractiveCard>
    </div>
    </>
  );
}

export default App;
