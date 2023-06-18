import React from 'react'
import { BsStarHalf, BsStarFill, BsStar } from "react-icons/bs"
const Star = ({ rating }) => {
    return (
        <>

            <span className="text-warning">
                {rating !== null && rating.toString().includes(".") &&
                    Array(5)
                        .fill(0)
                        .map((_, i) => {
                            const decimal = rating.toString().split(".")[1];
                            if (i < rating.toString().split(".")[0]) {
                                return <BsStarFill key={i} />;
                            } else if (i === parseInt(rating.toString().split(".")[0])) {
                                return decimal >= 5 ? (
                                    <BsStarHalf key={i} />
                                ) : (
                                    <BsStar key={i} />
                                );
                            } else {
                                return <BsStar key={i} />;
                            }
                        }
                        )
                }
                <span className='text-dark'>
                    ({Number(rating).toFixed(1)})
                </span>


            </span>
        </>
    )
}

export default Star