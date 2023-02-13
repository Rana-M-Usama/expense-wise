import httpStatus from "http-status";

import ErrorResponse from "../../utils/errorResponse";

const expensePolicy = async (req, res, next) => {
  if (req.expense.sheet.id === req.sheet.id) {
    return next();
  }

  next(
    new ErrorResponse("You can't access this expense.", httpStatus.BAD_REQUEST),
  );
};

export default expensePolicy;
