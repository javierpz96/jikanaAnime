import React from "react";
import "../assets/css/mainContent.css";
import CardAnime from "./CardAnime";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import TextField from '@mui/material/TextField';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';


const MainContent = (props) => {
  return (
    <main className="contenedor-main">
      <div className="input">
        
        <form className="search-box" onSubmit={props.HandleSearch}>
          <input
          
            className="control"
            type="search"
            placeholder="Search for an anime ..."
            required
            value={props.search}
            onChange={(e) => props.setSearch(e.target.value)}
          ></input>
          
          
        </form>
      </div>
      <div className="topAnime">
        <h2>Top Anime</h2>
        {props.topAnime.map((anime) => {
          return (
            <ul>
              <a href={anime.url} key={anime.mal_id}>
                <ArrowRightIcon/>{anime.title}
              </a>
            </ul>
          );
        })}
      </div>
      <div className="animeGrid">
        {props.animeList.map((anime) => {
          return (
            <CardAnime
              key={anime.mal_id}
              id={anime.mal_id}
              titulo={anime?.title}
              imagen={anime.images?.jpg?.image_url}
            ></CardAnime>
          );
        })}
        
      </div>
      
    </main>
  );
};

export default MainContent;
