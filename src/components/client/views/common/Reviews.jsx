import React from 'react'
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { useGetReviewByItemQuery } from '../../../../services/clientSiteApi';
import avatar from "./../../../../assets/images/profile-picture.png";
const Reviews = ({ itemId }) => {
    const reviewItemRes = useGetReviewByItemQuery(itemId);
    const resData = reviewItemRes?.data?.data;
    return (
        <div className="m-2">
            {/* review */}
            <div className="mt-5">
                <h4 className=" text-uppercase fw-bold">Reviews</h4>
            </div>

            <hr />

            {resData?.map((item, i) => (
                <div >
                    {item?.profile_photo_path ? (
                        <img
                            className="img-fluid rounded-circle shadow"
                            style={{ width: "40px", height: "40px" }}
                            src={`${import.meta.env.VITE_FILE_URL}${item?.profile_photo_path
                                }`}
                            alt=""
                        ></img>
                    ) : (
                        <img
                            className="img-fluid rounded-circle shadow"
                            style={{ width: "40px", height: "40px" }}
                            src={avatar}
                            alt=""
                        ></img>
                    )}


                    <b className="text-muted ms-1">{item.name}</b>


                    <div className='mt-1'>

                        {Array(5)
                            .fill(0)
                            .map((_, i) => (
                                <span>

                                    {i < item.rating ? (
                                        <AiFillStar size={20} color="#FFBA5A" />
                                    ) : (
                                        <AiOutlineStar size={20} color="#FFBA5A" />
                                    )}
                                </span>
                            ))
                        }






                        <p className="mt-1 ">
                            {item.content}
                        </p>
                        <hr />
                    </div>

                </div>

            ))}



            {/* review */}
        </div>
    )
}

export default Reviews