import "../../App.css";
import axios from "axios";
import { useEffect, useState } from "react";
import "../../App.css";
import CustomPagination from "../../components/Pagination/CustomPagination.js";
import SingleContent from "../../components/SingleContent/SingleContent";
import Genres from "../../components/Genres.js";
import useGenres from "../../hooks/useGenre";

const Series = () => {
  const [page, setPage] = useState(1);
  const [content, setContent] = useState([]);
  const [numOfPages, setNumOfPages] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectedgenres, setSelectedGenres] = useState([]);
  const genreforURL = useGenres(selectedgenres);

  const fetchTvs = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/discover/tv?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreforURL}`
    );

    // console.log(data.result);
    setContent(data.results);
    setNumOfPages(data.total_pages);
  };
  useEffect(() => {
    fetchTvs(); // eslint-disable-next-line
  }, [page, genreforURL]);

  return (
    <>
      <span className="pageTitle">Series</span>
      <Genres
        type="tv"
        selectedGenres={selectedgenres}
        setSelectedGenres={setSelectedGenres}
        genres={genres}
        setGenres={setGenres}
        setPage={setPage}
      />
      <div className="movies">
        {content && content.map((c) => <SingleContent Key={c.id} {...c} />)}
      </div>
      {numOfPages > 1 && (
        <CustomPagination setPage={setPage} numOfPages={numOfPages} />
      )}
    </>
  );
};
export default Series;
