import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../assets/DetallesAnime.css";
import axios from "axios";
import TvIcon from '@mui/icons-material/Tv';

const CardDetailAnime = () => {
  let { animeId } = useParams();

  const [animeDetalle, setAnimeDetalle] = useState([]);
  const [personajes, setPersonajes] = useState([]);

  useEffect(() => {
    fetch(`https://api.jikan.moe/v3/anime/${animeId}`)
      .then((res) => res.json())
      .then((res) => setAnimeDetalle(res));
  }, [animeId]);

  console.log(animeDetalle);

  useEffect(() => {
    axios
      .get(`https://api.jikan.moe/v4/anime/${animeId}/characters`)
      .then((res) => {
        const { data } = res.data;
        const filterdata = data.filter((personaje) => {
          return personaje.role === "Main";
        });
        setPersonajes(filterdata);
      });
  }, [animeId]);

  console.log(personajes, "aca estan los personajes?");

  //Aca va todo el detalle del ANIME

  return (
    <div className="detailAnime">
      <div className="Detalles1">
        <h2>{animeDetalle?.title}</h2>
        <p>{animeDetalle?.synopsis}</p>
        <iframe
          className="videoAnime"
          width="690"
          height="415"
          src={animeDetalle?.trailer_url}
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay=0; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
      </div>
      <div className="Detalles2">
        
      <a href={animeDetalle?.character?.url}><img src={animeDetalle?.image_url} alt="imagenAnime"></img></a>

        <p>
          Genres:{" "}
          {animeDetalle?.genres?.map((genero) => genero.name).join(" , ")}
        </p>
        <p>Episodes: {animeDetalle.episodes}</p>
        {animeDetalle.airing ? (
          <div className="aire">Status: <p>In air 📺</p></div>
        ) : (
          <p className="Terminado">Status: <p> Finished 📺</p></p>
        )}
      </div>

      <div className="voces">
      <h1>Main characters and voice actors</h1>
      </div>
      
      <div className="perso">
        
        {personajes.map((personaje) => {
          return (
            <div>
              
              <p>{personaje?.character?.name}</p>
              <img
                alt="animeimagen"
                src={personaje?.character?.images?.jpg?.image_url}
              ></img>
              <p>{personaje?.voice_actors[0]?.person.name}</p>
              <img
                alt="fotoanime"
                src={personaje?.voice_actors[0]?.person?.images?.jpg?.image_url}
              ></img>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CardDetailAnime;
