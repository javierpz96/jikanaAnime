import React from "react";
import "../assets/css/sidebar.css";

const Sidebar = ({ topAnime }) => {
  return (
    <aside>
      <nav>
        <h3>Top Anime</h3>
        {topAnime.map((anime) => {
          return (
            <a href={anime.url} key={anime.mal_id}>
              {anime.title}
            </a>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;
