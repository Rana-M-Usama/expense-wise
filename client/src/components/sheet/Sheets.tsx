import {
  Button,
  Container,
  Divider,
  List,
  ListItem,
  ListItemText,
  Pagination,
  Stack,
} from "@mui/material";
import React, { ChangeEvent, useState } from "react";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import { Box } from "@mui/system";

import SheetModal from "components/sheet/SheetModal";
import usePagination from "components/sheet/Pagination";

import useStyles from "components/sheet/Sheets.styles";

const SHEETS = [
  { id: 1, name: "Sheet1", author: "currentUser" },
  { id: 2, name: "Sheet2", author: "ali" },
  { id: 3, name: "Sheet3", author: "currentUser" },
  { id: 4, name: "Sheet4", author: "zain" },
  { id: 5, name: "Sheet5", author: "currentUser" },
  { id: 6, name: "Sheet6", author: "Fahd" },
  { id: 7, name: "Sheet7", author: "currentUser" },
  { id: 8, name: "Sheet8", author: "ali" },
  { id: 9, name: "Sheet9", author: "currentUser" },
  { id: 10, name: "Sheet10", author: "ali" },
  { id: 11, name: "Sheet11", author: "currentUser" },
  { id: 12, name: "Sheet12", author: "zain" },
  { id: 13, name: "Sheet13", author: "currentUser" },
  { id: 14, name: "Sheet14", author: "Fahd" },
  { id: 15, name: "Sheet15", author: "currentUser" },
  { id: 16, name: "Sheet16", author: "ali" },
  { id: 17, name: "Sheet17", author: "currentUser" },
  { id: 18, name: "Sheet18", author: "ali" },
  { id: 19, name: "Sheet19", author: "currentUser" },
  { id: 20, name: "Sheet20", author: "zain" },
];

type Props = {
  title: string;
  button: string;
  name: string;
  description: string;
};

const Sheets = () => {
  const classes = useStyles();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalProps, setModalProps] = useState<Props>({
    title: "",
    button: "",
    name: "",
    description: "",
  });

  let [page, setPage] = useState(1);
  const [paginate] = useState(10);

  const count = Math.ceil(SHEETS.length / paginate);
  const DATA = usePagination(SHEETS, paginate);

  const handleChange = (event: ChangeEvent<unknown>, page: number) => {
    setPage(page);
    DATA.jump(page);
  };
  const showModal = (props: Props) => {
    setModalProps(props);
    setIsModalOpen(true);
  };

  const hideModal = () => setIsModalOpen(false);

  return (
    <Container maxWidth="md">
      <Stack
        direction="row"
        justifyContent="space-between"
        style={{ marginBottom: 15 }}
      >
        <Button
          onClick={() =>
            showModal({
              title: " Create Sheet",
              button: " Create",
              name: "",
              description: "",
            })
          }
        >
          <AddCircleRoundedIcon sx={{ width: 40, height: 45 }} />
        </Button>
        <SheetModal isOpen={isModalOpen} {...modalProps} onClose={hideModal} />
      </Stack>
      <List className={classes.list}>
        {DATA.currentData().map((sheet: any) => (
          <React.Fragment key={sheet.id}>
            <ListItem
              secondaryAction={
                <Box sx={{ "& button": { m: 1 } }}>
                  {sheet.author === "currentUser" ? (
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
                            title: " Update Sheet",
                            button: "Update",
                            name: "Sheet 1",
                            description: "fjgo jgtoijg atioetj oiet",
                          })
                        }
                      >
                        Edit
                      </Button>
                      <Button
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
              <ListItemText primary={sheet.name} />
            </ListItem>
            <Divider variant="inset" component="li" />
          </React.Fragment>
        ))}
      </List>
      <Box sx={{ display: "flex", justifyContent: "center", marginTop: 10 }}>
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
    </Container>
  );
};

export default Sheets;
