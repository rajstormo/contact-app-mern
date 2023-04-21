import { useState, useEffect } from "react";
import { GrClose } from "react-icons/gr";
import { uploadImageToCloudinary, updateContact } from "../utils/api";
import { toast } from "react-toastify";

const EditModal = ({ contact, onEditModalClose }) => {
  const [contactDetails, setContactDetails] = useState({
    email: contact.email,
    name: contact.name,
    contactNo: contact.contactNo,
    profilePic: contact.profilePic,
  });

  const [image, setImage] = useState("");
  const [profilePicUpdated, setProfilePicUpdated] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContactDetails({ ...contactDetails, [name]: value });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
    console.log(image);
  };

  useEffect(() => {
    console.log("called useEffect()");
    if (profilePicUpdated) {
      updateContact(contact._id, contactDetails).then((result) => {
        console.log("called");
        console.log(result);
        if (result.error) toast.error(result.error);
        else {
          onEditModalClose(contact._id, contactDetails);
          toast.success("Contact updated");
        }
      });
    }
  }, [profilePicUpdated]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // if profile pic has been updated
      if (image) {
        console.log(image)
        const imageUrl = await uploadImageToCloudinary(image);
        if (!imageUrl) {
          toast.error("something went wrong!");
          return;
        }
        setContactDetails({ ...contactDetails, profilePic: imageUrl });
        setProfilePicUpdated(true);
      }
      // if profile pic is not updated
      else {
        console.log("called")
        const result = await updateContact(contact._id, contactDetails);
        if (result.error) toast.error(result.error);
        else {
          onEditModalClose(contact._id, contactDetails);
          toast.success("Contact updated");
        } 
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {/* this div is for overlay */}
      <div
        onClick={onEditModalClose}
        className="fixed top-0 left-0 w-full h-[100vh] z-10 bg-[rgba(0,0,0,0.75)] backdrop-blur-sm"
      />
      <div className="fixed top-1/2 left-1/2 z-10 -translate-x-1/2 -translate-y-1/2 bg-gray-100 shadow-md w-[80%] p-5 transition-shadow">
        <div className="flex justify-between">
          <h2 className="text-3xl font-semibold mb-6  flex-1 text-center">
            Update Contact
          </h2>
          <GrClose
            onClick={onEditModalClose}
            className="text-2xl hover:cursor-pointer"
          />
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="profile-pic"
              className="block mb-2 text-sm font-medium text-gray-600"
            >
              Upload Image
            </label>
            <input
              type="file"
              id="profile-pic"
              name="profilePic"
              onChange={handleImageChange}
              // required
              className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:border-indigo-500"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-600"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={contactDetails.email}
              onChange={handleChange}
              placeholder="name@example.com"
              // required
              className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:border-indigo-500"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-medium text-gray-600"
            >
              Contact Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={contactDetails.name}
              onChange={handleChange}
              placeholder="Rajkumar"
              // required
              className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:border-indigo-500"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="phone"
              className="block mb-2 text-sm font-medium text-gray-600"
            >
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              name="contactNo"
              value={contactDetails.contactNo}
              onChange={handleChange}
              placeholder="1234567890"
              // required
              className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:border-indigo-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 transition duration-300"
          >
            Update Contact
          </button>
        </form>
      </div>
    </>
  );
};

export default EditModal;
