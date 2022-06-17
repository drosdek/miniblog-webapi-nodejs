module.exports = errorHandler;

function errorHandler(err, req, res, next) {
  if (typeof err === "string") {
    // custom application error
    return res.status(400).json({ message: err });
  }

  if (err.name === "ValidationError") {
    // mongoose validation error
    return res.status(400).json({ message: err.message });
  }

  if (err.name === "UnauthorizedError") {
    // jwt authentication error
    return res.status(401).json({ message: "Invalid Token" });
  }

  if (err.name === "NotFoundError") {
    // 404 not found
    return res.status(404).json({ message: "Request " + req.url + " " + err.message });
  }

  // default to 500 server error
  return res.status(500).json({ message: err.message });
}
