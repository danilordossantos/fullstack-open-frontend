import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import { TextField, Button, InputAdornment, IconButton, Stack, Typography } from '@mui/material'

const LoginForm = ({ username, password, handleUsernameChange, handlePasswordChange, handleSubmit }) => {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <>
      <Typography variant='h4' gutterBottom>Log in to your account</Typography>
      <form onSubmit={handleSubmit}>
        <Stack spacing={2} sx={{ maxWidth: 400 }}>
          <TextField
            label="username"
            value={username}
            onChange={handleUsernameChange}
          />
          <TextField
            label="password"
            type={showPassword ? 'text' : 'password'} value={password}
            onChange={handlePasswordChange}
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position='end'>
                    <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                      {showPassword ? <EyeOff size={16} strokeWidth={1.5} /> : <Eye size={16} strokeWidth={1.5} />}
                    </IconButton>
                  </InputAdornment>
                )
              }
            }}
          />
          <Button type="submit" variant="contained">login</Button>
        </Stack>
      </form>
    </>
  )
}
export default LoginForm