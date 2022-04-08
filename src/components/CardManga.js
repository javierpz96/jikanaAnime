import React from "react";
import { Link } from "react-router-dom";
import '../assets/css/mainContent.css'

const CardManga = (props) => {
  return (
    <div className="card">
      <p>{props.titulo}</p>
      <Link to={"/manga/" + props.id}>
        <img src={props.imagen} alt="mangaimagen"></img>
      </Link>
    </div>
  );
};

export default CardManga;
