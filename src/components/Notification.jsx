import { Alert } from '@mui/material'

const Notification = ({ notification }) => {
  if (!notification) {
    return null
  }

  return (
    <Alert sx={{ my: 1 }} severity={notification.type}>{notification.text}
    </Alert>
  )
}

export default Notification