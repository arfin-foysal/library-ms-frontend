import React from "react";
import PageTopHeader from './common/PageTopHeader';

const Payment = () => {
  return (
    <div>

      <PageTopHeader title="Payment" />

      <div className="card border-0 shadow-lg ">
        <div className="card-header">Quote</div>
        <div className="card-body">
          <blockquote className="blockquote mb-0">
            <p>A well-known quote, contained in a blockquote element.</p>
            <footer className="blockquote-footer">
              Someone famous in <cite title="Source Title">Source Title</cite>
            </footer>
          </blockquote>
        </div>
      </div>
    </div>
  );
};

export default Payment;
