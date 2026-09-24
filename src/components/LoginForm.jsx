import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import { TextField, Button, InputAdornment, IconButton, Stack, Typography, Box } from '@mui/material'

const LoginForm = ({ username, password, handleUsernameChange, handlePasswordChange, handleSubmit }) => {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <Box
      component='form'
      onSubmit={handleSubmit}
      sx={{ justifyContent: 'center', alignItems: 'center', display: 'flex', minHeight: '80vh' }}>
      <Stack spacing={2} sx={{ maxWidth: 400, width: '100%' }}>
        <Typography variant='h4' gutterBottom>Log in to your account</Typography>
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
    </Box>
  )
}
export default LoginForm