import React from "react";
import { Vortex } from "react-loader-spinner";
const Loader = () => {
  return (
    <>

      <div
        className="text-center"
        style={{
          textAlign: "center",
          color: "#8500ffa3",
          backgroundColor: "#000000a3",
          zIndex: "99999",
          width: "100%",
          height: "100%",
          position: "fixed",
          top: "0",
          left: "0",
          right: "0",
          bottom: "0",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",



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
          colors={['red', 'red', 'red', 'purple', 'purple', 'purple']}
        />
      </div>

    </>
  );
};

export default Loader;
