import React from 'react'
import {
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Grid,
  Box,
  Container,
} from '@mui/material'

import useStyles from './signup.styles'
import logo from '../../assets/logo.png'

const SignupPage = () => {
  const classes = useStyles()

  const handleSubmit = () => {}

  return (
    <Container component="main" className={classes.container}>
      <CssBaseline />
      <Box
        component="img"
        className={classes.img}
        src={logo}
        alt="expenseWise"
      />
      <Box
        sx={{
          width: {
            xl: '50%',
            lg: '60%',
            md: '70%',
            sm: '90%',
          },
        }}
      >
        <Box component="form" noValidate onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                name="firstName"
                id="firstName"
                label="First Name"
                required
                fullWidth
                className={classes.textField}
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="family-name"
                className={classes.textField}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                name="email"
                autoComplete="email"
                label="Email Address"
                className={classes.textField}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
                className={classes.textField}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="Confirm password"
                label="Confirm Password"
                type="password"
                id="Confirm password"
                className={classes.textField}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            className={classes.button}
            fullWidth
            variant="contained"
            color="primary"
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="#" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  )
}

export default SignupPage
