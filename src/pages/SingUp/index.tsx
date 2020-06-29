import React, { useCallback, useRef } from 'react'
import { FiArrowLeft, FiMail, FiLock, FiUser } from 'react-icons/fi'
import { Form } from '@unform/web'
import { FormHandles } from '@unform/core'
import * as Yup from 'yup'
import { Link } from 'react-router-dom'

import logoImg from '../../assets/logo.svg'
import Button from '../../components/Button'
import Input from '../../components/Input'
import getValidationErrors from '../../utils/getValidationErrors'
import { Container, Content, AnimationContener, Background } from './Styled'

const SingUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null)

  const handleSubmit = useCallback(async (data: object) => {
    try {
      formRef.current?.setErrors({})
      const schema = Yup.object().shape({
        name: Yup.string().required('Nome obrigatório'),
        email: Yup.string()
          .required('E-mail obrigatório')
          .email('Digite um e-mail válido'),
        password: Yup.string().min(6, 'No mínimo 6 dígitos'),
      })
      await schema.validate(data, { abortEarly: false })
    } catch (error) {
      console.log(error)
      const errors = getValidationErrors(error)
      formRef.current?.setErrors(errors)
    }
  }, [])

  return (
    <>
      <Container>
        <Background />
        <Content>
          <AnimationContener>
            <img src={logoImg} alt="GoBarber" />
            <Form ref={formRef} onSubmit={handleSubmit}>
              <h1> Faça seu cadastro</h1>
              <Input name="name" icon={FiUser} placeholder="Seu nome" />
              <Input name="email" icon={FiMail} placeholder="Seu email" />
              <Input
                name="password"
                icon={FiLock}
                type="password"
                placeholder="Senha"
              />
              <Button name="loginSubmit" type="submit">
                Cadastrar
              </Button>
            </Form>
            <Link to="/">
              <FiArrowLeft />
              Voltar para logon
            </Link>
          </AnimationContener>
        </Content>
      </Container>
    </>
  )
}

export default SingUp
