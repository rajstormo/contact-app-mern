const BACKEND_URL =  import.meta.env.VITE_BACKEND_URL;

const checkUserLoginStatus = async () => {
  try {
    const response = await fetch(`${BACKEND_URL}/api/login-status`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    const result = await response.json();
    return result;
  } catch (err) {
    console.log(err);
  }
};

export {checkUserLoginStatus}