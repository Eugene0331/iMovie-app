import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import Button, { OutlineButton } from "../button/Button";
import Modal, { ModalContent } from "../modal/Modal";
import tmdbApi, { category, movieType } from "../../api/tmdbApi";

import apiConfig from "../../api/apiConfig";

import "./hero-slide.scss";
import "swiper/css/autoplay";

const HeroSlide = () => {
  const [movieItem, setMovieItem] = useState([]);

  useEffect(() => {
    const getMovies = async () => {
      const params = { page: 1 };
      try {
        const response = await tmdbApi.getMovieList(movieType.popular, {
          params,
        });
        setMovieItem(response.results.slice(0, 4));
      } catch {
        console.log("error");
      }
    };
    getMovies();
  }, []);

  return (
    <div className="hero-slide">
      <Swiper
        modules={[Autoplay]}
        autoplay={{ delay: 7000 }}
        grabCursor={true}
        spaceBetween={0}
        slidesPerView={"auto"}
      >
        {movieItem.map((item, i) => (
          <SwiperSlide key={i}>
            {({ isActive }) => (
              <HeroSliderItem
                item={item}
                className={`${isActive ? "active" : ""}`}
              />
            )}
          </SwiperSlide>
        ))}
      </Swiper>
      {movieItem.map((item, i) => (
        <TrailerModal key={i} item={item} />
      ))}
    </div>
  );
};
const HeroSliderItem = (props) => {
  let history = useNavigate();
  const item = props.item;

  const background = apiConfig.originalImage(
    item.backdrop_path ? item.backdrop_path : item.poster_item
  );

  const setModalActive = async () => {
    const modal = document.querySelector(`#modal_${item.id}`);

    const videos = await tmdbApi.getVideos(category.movie, item.id);

    if (videos.results.length > 0) {
      const trailerVideo = videos.results.find(
        (video) => video.type === "Trailer"
      );
      if (trailerVideo) {
        const videoKey = trailerVideo.key;
        const videSrc = "https://www.youtube.com/embed/" + videoKey;
        modal
          .querySelector(".modal__content > iframe")
          .setAttribute("src", videSrc);
      }
    } else {
      modal.querySelector(".modal__content").innerHTML = "No trailer";
    }

    modal.classList.toggle("active");
  };
  return (
    <div
      className={`hero-slide__item ${props.className}`}
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className="hero-slide__item__content container">
        <div className="hero-slide__item__content__info">
          <h2 className="title">{item.title}</h2>
          <div className="overview">{item.overview}</div>
          <div className="btns">
            <Button onClick={() => history("/movie/" + item.id)}>
              Watch now
            </Button>
            <OutlineButton onClick={setModalActive}>
              Watch trailer
            </OutlineButton>
          </div>
        </div>
        <div className="hero-slide__item__content__poster">
          <img src={apiConfig.w500Image(item.poster_path)} alt="" />
        </div>
      </div>
    </div>
  );
};

const TrailerModal = (props) => {
  const item = props.item;

  const iframeRef = useRef(null);

  const onClose = () => iframeRef.current.setAttribute("src", "");
  return (
    <Modal active={false} id={`modal_${item.id}`}>
      <ModalContent onClose={onClose}>
        <iframe
          ref={iframeRef}
          width="100%"
          height="500px"
          title="trailer"
        ></iframe>
      </ModalContent>
    </Modal>
  );
};

export default HeroSlide;
