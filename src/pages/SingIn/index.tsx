import React, { useCallback, useRef } from 'react'
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi'
import { Form } from '@unform/web'
import { FormHandles } from '@unform/core'
import * as Yup from 'yup'
import { Link } from 'react-router-dom'

import { useAuth } from '../../hooks/Auth'
import { useToast } from '../../hooks/Toast'
import logoImg from '../../assets/logo.svg'
import Button from '../../components/Button'
import Input from '../../components/Input'
import getValidationErrors from '../../utils/getValidationErrors'
import { Container, Content, AnimationContener, Background } from './Styled'

interface SingFromData {
  email: string
  password: string
}

const SingIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null)

  const { signIn } = useAuth()
  const { addToast } = useToast()

  const handleSubmit = useCallback(
    async (data: SingFromData) => {
      try {
        formRef.current?.setErrors({})
        const schema = Yup.object().shape({
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('Digite um e-mail válido'),
          password: Yup.string().required('Senha obrigatória'),
        })
        await schema.validate(data, { abortEarly: false })
        await signIn({
          email: data.email,
          password: data.password,
        })
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          const errors = getValidationErrors(error)
          formRef.current?.setErrors(errors)
          return
        }
        addToast({
          type: 'error',
          title: 'Error na autenticação',
          description: 'Ocorreu um erro ao fazer login, cheque as credenciais.',
        })
      }
    },
    [addToast, signIn]
  )

  return (
    <>
      <Container>
        <Content>
          <AnimationContener>
            <img src={logoImg} alt="GoBarber" />
            <Form ref={formRef} onSubmit={handleSubmit}>
              <h1> Faça seu logon</h1>
              <Input name="email" icon={FiMail} placeholder="E-mail" />
              <Input
                name="password"
                icon={FiLock}
                type="password"
                placeholder="Senha"
              />
              <Button name="loginSubmit" type="submit">
                Entrar
              </Button>
              <a href="login">Esqueci minha senha</a>
            </Form>
            <Link to="/singup">
              <FiLogIn />
              Criar conta
            </Link>
          </AnimationContener>
        </Content>
        <Background />
      </Container>
    </>
  )
}

export default SingIn
