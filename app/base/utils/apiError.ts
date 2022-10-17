export default class ApiError extends Error {
  status: number
  isOperational: boolean
  stack: any

  constructor(
    status: number,
    message: string,
    isOperational = true,
    stack = '',
  ) {
    super(message)
    this.status = status
    this.isOperational = isOperational
    this.stack = stack
    Error.captureStackTrace(this)
  }
}
