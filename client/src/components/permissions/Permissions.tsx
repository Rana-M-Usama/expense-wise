import {
  Box,
  Button,
  Container,
  IconButton,
  Pagination,
  Table,
  TableBody,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React, { ChangeEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import {
  addPermission,
  modifyPermission,
  removePermission,
  setPermissions,
} from "slices/permissionSlice";
import ConfirmationModal from "components/common/confirmation/modal";
import PermissionModal from "components/permissions/PermissionModal";
import type { RootState } from "app/store";
import Toast from "components/tostify/Toast";
import useHttp from "utils/useHttp";
import usePagination from "components/common/pagination/Pagination";

import {
  StyledTableCell,
  StyledTableRow,
  useStyles,
} from "components/permissions/Permissions.styles";
import { styles } from "constants/styles";

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
  const permissions = useSelector(
    (state: RootState) => state.permission.permissions,
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, request, error, clearError } = useHttp();
  const { sheetId } = useParams<{ sheetId: string | undefined }>();
  const [permissionId, setPermissionId] = useState("");
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [sheetPermissionType, setSheetPermissionType] = useState("");
  let [page, setPage] = useState(1);
  const [paginate] = useState(10);
  const count = Math.ceil(permissions.length / paginate);
  const paginatedPermissions = usePagination(permissions, paginate);

  const handleChange = (event: ChangeEvent<unknown>, page: number) => {
    setPage(page);
    paginatedPermissions.jump(page);
  };

  const fetchSheet = async () => {
    const response = await request(`/sheets/${sheetId}`, "GET");

    if (!error) {
      setSheetPermissionType(response.data.permissionType);
    }
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

  const fetchPermissions = async () => {
    const response = await request(`/sheets/${sheetId}/permissions`, "GET");

    if (!error) {
      dispatch(setPermissions(response.permissions));
    }
  };

  const checkEmailExist = (email: string) => {
    const checkUsername = (obj: any) => obj.user.email === email;
    return permissions.some(checkUsername);
  };

  const updatePermission = async (body: any, permissionId: string) => {
    if (permissionId === "" && checkEmailExist(body.userEmail)) {
      Toast("danger", "Permission with this email already created.");
    } else {
      const response = await request(
        `/sheets/${sheetId}/permissions`,
        "POST",
        body,
      );

      if (!error) {
        hideModal();
        if (permissionId === "") {
          Toast("success", "Permission created successfully.");
          dispatch(addPermission({ data: response.data }));
        } else {
          Toast("success", "Permission updated successfully.");
          dispatch(modifyPermission({ data: response.data, id: permissionId }));
        }
      }
    }
  };

  const deletePermission = async (permissionId: string) => {
    const response = await request(
      `/sheets/${sheetId}/permissions/${permissionId}`,
      "DELETE",
    );

    if (!error) {
      hideConfirmationModal();
      Toast("success", "Permission deleted successfully.");
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

  useEffect(() => {
    fetchSheet();
    fetchPermissions();
  }, []);

  useEffect(() => {
    if (error) {
      Toast("danger", error);
      clearError();
    }
  }, [error]);

  return (
    <>
      <Container maxWidth="md">
        <PermissionModal
          loading={loading}
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
            } else {
              updatePermission(body, data.idValue);
            }
          }}
        />
        <ConfirmationModal
          loading={loading}
          isOpen={isConfirmationModalOpen}
          {...modalProps}
          onClose={hideConfirmationModal}
          onSubmit={(data: boolean) => {
            if (data === true) {
              deletePermission(permissionId);
            }
          }}
        />
        <Box sx={{ textAlign: "center", my: 5 }}>
          <IconButton
            sx={{
              float: "left",
              width: 35,
              height: 40,
              color: styles.theme.primaryColor,
            }}
            onClick={() => {
              navigate(`/sheets/${sheetId}/expenses`);
            }}
          >
            <ArrowBackIosNewIcon />
          </IconButton>
          <Typography variant="h4" sx={{ overflowWrap: "break-word" }}>
            Permissions for {permissions[0]?.sheet?.title}
          </Typography>
        </Box>
        <Button
          className={classes.addExpense}
          sx={{ mb: 2 }}
          variant="outlined"
          size="small"
          onClick={() => {
            let options = ["view"];
            if (sheetPermissionType === "edit") {
              options.push("edit");
            } else if (sheetPermissionType === "admin") {
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
        <Table aria-label="customized table" sx={{ mb: 5 }} size="small">
          <TableHead>
            <TableRow>
              {Object.values(
                sheetPermissionType === "admin"
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
            {paginatedPermissions.currentData().map((permission: any) => (
              <StyledTableRow key={permission._id}>
                <StyledTableCell component="th" scope="row">
                  {permission.type}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {permission.user.email}
                </StyledTableCell>

                {(() => {
                  if (sheetPermissionType === "admin") {
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
        {count > 1 && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              marginTop: 5,
              marginBottom: 5,
            }}
          >
            <Pagination
              count={count}
              size="large"
              page={page}
              variant="outlined"
              shape="rounded"
              onChange={handleChange}
              color="primary"
            />
          </Box>
        )}
      </Container>
    </>
  );
};

export default Permissions;
