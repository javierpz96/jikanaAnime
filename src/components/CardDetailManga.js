import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../assets/css/MangaDetalles.css";

const CardDetailManga = () => {
  let { mangaId } = useParams();

  const [mangaDetalle, setMangaDetalle] = useState([]);
  const [personajesManga, setPersonajesManga] = useState([]);

  useEffect(() => {
    fetch(`https://api.jikan.moe/v4/manga/${mangaId}`)
      .then((res) => res.json())
      .then((resti) => setMangaDetalle(resti));
  }, [mangaId]);

  useEffect(() => {
    axios
      .get(`https://api.jikan.moe/v4/manga/${mangaId}/characters`)
      .then((res) => {
        const { data } = res.data;
        const filterdatas = data.filter((personaje) => {
          return personaje.role === "Main";
        });
        setPersonajesManga(filterdatas);
      });
  }, [mangaId]);

  console.log(mangaDetalle, "aca estara el coso?");

  return (
    <div className="DetailManga">
      <div className="Detalles1">
        <h1>{mangaDetalle?.data?.title}</h1>
        <p>{mangaDetalle?.data?.synopsis}</p>
      </div>
      <div className="Detalles2">
        <img
          src={mangaDetalle?.data?.images?.jpg?.image_url}
          alt="imagenManga"
        ></img>
        <p>Autor: {mangaDetalle?.data?.authors[0]?.name}</p>
        <p>
          Genre:{" "}
          {mangaDetalle?.data?.genres?.map((genero) => genero.name).join(" , ")}
        </p>
        <p>Volumes: {mangaDetalle?.data?.volumes}</p>

        <p>
          {mangaDetalle?.publishing ? (
            <div className="aire">Status: <p>In air</p></div>
          ) : (
            <p className="Terminado">Status: <p>Finished 📚</p></p>
          )}
        </p>
        
      </div>
      <div className="MainMain">
          <h1>Main characters</h1>
        </div>
      <div className="personajesManga">
        {personajesManga.map((personaje) => {
          return (
            <div>
              <p>{personaje?.character?.name}</p>
              <img
                alt="animeimagen"
                src={personaje?.character?.images?.jpg?.image_url}
              ></img>
              <p>{personaje?.name}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CardDetailManga;
