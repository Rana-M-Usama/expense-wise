import React, { useState } from "react"
import {
  Container,
  Button,
  Stack,
  List,
  ListItemText,
  ListItem,
  Divider,
} from "@mui/material"
import { Box } from "@mui/system"
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded"

import SheetModal from "./modal/SheetModal"
import useStyles from "./Sheet.styles"

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
]

interface Props {
  title: string
  button: string
  name: string
  description: string
}

const Sheet = () => {
  const classes = useStyles()
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [modalProps, setModalProps] = useState<Props>({
    title: "",
    button: "",
    name: "",
    description: "",
  })

  const openModal = (props: Props) => {
    setModalProps(props)
    setModalIsOpen(true)
  }

  const closeModal = () => {
    setModalIsOpen(false)
  }

  return (
    <>
      <Container maxWidth="md">
        <Stack
          direction="row"
          justifyContent="space-between"
          style={{ marginBottom: 15 }}
        >
          <Button
            onClick={() =>
              openModal({
                title: " Create Expense Sheet",
                button: " Create",
                name: "",
                description: "",
              })
            }
          >
            <AddCircleRoundedIcon sx={{ width: 40, height: 45 }} />
          </Button>
          <SheetModal
            isOpen={modalIsOpen}
            {...modalProps}
            onClose={closeModal}
          />
        </Stack>
        <List
          sx={{
            borderRadius: 3,
            bgcolor: "#eeeeee",
          }}
        >
          {SHEETS.map((sheet) => (
            <React.Fragment>
              <ListItem
                key={sheet.id}
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
                            openModal({
                              title: " Update Expense Sheet",
                              button: "Update",
                              name: "Sheet 1",
                              description:
                                "fjgo jgtoijg atioetj oiet goitjgoetjgotj go et goejteoigj ietuhgetj oetjg iethg [oetjg irejguathg oiajtg oaetgh [oietj goie",
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
      </Container>
    </>
  )
}

export default Sheet
