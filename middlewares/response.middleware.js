const responseMiddleware = (req, res, next) => {
  if (res.err || res.error) {//if there is an error in the response we return the error message with the appropriate status code
    const error = res.err || res.error;//we check if the error message contains "not found" to determine if the status code should be 404 or 400
    const message = error.message || (typeof error === "string" ? error : "Unknown error");
    const status = String(message).toLowerCase().includes("not found") ? 404 : 400;//if the error message contains "not found" we return 404, otherwise we return 400
    return res.status(status).json({//we return the error message in the response body
      error: true,
      message: message,
    });
  }
  if (res.data !== undefined && res.data !== null) {//if there is data in the response we return it with status code 200
    return res.status(200).json(res.data);
  }
  return res.status(404).json({//if there is no data and no error we return a default 404 response
    error: true,
    message: "Data not found",
  });
};
export { responseMiddleware };