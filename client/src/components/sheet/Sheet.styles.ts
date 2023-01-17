import { makeStyles } from '@mui/styles'

export default makeStyles((theme) => ({
  openButton: {
    '&:hover': {
      background: '#E31C79 !important',
      border: '1px solid #E31C7980',
      color: 'white',

    },
  },

  editButton: {
    color: '#455a64 !important',
    border: '1px solid #455a64 !important',
    '&:hover': {
      background: '#455a64 !important',
      border: '1px solid #455a6480',
      color: 'white !important',
    },
  },

  deleteButton: {
    color: '##f44336 !important',
    border: '1px solid ##f44336 !important',
    '&:hover': {
      background: '#f44336 !important',
      border: '1px solid #f4433680',
      color: 'white !important',
    },

  }
}))
