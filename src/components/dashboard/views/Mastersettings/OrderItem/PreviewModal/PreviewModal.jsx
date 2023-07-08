import { useRef, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import logo from '../../../../../../assets/logo/logo.png';
import { useReactToPrint } from 'react-to-print';

function PreviewModal({ show, handleClose, data }) {
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        documentTitle: 'Invoice',
        onAfterPrint: handleClose
    });

  

    //today 
    const today = new Date();
    const date =  today.getDate()+'/'+(today.getMonth() + 1) + '/' +  today.getFullYear() ;
    

    return (
        <>


            <Modal show={show} onHide={handleClose} size='xl'>
                <Modal.Header closeButton>

                </Modal.Header>
                <Modal.Body>

                    <div className="container">

                        <div className="card" ref={componentRef}>
                            <div className="card-header bg-dark text-white text-center">
                                <p className='p-0 m-0'>I N V O I C E</p>



                            </div>

                            <p className='m-2'> <b>Date:</b> {date}</p>

                            {/* date */}
                            
                            <div>
                               

                          </div>


                            <div className="card-body">
                                <div className="row mb-4">
                                    <div className="col-sm-6">
                                       

                                       



                                        <div>
                                            <strong className=' text-capitalize'>{
                                                data?.vendor_name
                                            }</strong>
                                        </div>
                                        
                                        <div>{data?.vendor_office_address}</div>
                                        <div>Email: { data?.vendor_email}</div>
                                        <div>Phone: { data?.vendor_mobile}</div>
                                    </div>

                                    <div className="col-sm-6">
                                        <div className=' d-flex  justify-content-end mt-4'>
                                            <img src={logo} width={200} alt="" />
                                        
                                        </div>
                                        <div className=' d-flex  justify-content-end mt-4' >
                                        <table >
                                            <tr>
                                                <th><span >Invoice #</span></th>
                                                    <td><span  className='ms-1' >{ data?.invoice_no}</span></td>
                                            </tr>
                                            <tr>
                                                <th><span >Order No:</span></th>
                                                    <td><span  className='ms-1' >{data?.order_no}</span></td>
                                            </tr>
                           
                                            <tr>
                                                <th><span >Received Date :</span></th>
                                                    <td><span  className='ms-1' >{ data?.received_date}</span></td>
                                            </tr>
                                  
                                        </table>
                                        </div>

                                 

                                    </div>




                                </div>

                                <div className="table-responsive-sm ">
                                    <table className="table table-striped border">
                                        <thead>
                                            <tr>
                                                <th className="center">#</th>
                                                <th>Item</th>
                                                <th>ISBN</th>

                                                <th className="right">Edition</th>
                                                <th className="center">Quantity</th>
                                                <th className="right">Item Price</th>
                                                <th className="right">Total Price</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                data?.items?.map((item, index) => (
                                                    <tr key={index}>
                                                        <td className="center">{index + 1}</td>
                                                        <td className="left strong">{item?.item_name}</td>
                                                        <td className="left">{item?.isbn}</td>
                                                        <td className="right">{item?.edition}</td>
                                                        <td className="center">{item?.item_qty}</td>
                                                        <td className="right">{item?.item_price}</td>
                                                        <td className="right">{item?.total_price}</td>



                                                    </tr>
                                                ))
                                            }

                                        </tbody>
                                    </table>
                                </div>
                                <div className="row d-flex justify-content-end">


                                    <div className="col-lg-4 col-sm-5 ml-auto">
                                        <table className="table table-clear">
                                            <tbody>
                                                <tr>
                                                    <td className="left">
                                                        <strong>Total Quantity</strong>
                                                    </td>
                                                    <td className="right">{data?.total_qty}</td>
                                                </tr>
                                                <tr>
                                                    <td className="left">
                                                        <strong>Subtotal</strong>
                                                    </td>
                                                    <td className="right">{data?.sub_total}</td>
                                                </tr>
                                                <tr>
                                                    <td className="left">
                                                        <strong>Discount</strong>
                                                    </td>
                                                    <td className="right">{data?.discount}</td>
                                                </tr>

                                                <tr>
                                                    <td className="left">
                                                        <strong>Total</strong>
                                                    </td>
                                                    <td className="right">
                                                        <strong>{data?.total_amount}</strong>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>

                                    </div>

                                </div>

                            </div>
                        </div>
                    </div>



                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={
                        handlePrint
                    }>PRINT</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default PreviewModal;