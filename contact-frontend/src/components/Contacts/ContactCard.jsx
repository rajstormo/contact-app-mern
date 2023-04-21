import { BiUser, BiPhone } from "react-icons/bi";
import { AiOutlineMail } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import { useState } from "react";
import DeleteModal from "../DeleteModal";
import EditModal from "../EditModal";

const ProfileCard = ({ contact, onContactDelete, onContactUpdate}) => {
  const { profilePic, name, email, contactNo } = contact;

  // show edit and delete icons only on hover
  const [showIcons, setShowIcons] = useState(false);

  // show modal for deleting contact
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  // const deleteContact
  const handleModalClose = (id) => {
    if (id) 
      onContactDelete(id);
    setShowDeleteModal(false);
  };

  const handleEditModalClose = (id, newContactDetails) => {
    setShowEditModal(false);
    if (id && newContactDetails)
      onContactUpdate(id, newContactDetails);
  }

  return (
    <>
      {showDeleteModal && (
        <DeleteModal
          title="Delete Contact"
          message="Are you sure you want to delete this contact?"
          id={contact._id}
          onModalClose={handleModalClose}
        />
      )}

      {showEditModal && (
        <EditModal contact = {contact} onEditModalClose={handleEditModalClose} />
      )}

      <li
        onMouseOver={() => setShowIcons(true)}
        onMouseOut={() => setShowIcons(false)}
        className="bg-white shadow-md rounded-lg p-4 w-[250px] border"
      >
        <div className="flex justify-between">
          <img
            src={profilePic}
            alt="Profile Picture"
            className="w-32 h-32 rounded-full mx-auto mb-4"
          />
          {showIcons && (
            <div className="flex flex-col space-y-5 items-center">
              <FiEdit onClick={() => setShowEditModal(true)} className="text-xl hover:cursor-pointer" />
              <MdDelete
                onClick={() => setShowDeleteModal(true)}
                className="text-2xl hover:cursor-pointer"
              />
            </div>
          )}
        </div>

        <div>
          <div className="flex items-center space-x-2">
            <BiUser />
            <h2 className="text-2xl font-bold">{name}</h2>
          </div>
          <div className="flex items-center space-x-2">
            <AiOutlineMail />
            <p className="text-gray-600">{email}</p>
          </div>
          <div className="flex items-center space-x-2">
            <BiPhone />
            <p className="text-gray-600">{contactNo}</p>
          </div>
        </div>
      </li>
    </>
  );
};

export default ProfileCard;
