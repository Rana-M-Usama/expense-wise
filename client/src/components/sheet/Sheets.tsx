import {
  addSheet,
  modifySheet,
  removeSheet,
  setSheets,
} from "slices/sheetSlice";
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

import ConfirmationModal from "components/common/confirmation/modal";
import type { RootState } from "app/store";
import SheetModal from "components/sheet/SheetModal";
import Toast from "components/tostify/Toast";
import useHttp from "utils/useHttp";
import usePagination from "components/sheet/Pagination";

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
  const DATA = usePagination(sheets, paginate);

  const handleChange = (event: ChangeEvent<unknown>, page: number) => {
    setPage(page);
    DATA.jump(page);
  };

  const showModal = (props: Props) => {
    setModalProps(props);
    setIsModalOpen(true);
  };

  const hideModal = () => setIsModalOpen(false);

  const fetchData = async () => {
    const response = await request("/sheets", "GET");

    if (!error) {
      dispatch(setSheets(response.data));
    }
  };

  const createSheet = async (body: object) => {
    const response = await request("/sheets", "POST", body);

    if (!error) {
      Toast("success", "Successfully sheet created.");
      dispatch(addSheet({ data: response.data }));
    }
  };

  const deleteSheet = async (sheetId: string) => {
    const response = await request(`/sheets/${sheetId}`, "DELETE");

    if (!error) {
      Toast("success", "Successfully sheet deleted.");
      dispatch(removeSheet({ data: response.data, id: sheetId }));
    }
  };

  const updateSheet = async (body: object, sheetId: string) => {
    const response = await request(`/sheets/${sheetId}`, "PUT", body);

    if (!error) {
      Toast("success", "Successfully sheet updated.");
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
            onSubmit={(data: Response) => {
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
            }}
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
              DATA.currentData().map((sheet: any) => (
                <Fragment key={sheet._id}>
                  <ListItem
                    secondaryAction={
                      <Box sx={{ "& button": { m: 1 } }}>
                        {(() => {
                          if (sheet.permissionType === "admin") {
                            return (
                              <>
                                <Button
                                  className={classes.openButton}
                                  variant="outlined"
                                  size="small"
                                >
                                  Open
                                </Button>
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
                                  Edit
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
                                  Delete
                                </Button>
                              </>
                            );
                          } else if (sheet.permissionType === "edit") {
                            return (
                              <>
                                <Button
                                  className={classes.openButton}
                                  variant="outlined"
                                  size="small"
                                >
                                  Open
                                </Button>
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
                                  Edit
                                </Button>
                              </>
                            );
                          } else if (sheet.permissionType === "view") {
                            return (
                              <Button
                                className={classes.openButton}
                                variant="outlined"
                                size="small"
                              >
                                Open
                              </Button>
                            );
                          }
                        })()}
                      </Box>
                    }
                  >
                    <ListItemText primary={sheet.title} />
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
          <Box
            sx={{ display: "flex", justifyContent: "center", marginTop: 10 }}
          >
            {count > 1 && (
              <Pagination
                count={count}
                size="large"
                page={page}
                variant="outlined"
                shape="rounded"
                onChange={handleChange}
                color="primary"
              />
            )}
          </Box>
        </>
      )}
    </Container>
  );
};

export default Sheets;
