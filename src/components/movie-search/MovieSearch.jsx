import React, { useCallback, useEffect, useState } from "react";
import "./movie-search.scss";
import Input from "../input/Input";
import { category } from "../../api/tmdbApi";
import Button from "../button/Button";

const MovieSearch = ({ categories, keyword, navigate }) => {
  const [searchKeyword, setSearchKeyword] = useState(keyword ? keyword : "");

  const goToSearch = useCallback(() => {
    if (searchKeyword.trim().length > 0) {
      navigate(`/${category[categories]}/search/${searchKeyword}`);
    }
  }, [searchKeyword, categories, navigate]);

  useEffect(() => {
    const enterEvent = (e) => {
      e.preventDefault();
      if (e.keyCode === 13) {
        goToSearch();
      }
    };
    document.addEventListener("keyup", enterEvent);
    return () => {
      document.removeEventListener("keyup", enterEvent);
    };
  }, [goToSearch]);

  return (
    <div className="movie-search">
      <Input
        type="text"
        placeholder="Enter keyword"
        value={searchKeyword}
        onChange={(e) => setSearchKeyword(e.target.value)}
      />
      <Button className="small" onClick={goToSearch}>
        Search
      </Button>
    </div>
  );
};

export default MovieSearch;
