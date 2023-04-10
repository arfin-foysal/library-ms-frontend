import React from "react";
import PageTopHeader from './common/PageTopHeader';

const Payment = () => {
  return (
    <div>

      <PageTopHeader title="Payment" />

      <div class="card border-0 shadow-lg ">
        <div class="card-header">Quote</div>
        <div class="card-body">
          <blockquote class="blockquote mb-0">
            <p>A well-known quote, contained in a blockquote element.</p>
            <footer class="blockquote-footer">
              Someone famous in <cite title="Source Title">Source Title</cite>
            </footer>
          </blockquote>
        </div>
      </div>
    </div>
  );
};

export default Payment;
