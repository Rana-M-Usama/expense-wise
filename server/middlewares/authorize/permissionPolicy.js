import httpStatus from "http-status";

import ErrorResponse from "../../utils/errorResponse";

const grantPermissionPolicy = async (req, res, next) => {
  if (
    req.user.cannotGrantViewPermission(req.body.type) ||
    req.user.cannotGrantEditPermission(req.body.type)
  ) {
    return next(
      new ErrorResponse(
        "You do not have rights to assign this permission.",
        httpStatus.NOT_FOUND,
      ),
    );
  }

  next();
};

export default grantPermissionPolicy;
