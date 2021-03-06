import React, {
  InputHTMLAttributes,
  useEffect,
  useRef,
  useState,
  useCallback,
} from 'react'
import { IconBaseProps } from 'react-icons'
import { FiAlertCircle } from 'react-icons/fi'
import { useField } from '@unform/core'

import { Container, Errors } from './styles'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string
  icon?: React.ComponentType<IconBaseProps>
}

const Input: React.FC<InputProps> = ({ name, icon: Icon, ...props }) => {
  const [isFocused, setIsFocused] = useState(false)
  const [isFilled, setIsFilled] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const { fieldName, defaultValue, error, registerField } = useField(name)

  const hadleInputBlur = useCallback(() => {
    setIsFocused(false)
    setIsFilled(!!inputRef.current?.value)
  }, [])

  const hadlerInputFocus = useCallback(() => {
    setIsFocused(true)
  }, [])

  useEffect(
    () =>
      registerField({
        name: fieldName,
        ref: inputRef.current,
        path: 'value',
      }),
    [fieldName, registerField]
  )

  return (
    <Container isErrored={!!error} isFilled={isFilled} isFocused={isFocused}>
      {Icon && <Icon size={20} />}
      <input
        defaultValue={defaultValue}
        onFocus={hadlerInputFocus}
        onBlur={hadleInputBlur}
        ref={inputRef}
        {...props}
      />
      {error && (
        <Errors title={error}>
          <FiAlertCircle color="#c53030" size={20} />
        </Errors>
      )}
    </Container>
  )
}

export default Input
