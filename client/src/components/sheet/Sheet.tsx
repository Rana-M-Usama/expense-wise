import React from "react"
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

const Sheet = () => {
  return (
    <>
      <Container maxWidth="md">
        <Stack
          direction="row"
          justifyContent="space-between"
          style={{ marginBottom: 15 }}
        >
          <Button>
            <AddCircleRoundedIcon sx={{ width: 40, height: 45 }} />
          </Button>
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
                        <Button variant="outlined" size="small">
                          Open
                        </Button>
                        <Button variant="outlined" size="small">
                          Edit
                        </Button>
                        <Button variant="outlined" size="small">
                          Delete
                        </Button>
                      </>
                    ) : (
                      <Button variant="outlined" size="small">
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
