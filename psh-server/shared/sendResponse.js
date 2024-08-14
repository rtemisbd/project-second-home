const sendResponse = (res, { statusCode, success, message, data = null }) => {
  const responseData = {
    statusCode,
    success,
    message,
  };

  if (data !== null) {
    responseData.data = data;
  }

  res.status(statusCode).json(responseData);
};

export default sendResponse;
