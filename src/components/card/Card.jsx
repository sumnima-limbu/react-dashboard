import React from "react";
import "./Card.css";

const Card = ({ icon, number, label }) => {
  return (
    <div className="card">
      <div className="card-icon">{icon}</div>
      <div className="card-number">{number}</div>
      <div className="card-label">{label}</div>
    </div>
  );
};

export default Card;
