class ApiError extends Error {
  constructor(status, message, errors) {
    super();
    this.message = message;
    this.status = status;
    this.errors = errors;
  }

  static badRequest(message, errors = []) {
    return new ApiError(404, message, errors);
  }
  static internal(message) {
    return new ApiError(500, message);
  }
  static forbidden(message) {
    return new ApiError(403, message);
  }
  static unauthorizedError() {
    return new ApiError(401, "User is not authorized");
  }
}

module.exports = ApiError;
