import React, { useEffect, useMemo, useState } from "react";
import {

  useGetReviewByUserQuery,
  useReviewItemMutation,
} from "../../../../services/clientSiteApi";
import { FaStar } from "react-icons/fa";
import { useFormik } from "formik";
import { toast } from "react-toastify";

const colors = {
  orange: "#FFBA5A",
  grey: "#a9a9a9",
};

export const AddReviews =  ({ itemId }) => {
  const [reviewItem, res] = useReviewItemMutation();
  const reviewRes = useGetReviewByUserQuery(itemId);
  const data = reviewRes?.data?.data;
  const [currentValue, setCurrentValue] = useState();
  const [hoverValue, setHoverValue] = useState(undefined);

  const stars = Array(5).fill(0);
  const handleClick = (value) => {
    setCurrentValue(value);
  };

  const handleMouseOver = (newHoverValue) => {
    setHoverValue(newHoverValue);
  };

  const handleMouseLeave = () => {
    setHoverValue(undefined);
  };

  useEffect(() => {
    setCurrentValue(data?.rating);
  }, [data?.rating]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      id: data?.id,
      content: data ? data?.content : "",
      item_id: itemId,
    },

    onSubmit: async (values, { resetForm }) => {
      resetForm();

      try {
        const value = {
          id: data?.id,
          item_id: itemId,
          content: values.content,
          rating: currentValue,
        };

        const result = await reviewItem(value).unwrap();
        toast.success(result.message);
      } catch (error) {
        toast.warn(error.data.message);
      }
    },
  });

  return (
    <div className="mt-5">
      

      <form
        className="form-sample"
        onSubmit={formik.handleSubmit}
        encType="multipart/form-data"
      >
        <div style={styles.container}>
          <h5 className=" text-uppercase fw-bold">Write A Review</h5>
          <div style={styles.stars}>
            {stars.map((_, index) => {
              return (
                <FaStar
                  key={index}
                  size={24}
                  onClick={() => handleClick(index + 1)}
                  onMouseOver={() => handleMouseOver(index + 1)}
                  onMouseLeave={handleMouseLeave}
                  color={
                    (hoverValue || currentValue) > index
                      ? colors.orange
                      : colors.grey
                  }
                  style={{
                    marginRight: 10,
                    cursor: "pointer",
                  }}
                />
              );
            })}
          </div>
          <textarea
            type="text"
            placeholder="What's your experience?"
            className="form-control mt-2"
            name="content"
            onChange={formik.handleChange}
            value={formik.values.content}
            required
          />

          <button type="submit" className=" btn btn-primary btn-sm my-2">
            Submit
          </button>
        </div>
      </form>
    </div>
  );



};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  stars: {
    display: "flex",
    flexDirection: "row",
  },
};
