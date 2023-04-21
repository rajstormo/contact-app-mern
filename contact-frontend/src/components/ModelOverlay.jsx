import React from "react";

const ModalOverlay = ({ isOpen, onClose }) => {
  return (
    <>
      {/* this div is for overlay */}
      <div
        onClick={closeErrorModal}
        className="fixed top-0 left-0 w-full h-[100vh] z-10 bg-[rgba(0,0,0,0.75)] backdrop-blur-md"
      />
      <Card class="fixed top-1/2 left-1/2 z-10 -translate-x-1/2 -translate-y-1/2 w-[30%]">
        <header className="bg-red-600 px-4 py-2 rounded-t-lg">
          <h2 className="font-bold text-2xl text-white"> {props.title} </h2>
        </header>
        <div className="px-4 py-5">
          <p>{props.message}</p>
        </div>
        <footer className="px-10 pb-5">
          <Button onClick={closeErrorModal}>Okay</Button>
        </footer>
      </Card>
    </>
  );
};

export default ModalOverlay;
