import Image from "next/image";
import React, { useRef, useState } from "react";

import Slider, { CustomArrowProps } from "react-slick";

import { FaPlay } from "react-icons/fa";
import { FaPause } from "react-icons/fa";
import { FaChevronCircleLeft } from "react-icons/fa";
import { FaChevronCircleRight } from "react-icons/fa";
import style from "../Carousel/Carousel.module.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

type Props = {
  carouselItems: {
    url: string;
    image: string;
    alt: string;
  }[];
};

const SlickArrowLeft = ({ onClick }: CustomArrowProps): JSX.Element => {
  return (
    <button className={style.prevArrow} onClick={onClick}>
      {/* <span className="fa fa-fw fa-chevron-left"></span> */}
      <FaChevronCircleLeft />
    </button>
  );
};

const SlickArrowRight = ({ onClick }: CustomArrowProps): JSX.Element => {
  return (
    <button className={style.nextArrow} onClick={onClick}>
      {/* <span className="fa fa-fw fa-chevron-right"></span> */}
      <FaChevronCircleRight />
    </button>
  );
};

export const Carousel = (props: Props) => {
  // カルーセルの再生・停止の状態を管理するステート
  const [isStopped, setIsStopped] = useState(false);

  const sliderRef = useRef<Slider>(null);

  // 再生ボタンをクリックした際に発生するコールバック関数
  const slickPlay = () => {
    sliderRef.current?.slickPlay();
    setIsStopped(false);
  };

  // 停止ボタンをクリックした際に発生するコールバック関数
  const slickPause = () => {
    sliderRef.current?.slickPause();
    setIsStopped(true);
  };

  // Prev ボタンをクリックした際に発生するコールバック関数
  const handleClickSliderPrev = () => {
    if (sliderRef?.current) {
      sliderRef.current.slickPrev();
    }
  };

  // Next ボタンをクリックした際に発生するコールバック関数
  const handleClickSliderNext = () => {
    if (sliderRef?.current) {
      sliderRef.current.slickNext();
    }
  };

  const sliderSettings = {
    autoplay: true, //スライドを自動再生
    autoplaySpeed: 3000, //自動再生スピード
    arrows: false,
    cssEase: "linear",
    centerMode: true,
    dots: true,
    infinite: true, //コンテンツをループさせる
    pauseOnFocus: true,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 480,
        settings: {
          adaptiveHeight: true,
        },
      },
    ],
    speed: 500,
    variableWidth: true,
    appendDots: (dots: any) => (
      <div className={style.carouselControler}>
        {/* Prev ボタン */}
        <SlickArrowLeft onClick={handleClickSliderPrev} />
        {/* ドット */}
        <ul className={style.carouselDots}>{dots}</ul>
        {/* 再生・停止 ボタン */}
        {isStopped ? (
          <button onClick={slickPlay} className={style.CarouselOperationButton}>
            <FaPlay />
          </button>
        ) : (
          <button
            onClick={slickPause}
            className={style.CarouselOperationButton}
          >
            {/* <span className="fa fa-fw fa-pause" /> */}
            <FaPause />
          </button>
        )}
        {/* Next ボタン */}
        <SlickArrowRight onClick={handleClickSliderNext} />
      </div>
    ),
  };

  return (
    <div>
      <Slider ref={sliderRef} {...sliderSettings}>
        {props.carouselItems.map((carouselItem, index) => (
          <div
            className={style.bunnerCalouselLink}
            key={`carousel-item-${index}`}
          >
            <a href={carouselItem.url}>
              <Image
                src={carouselItem.image}
                alt={carouselItem.alt}
                width="320px"
                height="180px"
                css={{ margin: "auto" }}
              />
            </a>
          </div>
        ))}
      </Slider>
    </div>
  );
};
