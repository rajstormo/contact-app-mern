import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { uploadImageToCloudinary, createContact } from "../../utils/api";
import { useNavigate } from "react-router-dom";

const CreateContact = ({onContactAdd}) => {

  const navigate = useNavigate();
  const [contactDetails, setContactDetails] = useState({
    email: "",
    name: "",
    contactNo: "",
    profilePic: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContactDetails({ ...contactDetails, [name]: value });
  };

  const [image, setImage] = useState("");

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
    console.log(image);
  };

  useEffect(() => {
    if (contactDetails.profilePic) {
      createContact(contactDetails).then(result => {
        onContactAdd(result);
        setContactDetails({ email: "", name: "", contactNo: "", profilePic:""});
        setImage("");
        toast.success(`Contact ${result.name} created`);
        // after creation of new contact, redirect to view contacts
        navigate("/view-contacts")
        if (result.error) 
          toast.error(result.error);
      })
    }
  }, [contactDetails.profilePic])


  // submit handler
  const handleSubmit = async(e) => {
    e.preventDefault();
    
    try {
      const imageUrl = await uploadImageToCloudinary(image);
      if (!imageUrl) {
        toast.error("something went wrong!");
        return;
      }
      setContactDetails({...contactDetails, profilePic:imageUrl})
    } 
    catch(err) {
      console.log(err);
    }
  };

  return (
    <div className="flex justify-center p-8 bg-gray-100 items-center h-[90vh]">
      <div className="w-full bg-white p-8 rounded-md shadow-md max-w-xl">
        <h2 className="text-3xl font-semibold mb-6 text-center">
          Create New Contact
        </h2>
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
            Create Contact
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateContact;
