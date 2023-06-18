import React from "react";
import { Vortex } from "react-loader-spinner";
const Loader = () => {
  return (
    <>

      <div
        className="text-center"
        style={{
          textAlign: "center",
          marginTop: "10%",
          color: "#8500ffa3",
          zIndex: "99999",
          height: "2000px",
        }}
      >
        <Vortex
          visible={true}
          height="80"
          width="80"
          ariaLabel="vortex-loading"
          wrapperStyle={{

          }}
          wrapperClass="vortex-wrapper"
          colors={['red', 'green', 'blue', 'yellow', 'orange', 'purple']}
        />
      </div>

    </>
  );
};

export default Loader;
