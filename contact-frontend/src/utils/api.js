
import cloudinary from 'cloudinary-core';
// import { CLOUD_NAME, PRESET_NAME } from "../../constants"

const BACKEND_URL =  import.meta.env.VITE_BACKEND_URL;
const CLOUD_NAME = import.meta.env.VITE_CLOUD_NAME;
const PRESET_NAME = import.meta.env.VITE_PRESET_NAME;

const cld = new cloudinary.Cloudinary({ cloud_name: CLOUD_NAME });

const checkImageExists = async (publicId) => {
  try {
    const result = await cld.v2.api.resource(publicId, { type: 'upload' });
    return result;
  } catch (error) {
    return false;
  }
};


const getAllContacts = async () => {
  try {
    const response = await fetch(`${BACKEND_URL}/api/getContacts`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    const result = await response.json();
    if (response.ok) {
      return result.contacts;
    }
  } catch (err) {
    console.log(err);
  }
};

const deleteContact = async (id) => {
  try {
    const response = await fetch(`${BACKEND_URL}/api/delete-contact/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      },
    });

    const result = await response.json();
    return result;
  }
  catch (err) {
    console.log(err);
  }
}


const updateContact = async (id, newContact) => {
  try {
    const response = await fetch(`${BACKEND_URL}/api/update-contact/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type":"application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      },
      body: JSON.stringify(newContact)
    });
    const result = await response.json();
    return result;
  }
  catch (err) {
    console.log(err);
  }

}

const createContact = async (contactDetails) => {
  try {
    const response = await fetch(`${BACKEND_URL}/api/create-contact`, {
      method: "POST",
      body: JSON.stringify(contactDetails),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    const result = await response.json();
    return result;
  }
  catch (err) {
    toast.error(err);
  }
};

const uploadImageToCloudinary = async (image) => {
  const data = new FormData();
  data.append("file", image);
  data.append("upload_preset", PRESET_NAME);
  data.append("cloud_name", CLOUD_NAME);

  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
      {
        method: "POST",
        body: data,
      }
    );
    if (response.ok) {
      const result = await response.json();
      return result.url;
    }
  } catch (err) {
    console.log(err);
  }
};


export { getAllContacts, deleteContact, uploadImageToCloudinary, createContact, updateContact };
