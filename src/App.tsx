import React from 'react'

import GlobalStyle from './styles/globo'
import SingIn from './pages/SingIn'
// import SingUp from './pages/SingUp'
import { AuthProvider } from './hooks/AuthContext'

const App: React.FC = () => (
  <>
    <AuthProvider>
      <SingIn></SingIn>
    </AuthProvider>
    <GlobalStyle />
  </>
)

export default App
