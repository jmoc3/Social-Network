type LoginDTO = {
  email: string,
  password: string
}

type RegisterDTO = {
  name: string,
  dateOfBirth: string,
  email: string,
  password: string,
  confirmPassword: string
}

export type { LoginDTO, RegisterDTO }