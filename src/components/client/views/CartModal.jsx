import { Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import {
  clearBorrow,
  removeItem,
  updateReturnDate,
} from "../../../features/borrowSlice";
import { toast } from "react-toastify";
import { useItemRentCreateMutation } from "../../../services/itemRentApi";

function CartModal({ show, handleClose }) {
  const borrow = useSelector((state) => state.borrow);
  const authUser = useSelector((state) => state.clientAuth.clientUser);
  const dispatch = useDispatch();
  const [itemRentCreate, res] = useItemRentCreateMutation();






  const totalQty = borrow?.borrow?.reduce(
    (total, book) => total + book?.item_qty,
    0
  );

  const submitHandler = async (e) => {
    e.preventDefault();
    if (borrow?.borrow?.length === 0) {
      toast.error("Your borrow cart is empty");
    } else {
      if (!authUser) {
        toast.error("Please login first");
      } else {
        const data = {
          items: borrow?.borrow,
          qty: totalQty,
          user_id: authUser.id,
        };

       
        await itemRentCreate(data);
        handleClose();
        dispatch(clearBorrow());
        toast.success("Borrow request submitted successfully");
      }
    }
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Book Borrow Cart</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={submitHandler}>
            <div className="modal-content">
              <div className="modal-body">
                <table className="table table-image">
                  <thead>
                    <tr>
                      <th scope="col"></th>
                      <th scope="col">Product</th>
                      <th scope="col">Return Date</th>
                      <th scope="col">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {borrow?.borrow?.map((book, i) => (
                      <tr key={i}>
                        <td className="w-25">
                          <img
                            src={`${import.meta.env.VITE_FILE_URL}/${
                              book?.photo
                            }`}
                            className="img-fluid img-thumbnail "
                            alt="Sheep"
                            style={{
                              height: "50px",
                              width: "50px",
                            }}
                          />
                        </td>
                        <td className="pt-4">{book?.title}</td>
                        <td className="pt-4">
                          <input
                            className="form-control"
                            type="date"
                            name="return_date"
                            value={book?.return_date}
                            id=""
                            required
                            onChange={(e) => {
                              dispatch(
                                updateReturnDate({
                                  id: book?.id,
                                  title: book?.title,
                                  photo: book?.photo,
                                  item_qty: book?.item_qty,
                                  return_date: e.target.value,
                                })
                              );
                            }}
                          />
                        </td>

                        <td className="pt-4">
                          <button
                            type="button"
                            className="btn btn-danger btn-sm"
                            onClick={() => dispatch(removeItem(book?.id))}
                          >
                            Remove
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="d-flex justify-content-end  ">
                  {/* <div>
                  <p>Return Date</p>
                  <input
                    className="form-control"
                    type="date"
                    name="return_date"
                    id=""
                    
                  />
                </div> */}
                  <h5 className="mt-5">
                    Total Book:{" "}
                    <span className="price text-success">{totalQty}</span>
                  </h5>
                </div>
              </div>
              <div className="modal-footer border-top-0 ">
                <Button variant="dark" onClick={handleClose}>
                  Close
                </Button>
                <button
                  type="submit"
                  className="btn btn-success"
                  // onClick={submitHandler}
                >
                  Borrow Now
                </button>
              </div>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default CartModal;
