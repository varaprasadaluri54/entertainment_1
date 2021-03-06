import "./Trending.css";
import axios from "axios";
import { useEffect, useState } from "react";
import SingleContent from "../../components/SingleContent/SingleContent";
import "../../App.css";
import CustomPagination from "../../components/Pagination/CustomPagination.js";

const Trending = () => {
  const [page, setPage] = useState(1);
  const [content, setContent] = useState([]);
  const fetchTrending = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.REACT_APP_API_KEY}&page=${page}`
    );
    // console.log(data.results);
    setContent(data.results);
  };
  useEffect(() => {
    fetchTrending(); // eslint-disable-next-line
  }, [page]);
  return (
    <>
      <span className="pageTitle">Trending</span>
      <div className="trending">
        {content && content.map((c) => <SingleContent Key={c.id} {...c} />)}
      </div>
      <CustomPagination setPage={setPage} />
    </>
  );
};
export default Trending;
