import Image from 'next/image';
import Link from 'next/link';
import React, { useRef } from 'react';

import { IconContext } from 'react-icons';
import { FaChevronCircleLeft } from 'react-icons/fa';
import { FaChevronCircleRight } from 'react-icons/fa';
import Slider from 'react-slick';

import style from '../Carousel/Carousel.module.scss';

import type { Tag } from '@/src/types/tag';
import type { MicroCMSListContent } from 'microcms-js-sdk';
import type { CustomArrowProps } from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

type carouselProps = {
  carouselItems: {
    url: string;
    title: string;
    image: string;
    alt: string;
    updatedAt: string;
    tags: (Tag & MicroCMSListContent)[];
  }[];
};

const SlickArrowLeft = ({ onClick }: CustomArrowProps): JSX.Element => {
  return (
    <IconContext.Provider value={{ color: '#151515', size: '35px' }}>
      <button className={style.prevArrow} onClick={onClick}>
        <FaChevronCircleLeft />
      </button>
    </IconContext.Provider>
  );
};

const SlickArrowRight = ({ onClick }: CustomArrowProps): JSX.Element => {
  return (
    <IconContext.Provider value={{ color: '#151515', size: '35px' }}>
      <button className={style.nextArrow} onClick={onClick}>
        <FaChevronCircleRight />
      </button>
    </IconContext.Provider>
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
    centerPadding: '0px',
    dots: true,
    infinite: true,
    speed: 500,

    slidesToShow: 1,
    slidesToScroll: 1,

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
                  width="680px"
                  height="480px"
                />
                <div className={style.CalouselItemBody}>
                  <h2 className={style.CalouselItemTitle}>{carouselItem.title}</h2>
                  <div className={style.CalouselItemDispcription}>
                    <ul>
                      {carouselItem.tags.map((tag) => (
                        <li key={tag.id}>
                          <Link href="/category/[id]" as={`/category/${tag.tag}`}>
                            <a> {tag.tag}</a>
                          </Link>
                        </li>
                      ))}
                    </ul>
                    <div className={style.CalouselDate}>{carouselItem.updatedAt}</div>
                  </div>
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
