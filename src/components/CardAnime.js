import React from "react";
import { Link } from "react-router-dom";
import "../assets/css/mainContent.css";

const CardAnime = (props) => {
  return (
    <div className="card">
      <p>{props.titulo}</p>
      <Link to={"/anime/" + props.id}>
        <img src={props.imagen} alt="imagenanime"></img>
      </Link>
    </div>
  );
};

export default CardAnime;
