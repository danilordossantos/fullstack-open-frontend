import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import './LoginForm.css'

const LoginForm = ({ username, password, handleUsernameChange, handlePasswordChange, handleSubmit }) => {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
                    username
          <input type="text" value={username} onChange={handleUsernameChange} />
        </label>
      </div>
      <div>
        <label>
                    password
          <div className='password-field'>
            <input type={showPassword ? 'text' : 'password'} value={password} onChange={handlePasswordChange} />
            <button type="button" className='password-toggle'
              onClick={() => setShowPassword(!showPassword)}>{showPassword ? <EyeOff size={16} strokeWidth={1.5}/> : <Eye size={16} strokeWidth={1.5}/>}</button>
          </div>
        </label>
      </div>
      <button type="submit">login</button>
    </form>
  )
}
export default LoginForm