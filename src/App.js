import "./App.css";
import { useState, useEffect } from "react";
import MainContent from "./components/MainContent";
import axios from "axios";
import NavBar from "./components/NavBar";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Routes,
} from "react-router-dom";
import MangaContenido from "./components/MangaContenido";
import CardDetailAnime from "./components/CardDetailAnime";
import CardDetailManga from "./components/CardDetailManga";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Footer from "./components/Footer";

function App() {
  const [animeList, setAnimeList] = useState([]);
  const [topAnime, setTopAnime] = useState([]);
  const [search, setSearch] = useState("");
  const [manga, setManga] = useState([]);
  const [mangaSearch, setMangaSearch] = useState("");
  const [topManga, setTopManga] = useState([]);
  const [page, setPage] = useState(1);
  const [postPerPage, setPostPerPage] = useState(15);

  const [testAnime, setTestAnime] = useState([]);

  //Para saber el topManga
  useEffect(() => {
    fetch(`https://api.jikan.moe/v3/top/manga/1/bypopularity`)
      .then((res) => res.json())
      .then((res) => setTopManga(res.top.slice(0, 10)));
  }, []);

  //Para el manga
  useEffect(() => {
    fetch(`https://api.jikan.moe/v4/manga`)
      .then((res) => res.json())
      .then((resultados) => setManga(resultados["data"].slice(0, 15)));
  }, []);

  //Top anime para el sidebar
  useEffect(() => {
    fetch(`https://api.jikan.moe/v3/top/anime/1/bypopularity`)
      .then((res) => res.json())
      .then((res) => setTopAnime(res.top.slice(0, 10)));
  }, []);

  //Animes al aire para animeList
  //useEffect(() => {
  // fetch(`https://api.jikan.moe/v3/top/anime/${page}/airing`)
  //   .then((res) => res.json())
  //   .then((res) => setAnimeList(res.top.slice(0, 15)));
  //}, [page]);

  //V4 animelist

  useEffect(() => {
    fetch(`https://api.jikan.moe/v4/anime?page=${page}`)
      .then((res) => res.json())
      .then((resultado) => setAnimeList(resultado["data"].slice(0, 15)));
  }, [page]);

  console.log(animeList, "este es el test anime v4");

  const HandleSearch = (e) => {
    e.preventDefault();
    FetchAnime(search);
  };

  //El buscador
  const FetchAnime = async (pepito) => {
    const temp = await fetch(
      `https://api.jikan.moe/v4/anime?q=${pepito}&order_by=title&sort=asc&limit=10`
    ).then((res) => res.json());
    setAnimeList(temp.data);
  };

  //Buscador manga

  const FetchManga = async (pepito) => {
    const temp = await fetch(
      `https://api.jikan.moe/v4/manga?q=${pepito}&order_by=title&sort=asc&limit=10`
    ).then((res) => res.json());
    setManga(temp.data);
  };

  const HandleSearchManga = (e) => {
    e.preventDefault();
    FetchManga(mangaSearch);
  };

  const handlePageClick = (data) => {
    console.log(data);
  };

  //Pagination


  //<Stack spacing={2}>
  //        <Pagination count={10}
          
  //        onChange={(data)=>{props.setPage(data?.target?.outerText )}}
  //        />
  //      </Stack>

  console.log(manga,"buscar imagen");

  return (
    <Router>
      <div>
        <NavBar></NavBar>

        <Routes>
          <Route
            path="/anime"
            element={
              <MainContent
                setPage={setPage}
                HandleSearch={HandleSearch}
                search={search}
                setSearch={setSearch}
                animeList={animeList}
                topAnime={topAnime}
              ></MainContent>
            }
          />
          <Route
            path="/manga"
            element={
              <MangaContenido
                topManga={topManga}
                manga={manga}
                mangaSearch={mangaSearch}
                HandleSearchManga={HandleSearchManga}
                setMangaSearch={setMangaSearch}
              />
            }
          ></Route>
          <Route path="/anime/:animeId" element={<CardDetailAnime />}></Route>
          <Route path="/manga/:mangaId" element={<CardDetailManga />}></Route>
        </Routes>
        <Footer></Footer>
      </div>
    </Router>
  );
}

export default App;
