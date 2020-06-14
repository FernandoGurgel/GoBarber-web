import React from 'react'
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi'

import logoImg from '../../assets/logo.svg'
import { Container, Content, Background } from './Styled'
import Button from '../../components/Button'
import Input from '../../components/Input'

const SingIn: React.FC = () => (
  <>
    <Container>
      <Content>
        <img src={logoImg} alt="GoBarber" />
        <form>
          <h1> Faça seu logon</h1>
          <Input
            name="txtName"
            icon={FiMail}
            type="email"
            placeholder="E-mail"
          />
          <Input
            name="txtPassword"
            icon={FiLock}
            type="password"
            placeholder="Senha"
          />
          <Button name="loginSubmit" type="submit">
            Entrar
          </Button>
          <a href="login">Esqueci minha senha</a>
        </form>
        <a href="login">
          <FiLogIn />
          Criar conta
        </a>
      </Content>
      <Background />
    </Container>
  </>
)

export default SingIn
