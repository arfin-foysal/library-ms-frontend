import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import BookCard from './BookCard';
import Loader from '../../../dashboard/common/Loader';

const HomeSlider = ({ book,
  isLoading
}) => {
  return (
    <div>
      
      <Swiper
              // install Swiper modules
              modules={[Navigation, Pagination, Scrollbar, A11y]}
              spaceBetween={10}
              slidesPerView={4}
              navigation={{
                clickable: true,
              }}
              pagination={{ clickable: true }}
              // scrollbar={{ draggable: true }}
              // onSwiper={(swiper) => console.log(swiper)}
              // onSlideChange={() => console.log("slide change")}
              breakpoints={{
                0: {
                  slidesPerView: 1,
                  spaceBetween: 10,
                },

                480: {
                  slidesPerView: 2,
                  spaceBetween: 10,
                },
                786: {
                  slidesPerView: 3,
                  spaceBetween: 15,
                },
                1024: {
                  slidesPerView: 4,
                  spaceBetween: 15,
                },
                1280: {
                  slidesPerView: 5,
                  spaceBetween: 30,
                },
              }}
            >
              {isLoading && <Loader />}

              {book?.map((book, i) => (
                <SwiperSlide key={i}>
                  <BookCard book={book} />
                </SwiperSlide>
              ))}
            </Swiper>
    </div>
  )
}

export default HomeSlider