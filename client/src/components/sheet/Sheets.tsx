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
} from "@mui/material";
import React, { ChangeEvent, Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import { Box } from "@mui/system";

import type { RootState } from "app/store";
import { setSheet } from "slices/sheetSlice";
import SheetModal from "components/sheet/SheetModal";
import useHttp from "utils/useHttp";
import usePagination from "components/sheet/Pagination";

import useStyles from "components/sheet/Sheets.styles";

type Props = {
  modalTitle: string;
  button: string;
  id: string;
  title: string;
  description: string;
};

const Sheets = () => {
  const dispatch = useDispatch();
  const { loading, request, error, clearError } = useHttp();
  const sheets = useSelector((state: RootState) => state.sheet.sheets);
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  let [page, setPage] = useState(1);
  const [paginate] = useState(10);
  const classes = useStyles();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalProps, setModalProps] = useState<Props>({
    modalTitle: "",
    button: "",
    id: "",
    title: "",
    description: "",
  });

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
    if (error) {
      alert(error);
      clearError();
    } else {
      dispatch(setSheet(response.data));
    }
  };

  const deleteSheet = async (id: string) => {
    await request(`/sheets/${id}`, "DELETE");

    if (!error) {
      alert("Successfully deleted sheet.");
      clearError();
      fetchData();
    }
  };

  useEffect(() => {
    fetchData();
  }, [dispatch]);

  return (
    <Container maxWidth="md">
      {loading ? (
        <CircularProgress />
      ) : (
        <>
          <Stack
            direction="row"
            justifyContent="space-between"
            style={{ marginBottom: 15 }}
          >
            <Button
              onClick={() =>
                showModal({
                  modalTitle: "Create Expense Sheet",
                  button: "Create",
                  id: "",
                  title: "",
                  description: "",
                })
              }
            >
              <AddCircleRoundedIcon sx={{ width: 40, height: 45 }} />
            </Button>
            <SheetModal
              isOpen={isModalOpen}
              {...modalProps}
              onClose={hideModal}
              fetchData={fetchData}
            />
          </Stack>
          <List className={classes.list}>
            {DATA.currentData().map((sheet: any) => (
              <Fragment key={sheet._id}>
                <ListItem
                  secondaryAction={
                    <Box sx={{ "& button": { m: 1 } }}>
                      {sheet.owner._id === currentUser.id ? (
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
                                modalTitle: "Update Expense Sheet",
                                button: "Update",
                                id: sheet._id,
                                title: sheet.title,
                                description: sheet.description,
                              })
                            }
                          >
                            Edit
                          </Button>
                          <Button
                            onClick={() => deleteSheet(sheet._id)}
                            className={classes.deleteButton}
                            variant="outlined"
                            size="small"
                          >
                            Delete
                          </Button>
                        </>
                      ) : (
                        <Button
                          className={classes.openButton}
                          variant="outlined"
                          size="small"
                        >
                          Open
                        </Button>
                      )}
                    </Box>
                  }
                >
                  <ListItemText primary={sheet.title} />
                </ListItem>
                <Divider variant="inset" component="li" />
              </Fragment>
            ))}
          </List>
          <Box
            sx={{ display: "flex", justifyContent: "center", marginTop: 10 }}
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
        </>
      )}
    </Container>
  );
};

export default Sheets;
