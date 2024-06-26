import React from "react";

const Footer = () => {
  const footStyle = {
    color: "green",
    fontStyle: "italic",
    fontSizr: "16",
  };
  return (
    <div style={footStyle}>
      <br />{" "}
      <em>
        Note app, Department of Software Engineering, University of Helsinki 2024
      </em>
    </div>
  );
};

export default Footer;
