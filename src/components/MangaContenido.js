import React from "react";
import "../assets/css/MangaContenido.css";
import CardManga from "./CardManga";
import ArrowRightIcon from '@mui/icons-material/ArrowRight';


const MangaContenido = (props) => {
  return (
    <main className="contenedor-manga">
      <div className="SearchManga">
        <form className="search-box" onSubmit={props.HandleSearchManga}>
          <input
          className="control"
            type="search"
            placeholder="Search for an manga ..."
            required
            value={props.mangaSearch}
            onChange={(e) => props.setMangaSearch(e.target.value)}
          ></input>
        </form>
      </div>
      <div className="topManga">
        <h2>Top Mangas</h2>
        {props.topManga.map((manga) => {
          return (
            <ul>
              <a href={manga.url} key={manga.mal_id}>
              <ArrowRightIcon/> {manga.title}
              </a>
            </ul>
          );
        })}
      </div>
      <div className="mangaGrid">
        {props.manga.map((manga) => {
          return (
            <CardManga
              key={manga.mal_id}
              id={manga.mal_id}
              titulo={manga.title}
              imagen={manga?.images?.jpg?.image_url}
            ></CardManga>
          );
        })}
      </div>
    </main>
  );
};

export default MangaContenido;
