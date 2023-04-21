import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DeleteModal = ({title, message, onModalClose, id}) => {
  
  const closeDeleteModal = (contactId) => {
    onModalClose(contactId)
  };

  return (
    <>
      {/* this div is for overlay */}
      <div
        onClick={() => closeDeleteModal(null)}
        className="fixed top-0 left-0 w-full h-[100vh] z-10 bg-[rgba(0,0,0,0.75)] backdrop-blur-sm"
      />
      <div className="fixed top-1/2 left-1/2 z-10 -translate-x-1/2 -translate-y-1/2 w-[30%] bg-gray-100 rounded shadow-md">
        <header className="bg-red-600 px-4 py-2 rounded">
          <h2 className="font-bold text-2xl text-white"> {title} </h2>
        </header>
        <div className="px-4 py-5">
          <p>{message}</p>
        </div>
        <footer className="px-10 pb-5">
          <button onClick={() => closeDeleteModal(id)} className="bg-red-600 px-5 py-1 text-white rounded-2xl">Okay</button>
          <button onClick={() => closeDeleteModal(null)} className="bg-red-600 px-5 py-1 ml-4 text-white rounded-2xl"> Cancel </button>
        </footer>
      </div>
    </>
  );
};

export default DeleteModal;
