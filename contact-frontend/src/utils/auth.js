
const checkUserLoginStatus = async () => {
  try {
    const response = await fetch("http://localhost:3001/api/login-status", {
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