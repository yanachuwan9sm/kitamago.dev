import Image from "next/image";
import React, { useRef, useState } from "react";

import Slider, { CustomArrowProps } from "react-slick";

import { FaChevronCircleLeft } from "react-icons/fa";
import { FaChevronCircleRight } from "react-icons/fa";
import style from "../Carousel/Carousel.module.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Blog } from "../../types/blog";

type carouselProps = {
  carouselItems: {
    url: string;
    title: string;
    image: string;
    alt: string;
    updatedAt: string;
  }[];
};

const SlickArrowLeft = ({ onClick }: CustomArrowProps): JSX.Element => {
  return (
    <button className={style.prevArrow} onClick={onClick}>
      <FaChevronCircleLeft />
    </button>
  );
};

const SlickArrowRight = ({ onClick }: CustomArrowProps): JSX.Element => {
  return (
    <button className={style.nextArrow} onClick={onClick}>
      <FaChevronCircleRight />
    </button>
  );
};

export const Carousel = (props: carouselProps) => {
  const sliderRef = useRef<Slider>(null);

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
    arrows: false,
    centerMode: true,
    dots: true,
    infinite: false,
    speed: 500,
    // variableWidth: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: <SlickArrowLeft />,
    nextArrow: <SlickArrowRight />,
    responsive: [
      {
        breakpoint: 480,
        settings: {
          adaptiveHeight: true,
          adaptiveWidth: true,
        },
      },
    ],

    appendDots: (dots: any) => (
      <>
        <div className={style.carouselControler}>
          {/* Prev ボタン */}
          <SlickArrowLeft onClick={handleClickSliderPrev} />
          {/* ドット */}
          <ul className={style.carouselDots}>{dots}</ul>
          {/* Next ボタン */}
          <SlickArrowRight onClick={handleClickSliderNext} />
        </div>
      </>
    ),
  };

  return (
    <div className={style.container}>
      <div className={style.wrapper}>
        <Slider ref={sliderRef} {...sliderSettings}>
          {props.carouselItems.map((carouselItem, index) => (
            <div className={style.CalouselItem} key={`carousel-item-${index}`}>
              <a href={carouselItem.url}>
                <Image
                  className={style.carouselItemImage}
                  src={carouselItem.image}
                  alt={carouselItem.title}
                  width="580px"
                  height="360px"
                />

                <h2 className={style.CalouselItemTitle}>
                  {carouselItem.title}
                </h2>

                <div className={style.CalouselItemDispcription}>
                  <div>タグ</div>
                  <div>{carouselItem.updatedAt}</div>
                </div>
              </a>
              <hr />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};