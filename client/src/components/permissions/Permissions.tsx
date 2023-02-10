import {
  Button,
  Container,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useParams } from "react-router-dom";

import {
  addPermission,
  modifyPermission,
  removePermission,
  setPermissions,
} from "slices/permissionSlice";
import {
  StyledTableCell,
  StyledTableRow,
  useStyles,
} from "components/permissions/Permissions.styles";
import { useDispatch, useSelector } from "react-redux";
import ConfirmationModal from "components/common/confirmation/modal";
import PermissionModal from "components/permissions/PermissionModal";
import type { RootState } from "app/store";
import Toast from "components/tostify/Toast";
import useHttp from "utils/useHttp";

const headerRow = {
  "heading 1": "Permission Type",
  "heading 2": "User",
};

type Response = {
  idValue: string;
  permissionTypeValue: string;
  emailValue: string;
};

type Props = Response & {
  sheetPermissionOptions: string[];
  isUpdate: boolean;
};

const Permissions = () => {
  const initialProps = {
    idValue: "",
    permissionTypeValue: "",
    emailValue: "",
    sheetPermissionOptions: [],
    isUpdate: false,
  };
  const dispatch = useDispatch();
  const sheets = useSelector((state: RootState) => state.sheet.sheets);
  const { request, error, clearError } = useHttp();
  const { sheetId } = useParams<{ sheetId: string | undefined }>();
  const [permissionId, setPermissionId] = useState("");
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);

  const findSheetById = (sheetId: string | undefined) => {
    return sheets.find(sheet => sheet._id === sheetId);
  };

  const sheetPermissionIsAdmin = (sheetId: string | undefined) => {
    return findSheetById(sheetId)?.permissionType === "admin" ? true : false;
  };

  const classes = useStyles();
  const [IsModalOpen, setIsModalOpen] = useState(false);
  const [modalProps, setModalProps] = useState<Props>(initialProps);

  const showModal = (props: Props) => {
    setModalProps(props);
    setIsModalOpen(true);
  };

  const hideModal = () => {
    setModalProps(initialProps);
    setIsModalOpen(false);
  };

  const fetchData = async () => {
    const response = await request(`/sheets/${sheetId}/permissions`, "GET");

    if (!error) {
      dispatch(setPermissions(response.permissions));
    }
  };

  const updatePermission = async (body: object, permissionId: string) => {
    const response = await request(
      `/sheets/${sheetId}/permissions`,
      "POST",
      body,
    );

    if (!error) {
      if (permissionId === "") {
        Toast("success", "Successfully sheet created.");
        dispatch(addPermission({ data: response.data }));
      } else {
        Toast("success", "Successfully sheet updated.");
        dispatch(modifyPermission({ data: response.data, id: permissionId }));
      }
    }
  };

  const deletePermission = async (permissionId: string) => {
    const response = await request(
      `/sheets/${sheetId}/permissions/${permissionId}`,
      "DELETE",
    );

    if (!error) {
      Toast("success", "Successfully permission deleted.");
      dispatch(removePermission({ data: response.data, id: permissionId }));
    }
  };

  const showConfirmationModal = ({
    permissionId,
  }: {
    permissionId: string;
  }) => {
    setPermissionId(permissionId);
    setIsConfirmationModalOpen(true);
  };

  const hideConfirmationModal = () => {
    setIsConfirmationModalOpen(false);
  };

  const permissions = useSelector(
    (state: RootState) => state.permission.permissions,
  );

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (error) {
      Toast("danger", error);
      clearError();
    }
  }, [error]);

  return (
    <Container maxWidth="md">
      <PermissionModal
        isOpen={IsModalOpen}
        {...modalProps}
        onClose={hideModal}
        onSubmit={(data: Response) => {
          const body = {
            userEmail: data.emailValue,
            type: data.permissionTypeValue,
          };
          if (data.idValue === "") {
            updatePermission(body, "");
            hideModal();
          } else {
            updatePermission(body, data.idValue);
            hideModal();
          }
        }}
      />
      <ConfirmationModal
        isOpen={isConfirmationModalOpen}
        {...modalProps}
        onClose={hideConfirmationModal}
        onSubmit={(data: boolean) => {
          if (data === true) {
            deletePermission(permissionId);
          }
        }}
      />
      <Typography
        sx={{ mb: 5, display: "flex", justifyContent: "center" }}
        variant="h4"
      >
        Permission {permissions[0]?.sheet?.title}
      </Typography>
      <Button
        className={classes.addExpense}
        sx={{ mb: 2 }}
        variant="outlined"
        size="small"
        onClick={() => {
          let options = ["view"];
          const type = findSheetById(sheetId)?.permissionType;
          if (type === "edit") {
            options.push("edit");
          } else if (type === "admin") {
            options.push("edit");
            options.push("admin");
          }
          showModal({
            ...modalProps,
            sheetPermissionOptions: options,
          });
        }}
      >
        Add Permission
      </Button>
      <Table
        aria-label="customized table"
        sx={{ minWidth: 650, mb: 5 }}
        size="small"
        component={Paper}
      >
        <TableHead>
          <TableRow>
            {Object.values(
              sheetPermissionIsAdmin(sheetId)
                ? { ...headerRow, ...{ "heading 3": "Action" } }
                : headerRow,
            ).map(heading => (
              <StyledTableCell key={heading} align="center">
                {heading}
              </StyledTableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {permissions.map((permission: any) => (
            <StyledTableRow key={permission._id}>
              <StyledTableCell component="th" scope="row">
                {permission.type}
              </StyledTableCell>
              <StyledTableCell align="center">
                {permission.user.email}
              </StyledTableCell>

              {(() => {
                if (sheetPermissionIsAdmin(sheetId)) {
                  return (
                    <StyledTableCell align="center">
                      <IconButton
                        aria-label="edit"
                        onClick={() =>
                          showModal({
                            idValue: permission._id,
                            permissionTypeValue: permission.type,
                            emailValue: permission.user.email,
                            sheetPermissionOptions: ["view", "edit", "admin"],
                            isUpdate: true,
                          })
                        }
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        aria-label="delete"
                        onClick={() =>
                          showConfirmationModal({
                            permissionId: permission._id,
                          })
                        }
                      >
                        <DeleteIcon />
                      </IconButton>
                    </StyledTableCell>
                  );
                }
              })()}
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  );
};

export default Permissions;
