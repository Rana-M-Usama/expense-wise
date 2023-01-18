import { beforeEach, describe, expect, it } from "@jest/globals";

import PermissionFactory from "../../factories/permission.factory";

describe("Permission model", () => {
  describe("validation", () => {
    let permission;

    beforeEach(() => {
      permission = PermissionFactory();
    });

    it("should correctly validate a valid Permission", () => {
      expect(permission.validateSync()).toEqual(undefined);
    });

    it("should throw a validation error if user is null", () => {
      permission.user = null;
      expect(permission.validateSync().errors.user.message).toEqual(
        "User is required.",
      );
    });

    it("should throw a validation error if sheet is null", () => {
      permission.sheet = null;
      expect(permission.validateSync().errors.sheet.message).toEqual(
        "Sheet is required.",
      );
    });

    it("should throw a validation error if both sheet and user are null", () => {
      permission.user = null;
      permission.sheet = null;
      expect(permission.validateSync().errors.user.message).toEqual(
        "User is required.",
      );
      expect(permission.validateSync().errors.sheet.message).toEqual(
        "Sheet is required.",
      );
    });
  });
});
