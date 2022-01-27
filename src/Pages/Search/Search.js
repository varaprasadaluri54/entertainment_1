import {
  Button,
  createMuiTheme,
  Tabs,
  Tab,
  TextField,
  ThemeProvider
} from "@material-ui/core";
import { useState, useEffect } from "react";
import "../../App.css";
import SearchIcon from "@material-ui/icons/Search";
import axios from "axios";
import SingleContent from "../../components/SingleContent/SingleContent";
import CustomPagination from "../../components/Pagination/CustomPagination.js";

const Search = () => {
  const [type, setType] = useState(0);
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [content, setContent] = useState();
  const [numOfPages, setNumOfPages] = useState();

  const darkTheme = createMuiTheme({
    palette: {
      type: "dark",
      primary: {
        main: "#fff"
      }
    }
  });

  const fetchSearch = async () => {
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/search/${type ? "tv" : "movie"}?api_key=${
          process.env.REACT_APP_API_KEY
        }&language=en-US&query=${searchText}&page=${page}&include_adult=false`
      );
      setContent(data.results);
      setNumOfPages(data.total_pages);
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    window.scroll(0, 0);
    fetchSearch(); // eslint-disable-next-line
  }, [type, page]);

  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <div style={{ display: "flex", margin: "15px 0" }}>
          {/* <span className="pageTitle">Search</span> */}
          <TextField
            style={{ flex: 1 }}
            className="searchBox"
            label="search"
            variant="filled"
            onChange={(e) => setSearchText(e.target.value)}
          />
          <Button
            // onClick={fetchSearch}
            variant="contained"
            style={{ marginLeft: 10 }}
          >
            <SearchIcon />
          </Button>
        </div>
        <Tabs
          value={type}
          indicatorColor="primary"
          textColor="primary"
          onChange={(event, newValue) => {
            setType(newValue);
            setPage(1);
          }}
          style={{ paddingBottom: "5" }}
        >
          <Tab style={{ width: "50%" }} label="Search Movies" />
          <Tab style={{ width: "50%" }} label="Search Tv Series" />
        </Tabs>
      </ThemeProvider>
      <div className="trending">
        {content && content.map((c) => <SingleContent Key={c.id} {...c} />)}
        {searchText &&
          !content &&
          (type ? <h2> No Series found</h2> : <h2> No Movies found</h2>)}
      </div>
      {numOfPages > 1 && (
        <CustomPagination setPage={setPage} numOfPages={numOfPages} />
      )}
    </>
  );
};
export default Search;
