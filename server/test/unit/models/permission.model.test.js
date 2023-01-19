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

    it("should throw a validation error if permission type is invalid", () => {
      permission.type = "inValid";
      expect(permission.validateSync().errors.type.message).toEqual(
        "`inValid` is not a valid enum value for path `type`.",
      );
    });

    it("should throw a validation error if sheet is null", () => {
      permission.sheet = null;
      expect(permission.validateSync().errors.sheet.message).toEqual(
        "Sheet is required.",
      );
    });
  });
});
