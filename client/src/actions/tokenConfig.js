export const tokenConfig = getState => {
  // Get token from localstorage
  const token = getState().auth.token;

  const config = {
    headers: {
      "Content-type": "application/json"
    }
  };

  // If token, add to headers
  if (token) {
    config.headers["Authorization"] = "Bearer " + token;
  }

  return config;
};
