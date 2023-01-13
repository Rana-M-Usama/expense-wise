import {
  Box,
  Button,
  Container,
  CssBaseline,
  InputAdornment,
  TextField,
  Typography,
  Modal,
  IconButton,
} from '@mui/material'
import { Mail, CloseOutlined } from '@mui/icons-material'

import useStyles from './forgetpassword.styles'

interface Props {
  isOpen: boolean
  onClose: () => void
}

const ForgotPasswordPage: React.FC<Props> = ({ isOpen, onClose }) => {
  const classes = useStyles()

  if (!isOpen) {
    return null
  }

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        component="main"
        className={classes.modal}
        sx={{
          width: {
            lg: '40%',
            md: '60%',
            sm: '80%',
            xs: '95%',
          },
        }}
      >
        <CssBaseline />
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            justifyContent: 'end',
            alignItems: 'end',
          }}
        >
          <IconButton onClick={onClose}>
            <CloseOutlined />
          </IconButton>
        </Box>
        <Typography variant="h4">Forget Password?</Typography>
        <Typography sx={{ m: 1 }}>You can reset your password here</Typography>
        <Container>
          <Box
            component="form"
            sx={{
              border: '1px solid #f0629270',
              p: 3,
              mb: 2,
            }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              className={classes.textField}
              InputProps={{
                startAdornment: (
                  <InputAdornment disableTypography position="start">
                    <Mail />
                  </InputAdornment>
                ),
              }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              className={classes.button}
            >
              Send My Password
            </Button>
          </Box>
        </Container>
      </Box>
    </Modal>
  )
}

export default ForgotPasswordPage
