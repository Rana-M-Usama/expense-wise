import {
  Button,
  CircularProgress,
  Container,
  Divider,
  List,
  ListItem,
  ListItemText,
  Pagination,
  Stack,
  Typography,
} from "@mui/material";
import React, { ChangeEvent, Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import { Box } from "@mui/system";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Link } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";

import {
  addSheet,
  modifySheet,
  removeSheet,
  setSheets,
} from "slices/sheetSlice";
import ConfirmationModal from "components/common/confirmation/modal";
import type { RootState } from "app/store";
import SheetModal from "components/sheet/SheetModal";
import Toast from "components/tostify/Toast";
import useHttp from "utils/useHttp";
import usePagination from "components/common/pagination/Pagination";

import useStyles from "components/sheet/Sheets.styles";

type Response = {
  idValue: string;
  titleValue: string;
  descriptionValue: string;
};

type Props = Response & {
  isUpdate: boolean;
};

const Sheets = () => {
  const initialProps = {
    idValue: "",
    titleValue: "",
    descriptionValue: "",
    isUpdate: false,
  };
  const dispatch = useDispatch();
  const { loading, request, error, clearError } = useHttp();
  const sheets = useSelector((state: RootState) => state.sheet.sheets);
  let [page, setPage] = useState(1);
  const [paginate] = useState(10);
  const classes = useStyles();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [sheetId, setSheetId] = useState("");
  const [modalProps, setModalProps] = useState<Props>(initialProps);
  const count = Math.ceil(sheets.length / paginate);
  const paginatedSheets = usePagination(sheets, paginate);

  const handleChange = (event: ChangeEvent<unknown>, page: number) => {
    setPage(page);
    paginatedSheets.jump(page);
  };

  const showModal = (props: Props) => {
    setModalProps(props);
    setIsModalOpen(true);
  };

  const hideModal = () => setIsModalOpen(false);

  const fetchData = async () => {
    const response = await request("/sheets?limit=-1", "GET");

    if (!error) {
      dispatch(setSheets(response.data));
    }
  };

  const createSheet = async (body: object) => {
    const response = await request("/sheets", "POST", body);

    if (!error) {
      Toast("success", "Sheet created successfully.");
      dispatch(addSheet({ data: response.data }));
    }
  };

  const deleteSheet = async (sheetId: string) => {
    await request(`/sheets/${sheetId}`, "DELETE");

    if (!error) {
      Toast("success", "Sheet deleted successfully.");
      dispatch(removeSheet({ id: sheetId }));
    }
  };

  const updateSheet = async (body: object, sheetId: string) => {
    const response = await request(`/sheets/${sheetId}`, "PUT", body);

    if (!error) {
      Toast("success", "Sheet updated successfully.");
      dispatch(modifySheet({ data: response.data, id: sheetId }));
    }
  };

  const showConfirmationModal = ({ sheetId }: { sheetId: string }) => {
    setSheetId(sheetId);
    setIsConfirmationModalOpen(true);
  };

  const hideConfirmationModal = () => {
    setIsConfirmationModalOpen(false);
  };

  const handleSubmit = (data: Response) => {
    const body = {
      title: data.titleValue,
      description: data.descriptionValue,
    };

    if (data.idValue === "") {
      createSheet(body);
      hideModal();
    } else {
      updateSheet(body, data.idValue);
      hideModal();
    }
  };

  useEffect(() => {
    if (error) {
      Toast("danger", error);
      clearError();
    }
  }, [error]);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Container maxWidth="md">
      {loading ? (
        <CircularProgress />
      ) : (
        <>
          <SheetModal
            isOpen={isModalOpen}
            {...modalProps}
            onClose={hideModal}
            onSubmit={handleSubmit}
          />
          <ConfirmationModal
            isOpen={isConfirmationModalOpen}
            {...modalProps}
            onClose={hideConfirmationModal}
            onSubmit={(data: boolean) => {
              if (data === true) {
                deleteSheet(sheetId);
              }
            }}
          />
          <Typography
            sx={{ mt: 5, mb: 3, display: "flex", justifyContent: "center" }}
            variant="h4"
          >
            Your Sheets
          </Typography>
          <Stack
            direction="row"
            justifyContent="space-between"
            style={{ marginBottom: 15 }}
          >
            <Button onClick={() => showModal({ ...initialProps })}>
              <AddCircleRoundedIcon sx={{ width: 40, height: 45 }} />
            </Button>
          </Stack>
          <List className={classes.list}>
            {sheets.length > 0 ? (
              paginatedSheets.currentData().map((sheet: any) => (
                <Fragment key={sheet._id}>
                  <ListItem
                    sx={{ gap: "5rem" }}
                    secondaryAction={
                      <Box sx={{ "& button": { m: 1 } }}>
                        <Link
                          to={`/sheets/${sheet._id}/expenses`}
                          style={{ textDecoration: "none" }}
                        >
                          <Button
                            className={classes.openButton}
                            variant="outlined"
                            size="small"
                          >
                            <VisibilityIcon sx={{ width: 20, height: 25 }} />
                          </Button>
                        </Link>
                        {sheet.permissionType === "admin" && (
                          <>
                            <Button
                              className={classes.editButton}
                              variant="outlined"
                              size="small"
                              onClick={() =>
                                showModal({
                                  idValue: sheet._id,
                                  titleValue: sheet.title,
                                  descriptionValue: sheet.description,
                                  isUpdate: true,
                                })
                              }
                            >
                              <EditIcon sx={{ width: 20, height: 25 }} />
                            </Button>
                            <Button
                              onClick={() => {
                                showConfirmationModal({
                                  sheetId: sheet._id,
                                });
                              }}
                              className={classes.deleteButton}
                              variant="outlined"
                              size="small"
                            >
                              <DeleteIcon sx={{ width: 20, height: 25 }} />
                            </Button>
                          </>
                        )}
                        {sheet.permissionType === "edit" && (
                          <Button
                            className={classes.editButton}
                            variant="outlined"
                            size="small"
                            onClick={() =>
                              showModal({
                                idValue: sheet._id,
                                titleValue: sheet.title,
                                descriptionValue: sheet.description,
                                isUpdate: true,
                              })
                            }
                          >
                            <EditIcon sx={{ width: 20, height: 25 }} />
                          </Button>
                        )}
                      </Box>
                    }
                  >
                    <ListItemText
                      primary={sheet.title}
                      sx={{ maxWidth: "200px", overflowWrap: "break-word" }}
                    />
                    <ListItemText
                      primary={sheet.description}
                      sx={{ maxWidth: "200px", overflowWrap: "break-word" }}
                    />
                  </ListItem>
                  <Divider variant="inset" component="li" />
                </Fragment>
              ))
            ) : (
              <Typography className={classes.sheetNotFound} variant="h5">
                No Sheet Available
              </Typography>
            )}
          </List>
          {count > 1 && (
            <Box
              sx={{ display: "flex", justifyContent: "center", marginTop: 5 }}
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
        </>
      )}
    </Container>
  );
};

export default Sheets;
