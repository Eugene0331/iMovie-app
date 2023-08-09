import React, { useState, useEffect } from "react";
import "./movie-grid.scss";
import MovieCard from "../movie-card/MovieCard";
import { useNavigate, useParams } from "react-router-dom";
import tmdbApi, { category, movieType, tvType } from "../../api/tmdbApi";
import { OutlineButton } from "../button/Button";
import Pagination from "@mui/material/Pagination";
import MovieSearch from "../movie-search/MovieSearch";
import { ThemeProvider, createTheme, Fab } from "@mui/material";

const MovieGrid = ({ cate }) => {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);

  const { keyword } = useParams();
  const navigate = useNavigate();

  const theme = createTheme({
    components: {
      MuiPaginationItem: {
        styleOverrides: {
          root: {
            color: "white",
            "&:hover, &:focus": {
              backgroundColor: "#8ac43f",
            },
            "&.Mui-selected": {
              backgroundColor: "#8ac43f",
            },
          },
        },
      },
    },
  });

  useEffect(() => {
    const getList = async () => {
      let response = null;
      if (keyword === undefined) {
        const params = {};
        switch (cate) {
          case category.movie:
            response = await tmdbApi.getMovieList(movieType.upcoming, {
              params,
            });
            break;
          default:
            response = await tmdbApi.getTvList(tvType.top_rated, { params });
        }
      } else {
        const params = {
          query: keyword,
        };
        response = await tmdbApi.search(cate, { params });
      }
      setItems(response.results);
      setTotalPage(response.total_pages);
    };
    getList();
  }, [cate, keyword]);

  const loadMore = async () => {
    let response = null;
    if (keyword === undefined) {
      const params = {
        page: page + 1,
      };
      switch (cate) {
        case category.movie:
          response = await tmdbApi.getMovieList(movieType.upcoming, {
            params,
          });
          break;
        default:
          response = await tmdbApi.getTvList(tvType.top_rated, { params });
      }
    } else {
      const params = {
        page: page + 1,
        query: keyword,
      };
      response = await tmdbApi.search(cate, { params });
    }
    setItems([...items, ...response.results]);
    setPage(page + 1);
  };

  const handleChange = async (event, newPage) => {
    let response = null;

    if (keyword === undefined) {
      const params = {
        page: newPage,
      };
      switch (cate) {
        case category.movie:
          response = await tmdbApi.getMovieList(movieType.upcoming, {
            params,
          });
          break;
        default:
          response = await tmdbApi.getTvList(tvType.top_rated, { params });
      }
    } else {
      const params = {
        page: newPage,
        query: keyword,
      };
      response = await tmdbApi.search(cate, { params });
    }

    setItems(response.results);
    setPage(newPage);
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <div className="section mb-3">
          <MovieSearch
            categories={cate}
            keyword={keyword}
            navigate={navigate}
          />
        </div>
        <div className="movie-grid">
          {items.map((item, i) => (
            <MovieCard categories={cate} item={item} key={i} />
          ))}
        </div>
        {page < totalPage ? (
          <div className="movie-grid__loadmore">
            <OutlineButton className="small" onClick={loadMore}>
              Load more...
            </OutlineButton>
          </div>
        ) : null}
        <div className="pagination">
          <Pagination count={totalPage} page={page} onChange={handleChange} />
        </div>
      </ThemeProvider>
    </>
  );
};

export default MovieGrid;
