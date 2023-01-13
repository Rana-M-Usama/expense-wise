import {
  TextField,
  Grid,
  Container,
  Typography,
  Box,
  Button,
  Avatar,
} from '@mui/material'
import useStyles from './profile.styles'
import userImage from '../../assets/user.png'
import { Stack } from '@mui/system'

const ProfilePage = () => {
  const classes = useStyles()
  const user = {
    name: 'User',
    lastName: '1',
    email: '123@gmail.com',
    phoneNo: '123409809-',
    password: '12345',
    address:
      'daf csKDjfwrijg oidj voierhg ioerjg erugh aeurihgerouihgoaerig uaeroh gaergoaerhguioer fcgvhjknvd uifhieruh gierh gieugh iuerhguier',
    dob: '28-Aug-2022',
    country: 'Pakistan',
  }
  return (
    <Container
      component="main"
      maxWidth="md"
      className={classes.container}
      sx={{ boxShadow: 5 }}
    >
      <Stack sx={{ alignItems: 'center', p: 2 }}>
        <Avatar
          alt="Remy Sharp"
          src={userImage}
          sx={{
            width: 200,
            height: 200,
            border: '5px solid #9e9e9e70',
          }}
        />
      </Stack>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <Box className={classes.box}>
            <Typography>First Name</Typography>
            <TextField
              disabled
              className={classes.textfield}
              variant="outlined"
              inputProps={{ style: { padding: 7 } }}
              value={user.name}
            />
          </Box>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Box className={classes.box}>
            <Typography>Last Name</Typography>
            <TextField
              disabled
              className={classes.textfield}
              variant="outlined"
              inputProps={{ style: { padding: 7 } }}
              value={user.lastName}
            />
          </Box>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Box className={classes.box}>
            <Typography>Email</Typography>
            <TextField
              disabled
              className={classes.textfield}
              variant="outlined"
              inputProps={{ style: { padding: 7 } }}
              value={user.email}
            />
          </Box>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Box className={classes.box}>
            <Typography>Phone No</Typography>
            <TextField
              disabled
              className={classes.textfield}
              variant="outlined"
              value={user.phoneNo}
              inputProps={{ style: { padding: 7 } }}
              autoComplete="new-password"
            />
          </Box>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Box className={classes.box}>
            <Typography>Dob</Typography>
            <TextField
              disabled
              className={classes.textfield}
              variant="outlined"
              inputProps={{ style: { padding: 7 } }}
              value={user.dob}
            />
          </Box>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Box className={classes.box}>
            <Typography>Country</Typography>
            <TextField
              disabled
              className={classes.textfield}
              variant="outlined"
              inputProps={{ style: { padding: 7 } }}
              value={user.country}
            />
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Typography>Address</Typography>
          <TextField
            multiline
            disabled
            className={classes.textfield}
            inputProps={{ style: { padding: 7 } }}
            variant="outlined"
            fullWidth
            id="address"
            name="address"
            value={user.address}
          />
        </Grid>
        <Grid container justifyContent="center">
          <Button
            type="submit"
            sx={{ mt: 2, mb: 2 }}
            variant="contained"
            color="primary"
          >
            Update
          </Button>
        </Grid>
      </Grid>
    </Container>
  )
}

export default ProfilePage
