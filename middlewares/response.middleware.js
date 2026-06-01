const responseMiddleware = (req, res, next) => {
  if (res.err || res.error) {//first check if there is an error in response object
    const error = res.err || res.error;
    const message = error.message || error;
    const status = message.toLowerCase().includes("not found") ? 404 : 400;//if error message contains "not found" we return 404 status, otherwise 400
    return res.status(status).json({
      error: true,
      message: message,
    });
  }
  if (res.data !== undefined && res.data !== null) {//if there is data in response object we return it with 200 status
    return res.status(200).json(res.data);
  }
  return res.status(404).json({//if there is no data and no error we return 404 status with "Data not found" message
    error: true,
    message: "Data not found",
  });
};
export { responseMiddleware };