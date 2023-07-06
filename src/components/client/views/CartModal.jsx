import { Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import { clearBorrow, removeItem, returnDate } from "../../../features/borrowSlice";
import { toast } from "react-toastify";
import { useItemRentCreateClientMutation } from "../../../services/clientSiteApi";
import { useNavigate } from "react-router-dom";
import { TbCurrencyTaka } from "react-icons/tb";
import { useState } from "react";


function CartModal({ show, handleClose }) {
  const [borrowOrBuy, setBorrowOrBuy] = useState("borrow");
  const navigate = useNavigate();
  const borrow = useSelector((state) => state.borrow);
  const authUser = useSelector((state) => state.clientAuth.clientUser);
  const dispatch = useDispatch();
  const [itemRentCreateClient, res] = useItemRentCreateClientMutation();



  const totalQty = borrow?.borrow?.reduce(
    (total, book) => total + book?.item_qty,
    0
  );

  const totalPrice = borrow?.borrow?.reduce(
    (total, book) => total + book?.price,
    0
  );

  //return date today after 7days

  const returnAfterDate = new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000)
    .toISOString()
    .slice(0, 10);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (borrow?.borrow?.length === 0) {
      toast.error("Your borrow cart is empty");
    } else {
      if (!authUser) {
        toast.error("Please login first");

        setTimeout(() => {
          navigate("/login");
        }, 3000);

      } else {
        const data = {
          qty: totalQty,
          amount_of_buy: totalPrice,
          user_id: authUser.id,
          items: borrow?.borrow,
          note: "ClientSite user borrow book",
          return_date: returnAfterDate,
          borrow_or_buy: borrowOrBuy,
        };



        const result = await itemRentCreateClient(data).unwrap();

        setBorrowOrBuy("borrow");

        handleClose();
        dispatch(clearBorrow());
        toast.success(result?.message);
      }
    }
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Book Borrow Cart</Modal.Title>
    
          <div className="form-check ms-5 ">
            <input className="form-check-input"   type="radio" name="borrowOrBuy" value="borrow" 
              onChange={(e) => setBorrowOrBuy(e.target.value)}
          defaultChecked

            />
            <label className="form-check-label" >
              Borrow
            </label>
          </div>
          <div className="form-check ms-5">
            <input   className="form-check-input"  type="radio" name="borrowOrBuy"  value="buy"
              onChange={(e) => setBorrowOrBuy(e.target.value)}
            />
            <label className="form-check-label" >
             Buy
            </label>
          </div>
          
        
         
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
                      <th scope="col"
                      className={borrowOrBuy === "buy" ? "d-none" : ""}
                      >Return Date</th>
                      <th scope="col"
                      className={borrowOrBuy === "buy" ? "" : "d-none"}
                      >Price</th>
                      <th scope="col">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {borrow?.borrow?.map((book, i) => (
                      <tr key={i}>
                        <td className="w-25">
                          <img
                            src={`${import.meta.env.VITE_FILE_URL}/${book?.photo
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
                        <td
                          className={borrowOrBuy === "buy" ? "d-none" : "pt-4"}
                        >
                          <input
                            className="form-control"
                            type="date"
                            name="return_date"
                            onChange={
                              (e) => dispatch(returnDate({ id: book?.id, return_date: e.target.value }))
                            }
                            defaultValue={
                              returnAfterDate
                            }

                          />
                        </td>
                        <td
                          className={borrowOrBuy === "buy" ? "" : "d-none"}
                        >
                          <span className="price text-success">
                           <TbCurrencyTaka/> {book?.price} Tk
                          </span>
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
                <div className=" d-flex justify-content-end" >



                  <div className="col-6 border  ">
                      <table className="table table-white table-striped">
                        <thead>
                          <tr>
                            <th scope="col">Total item :</th>
                            <th scope="col">{totalQty}</th>
                          </tr>
                   
                   
                        <tr className={
                          borrowOrBuy === "buy" ? "" : "d-none"
                          }>
                            <th scope="col">Total Amount :</th>
                            <th scope="col"><TbCurrencyTaka />{totalPrice} Tk</th>
                          </tr>
                        </thead>
                      </table>
                    </div>






                </div>

              </div>
              <div className="modal-footer border-top-0 ">
                <Button variant="dark" onClick={handleClose}>
                  Close
                </Button>
                <button
                  type="submit"
                  className={borrowOrBuy === "borrow" ? "btn btn-success" : "d-none"}
                onClick={submitHandler}
                >
                  Borrow Now
                </button>
                <button
        
                  className={borrowOrBuy === "buy" ? "btn btn-success" : "d-none"}
                // onClick={submitHandler}
                >
                  Buy Now
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
