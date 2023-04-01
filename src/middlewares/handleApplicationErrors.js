import httpStatus from "http-status";

export function handleApplicationErrors(err, req, res, next) {
  const errorMap = {
    ConflictError: httpStatus.CONFLICT,
    DuplicatedEmailError: httpStatus.CONFLICT,
    InvalidCredentialsError: httpStatus.UNAUTHORIZED,
    UnauthorizedError: httpStatus.UNAUTHORIZED,
    NotFoundError: httpStatus.NOT_FOUND,
  };

  const errorName = err.name || "InternalServerError";
  const status = errorMap[errorName] || httpStatus.INTERNAL_SERVER_ERROR;
  const message = err.message || "Internal Server Error";

  return res.status(status).json({ error: errorName, message });
}
