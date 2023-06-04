import React from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import BookCard from "./common/BookCard";
import { useGetAllBookItemQuery } from "../../../services/ClientApi";
const Home = () => {
  const bookRes = useGetAllBookItemQuery();



  return (
    <>
      <div className="container py-5">
        <div class="row">
          <div className="col"></div>
          <div className="col-md-4 co-12 my-4">
            <input
              type="search"
              className=" form-control rounded-5"
              name=""
              id=""
              placeholder="Search by your preference"
            />
          </div>

          <div className="col"></div>
        </div>
        <div>
          <div>
            <div className="mb-3">
              <h3>All Books</h3>
            </div>

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
              {bookRes?.data?.data?.map((book,i) => (
                <SwiperSlide>
                  <BookCard book={book} key={i}/>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          <div className="mt-5 ">
            <div className="mb-3">
              <h3>Most Read</h3>
            </div>
            <Swiper
              // install Swiper modules
              modules={[Navigation, Pagination, Scrollbar, A11y]}
              spaceBetween={50}
              slidesPerView={4}
              navigation={{
                clickable: true,
              }}
              pagination={{ clickable: true }}
              // scrollbar={{ draggable: true }}
           
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
              <SwiperSlide>
                <BookCard />
              </SwiperSlide>
              <SwiperSlide>
                <BookCard />
              </SwiperSlide>
              <SwiperSlide>
                <BookCard />
              </SwiperSlide>
            </Swiper>
          </div>

          <div className="mt-5 text-center">
            <button
              className="btn"
              style={{ backgroundColor: "#033D75", color: "white" }}
            >
              View More
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
