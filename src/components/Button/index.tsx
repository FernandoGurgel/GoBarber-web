import React, { ButtonHTMLAttributes } from 'react'

import { Container } from './styles'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  name: string
}

const Button: React.FC<ButtonProps> = ({ children, ...props }) => (
  <Container {...props}>{children}</Container>
)

export default Button
