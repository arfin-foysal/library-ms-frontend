import React from 'react'
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import avatar from "./../../../../assets/images/profile-picture.png";
import { BiTrash } from 'react-icons/bi';
import { confirmHandel } from '../../../../utils/Alert';

import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useReviewDeleteMutation } from '../../../../services/clientSiteApi';
import { Link } from 'react-router-dom';
const Reviews = ({ reviews }) => {

    const authUser = useSelector((state) => state.clientAuth.clientUser);
    const authToken = useSelector((state) => state.clientAuth.clientToken);

    const [reviewDelete] = useReviewDeleteMutation()

    const handelDelete = async (id) => {
        const result = await reviewDelete(id).unwrap();
        toast.success(result.message);
    };








    return (
        <div className="m-2">
            <div className="mt-5">
                <h4 className=" text-uppercase fw-bold">Reviews</h4>
            </div>

            <hr />

            {reviews?.map((item, i) => (
                <div key={i}>
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

                    {authUser && authToken && authUser.id === item.user_id && (
                        <span className='ms-4 pointer' onClick={() => confirmHandel(
                            "error",
                            "Delete",
                            "#FF0000",
                            item.id,
                            handelDelete
                        )}><BiTrash color='red' /></span>
                    )
                    }




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
            <div className='text-end'>

                <p>
                    <span className='text-muted '>
                        <Link className='text-primary'>
                         See all reviews
                        </Link>
                        
                       </span>

                </p>




            </div>
        </div>
    )
}

export default Reviews