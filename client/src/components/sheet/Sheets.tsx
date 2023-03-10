import {
  Button,
  Container,
  Pagination,
  Skeleton,
  Stack,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import {
  Delete as DeleteIcon,
  Edit as EditIcon,
  MoodBad as NoExpensesFoundIcon,
  Visibility as VisibilityIcon,
} from "@mui/icons-material";
import React, { ChangeEvent, Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box } from "@mui/system";
import { Link } from "react-router-dom";

import {
  addSheet,
  modifySheet,
  removeSheet,
  setSheets,
} from "slices/sheetSlice";
import {
  StyledLinkTableRow,
  StyledTableCell,
  StyledTableRow,
} from "components/sheet/ExpenseSheet.styles";
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

const headerRow = {
  "heading 1": "Title",
  "heading 2": "Description",
  "heading 3": "Action",
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
  const [pageLoading, setPageLoading] = useState(false);
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
    setPageLoading(true);
    const response = await request("/sheets?limit=-1", "GET");
    setPageLoading(false);
    if (!error) {
      dispatch(setSheets(response.data));
    }
  };

  const createSheet = async (body: object) => {
    const response = await request("/sheets", "POST", body);

    if (!error) {
      hideModal();
      Toast("success", "Sheet created successfully.");
      dispatch(addSheet({ data: response.data }));
    }
  };

  const deleteSheet = async (sheetId: string) => {
    await request(`/sheets/${sheetId}`, "DELETE");

    if (!error) {
      hideConfirmationModal();
      Toast("success", "Sheet deleted successfully.");
      dispatch(removeSheet({ id: sheetId }));
    }
  };

  const updateSheet = async (body: object, sheetId: string) => {
    const response = await request(`/sheets/${sheetId}`, "PUT", body);

    if (!error) {
      hideModal();
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
    } else {
      updateSheet(body, data.idValue);
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
    <>
      <Container maxWidth="md">
        <SheetModal
          loading={loading}
          isOpen={isModalOpen}
          {...modalProps}
          onClose={hideModal}
          onSubmit={handleSubmit}
        />
        <ConfirmationModal
          loading={loading}
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
          sx={{ mt: 5, display: "flex", justifyContent: "center" }}
          variant="h4"
        >
          Your Sheets
        </Typography>
        <Stack
          direction="row"
          justifyContent="space-between"
          style={{ marginBottom: 15 }}
        >
          <Button
            className={classes.addSheet}
            variant="outlined"
            size="small"
            onClick={() => showModal({ ...initialProps })}
          >
            Add new Sheet
          </Button>
        </Stack>
        <Box className={classes.tableContainer}>
          <TableContainer sx={{ overflowX: "auto" }}>
            <Table aria-label="customized table" size="small">
              <TableHead>
                <TableRow>
                  {Object.values(headerRow).map((heading, index) => (
                    <StyledTableCell
                      key={heading}
                      sx={{
                        minWidth: "100px",
                        pl: `${index === 2 ? "100px" : ""}`,
                      }}
                    >
                      {heading}
                    </StyledTableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {pageLoading ? (
                  <StyledTableRow className={classes.list}>
                    <StyledTableCell colSpan={3}>
                      <Box sx={{ width: "100%" }}>
                        {Array(15)
                          .fill(0)
                          .map((_, index) => {
                            return <Skeleton height={28} key={index} />;
                          })}
                      </Box>
                    </StyledTableCell>
                  </StyledTableRow>
                ) : sheets.length > 0 ? (
                  paginatedSheets.currentData().map((sheet: any) => (
                    <StyledLinkTableRow
                      to={`/sheets/${sheet._id}/expenses`}
                      key={sheet._id}
                    >
                      <StyledTableCell
                        sx={{
                          maxWidth: "150px",
                          overflowWrap: "break-word",
                          minWidth: "100px",
                        }}
                      >
                        {sheet.title}
                      </StyledTableCell>
                      <StyledTableCell
                        sx={{
                          maxWidth: "150px",
                          overflowWrap: "break-word",
                          minWidth: "100px",
                        }}
                      >
                        {sheet.description}
                      </StyledTableCell>
                      <StyledTableCell sx={{ width: "230px" }}>
                        <Box className={classes.buttonGroup}>
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
                                onClick={e => {
                                  e.preventDefault();
                                  showModal({
                                    idValue: sheet._id,
                                    titleValue: sheet.title,
                                    descriptionValue: sheet.description,
                                    isUpdate: true,
                                  });
                                }}
                              >
                                <EditIcon sx={{ width: 20, height: 25 }} />
                              </Button>
                              <Button
                                onClick={e => {
                                  e.preventDefault();
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
                                className={classes.disabledButton}
                                variant="outlined"
                                size="small"
                                disabled
                              >
                                <DeleteIcon sx={{ width: 20, height: 25 }} />
                              </Button>
                            </>
                          )}
                          {sheet.permissionType === "view" && (
                            <>
                              <Button
                                className={classes.disabledButton}
                                variant="outlined"
                                size="small"
                                disabled
                              >
                                <EditIcon sx={{ width: 20, height: 25 }} />
                              </Button>
                              <Button
                                className={classes.disabledButton}
                                variant="outlined"
                                size="small"
                                disabled
                              >
                                <DeleteIcon sx={{ width: 20, height: 25 }} />
                              </Button>
                            </>
                          )}
                        </Box>
                      </StyledTableCell>
                    </StyledLinkTableRow>
                  ))
                ) : (
                  <StyledTableRow className={classes.list}>
                    <StyledTableCell colSpan={3}>
                      <Box sx={{ display: "flex", justifyContent: "center" }}>
                        <Typography variant="h5">No Sheet Available</Typography>
                        <NoExpensesFoundIcon
                          fontSize="large"
                          sx={{ ml: 1, paddingBottom: 5 }}
                        />
                      </Box>
                    </StyledTableCell>
                  </StyledTableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
        {count > 1 && (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 5, mb: 2 }}>
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

export default Sheets;
