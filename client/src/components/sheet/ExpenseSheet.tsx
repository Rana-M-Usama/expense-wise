import {
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Pagination,
  Table,
  TableBody,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React, { ChangeEvent, MouseEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { MoodBad as NoExpensesFoundIcon } from "@mui/icons-material";
import { useParams } from "react-router-dom";

import {
  addExpense,
  modifyExpense,
  removeExpense,
  setExpenses,
} from "slices/expenseSlice";
import ConfirmationModal from "components/common/confirmation/modal";
import ExpenseModal from "components/expense/ExpenseModal";
import type { RootState } from "app/store";
import Toast from "components/tostify/Toast";
import useHttp from "utils/useHttp";
import usePagination from "components/common/pagination/Pagination";

import {
  AmountBox,
  StyledTableCell,
  StyledTableRow,
  useStyles,
} from "components/sheet/ExpenseSheet.styles";

const headerRow = {
  "heading 1": "Title",
  "heading 2": "Type",
  "heading 3": "IN/OUT",
  "heading 4": "Status",
  "heading 5": "Amount",
  "heading 6": "Action",
};

type Response = {
  idValue: string;
  titleValue: string;
  typeValue: string;
  amountValue: number;
  statusValue: string;
  amountTypeValue: string;
};

type Props = Response & {
  isUpdate: boolean;
};

const ExpenseSheet = () => {
  const initialProps = {
    idValue: "",
    titleValue: "",
    typeValue: "",
    amountValue: 0,
    statusValue: "",
    amountTypeValue: "",
    isUpdate: false,
  };
  const classes = useStyles();
  const dispatch = useDispatch();
  const { loading, request, error, clearError } = useHttp();
  let { id } = useParams();

  const expenseUrl = `/sheets/${id}/expenses/`;
  const expenses = useSelector((state: RootState) => state.expense.expenses);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalProps, setModalProps] = useState<Props>(initialProps);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [expenseId, setExpenseId] = useState("");
  const [sheetName, setSheetName] = useState("");
  const [sheetOption, setSheetOption] = useState<null | Element>(null);
  const [sheetBalance, setSheetBalance] = useState({
    pendingAmount: null,
    receivedAmount: null,
    spentAmount: null,
    totalAmount: null,
  });
  let [page, setPage] = useState(1);
  const [paginate] = useState(10);
  const count = Math.ceil(expenses.length / paginate);
  const paginatedExpenses = usePagination(expenses, paginate);

  const handleChange = (event: ChangeEvent<unknown>, page: number) => {
    setPage(page);
    paginatedExpenses.jump(page);
  };

  const createExpense = async (body: object) => {
    const response = await request(expenseUrl, "POST", body);

    if (!error) {
      Toast("success", "Successfully expense created.");
      dispatch(addExpense({ data: response.data }));
    }
  };

  const deleteExpense = async (expenseId: string) => {
    const response = await request(expenseUrl.concat(expenseId), "DELETE");

    if (!error) {
      Toast("success", "Successfully expense deleted.");
      dispatch(removeExpense({ data: response.data, id: expenseId }));
    }
  };

  const updateExpense = async (body: object, expenseId: string) => {
    const response = await request(expenseUrl.concat(expenseId), "PUT", body);

    if (!error) {
      Toast("success", "Successfully expense updated.");
      dispatch(modifyExpense({ data: response.data, id: expenseId }));
    }
  };

  const fetchSheet = async () => {
    const response = await request(`/sheets/${id}`, "GET");

    if (!error) {
      setSheetBalance(response.data.amounts);
      setSheetName(response.data.title);
    }
  };

  const fetchExpenses = async () => {
    const response = await request(expenseUrl, "GET");

    if (!error) {
      dispatch(setExpenses({ data: response.data }));
    }
  };

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setSheetOption(event.currentTarget as Element);
  };

  const handleClose = () => {
    setSheetOption(null);
  };

  const showModal = (props: Props) => {
    setModalProps(props);
    setIsModalOpen(true);
  };

  const hideModal = () => {
    setModalProps(initialProps);
    setIsModalOpen(false);
  };

  const showConfirmationModal = ({ expenseId }: { expenseId: string }) => {
    setExpenseId(expenseId);
    setIsConfirmationModalOpen(true);
  };

  const hideConfirmationModal = () => {
    setIsConfirmationModalOpen(false);
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  useEffect(() => {
    fetchSheet();
  }, [expenses]);

  useEffect(() => {
    if (error) {
      Toast("danger", error);
      clearError();
    }
  }, [error]);

  return (
    <Container maxWidth="md">
      {loading && !expenses ? (
        <CircularProgress />
      ) : (
        <>
          <ExpenseModal
            isOpen={isModalOpen}
            {...modalProps}
            onClose={hideModal}
            onSubmit={(data: Response) => {
              const body = {
                title: data.titleValue,
                type: data.typeValue,
                status: data.statusValue,
                amount: data.amountValue,
                amountType: data.amountTypeValue,
              };
              if (data.idValue === "") {
                createExpense(body);
                hideModal();
              } else {
                updateExpense(body, data.idValue);
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
                deleteExpense(expenseId);
              }
            }}
          />
          <Box
            sx={{
              marginBottom: "300px",
            }}
          >
            <Typography
              sx={{ mb: 5, display: "flex", justifyContent: "center" }}
              variant="h4"
            >
              {sheetName}
            </Typography>
            <Box display="flex" justifyContent="space-between">
              <Button
                className={classes.addExpense}
                sx={{ mb: 2 }}
                variant="outlined"
                size="small"
                onClick={() => showModal({ ...modalProps })}
              >
                Add expense
              </Button>

              <IconButton
                aria-controls="simple-menu"
                aria-haspopup="true"
                onClick={handleClick}
              >
                <MoreVertIcon />
              </IconButton>

              <Menu
                id="simple-menu"
                anchorEl={sheetOption}
                keepMounted
                open={Boolean(sheetOption)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Delete Sheet</MenuItem>
                <MenuItem onClick={handleClose}>Sheet Permissions</MenuItem>
              </Menu>
            </Box>
            {expenses.length === 0 ? (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Box sx={{ display: "flex" }}>
                  <Typography variant="h5">No Expense to Show</Typography>
                  <NoExpensesFoundIcon
                    fontSize="large"
                    sx={{ ml: 1, paddingBottom: 5 }}
                  />
                </Box>
              </Box>
            ) : (
              <>
                <div
                  style={{ height: expenses.length === 0 ? "300px" : "auto" }}
                >
                  <Table
                    aria-label="customized table"
                    sx={{ minWidth: 650, mb: 5 }}
                    size="small"
                  >
                    <TableHead>
                      <TableRow>
                        {Object.values(headerRow).map(heading => (
                          <StyledTableCell key={heading} align="center">
                            {heading}
                          </StyledTableCell>
                        ))}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {paginatedExpenses.currentData().map((expense: any) => (
                        <StyledTableRow key={expense._id}>
                          <StyledTableCell component="th" scope="row">
                            {expense.title}
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            {expense.type}
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            {expense.amountType}
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            {expense.status}
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            {expense.amount}
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            <IconButton
                              aria-label="edit"
                              onClick={() =>
                                showModal({
                                  idValue: expense._id,
                                  titleValue: expense.title,
                                  typeValue: expense.type,
                                  amountValue: expense.amount,
                                  statusValue: expense.status,
                                  amountTypeValue: expense.amountType,
                                  isUpdate: true,
                                })
                              }
                            >
                              <EditIcon />
                            </IconButton>
                            <IconButton
                              aria-label="delete"
                              onClick={() => {
                                showConfirmationModal({
                                  expenseId: expense._id,
                                });
                              }}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </StyledTableCell>
                        </StyledTableRow>
                      ))}
                    </TableBody>
                  </Table>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      marginTop: 10,
                      marginBottom: 5,
                    }}
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
                </div>
                <Grid
                  container
                  spacing={{ xs: 2, md: 3 }}
                  columns={{ xs: 8, sm: 16, md: 16 }}
                >
                  <Grid item xs={2} sm={4} md={4} style={{ width: "20%" }}>
                    <AmountBox>
                      Recieved: {sheetBalance.receivedAmount}
                    </AmountBox>
                  </Grid>
                  <Grid item xs={2} sm={4} md={4} style={{ width: "20%" }}>
                    <AmountBox>
                      Remaining: {sheetBalance.pendingAmount}
                    </AmountBox>
                  </Grid>
                  <Grid item xs={2} sm={4} md={4} style={{ width: "20%" }}>
                    <AmountBox>Total: {sheetBalance.totalAmount}</AmountBox>
                  </Grid>
                  <Grid item xs={2} sm={4} md={4} style={{ width: "20%" }}>
                    <AmountBox>Spent: {sheetBalance.spentAmount}</AmountBox>
                  </Grid>
                </Grid>
              </>
            )}
          </Box>
        </>
      )}
    </Container>
  );
};

export default ExpenseSheet;
