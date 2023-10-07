class AppError extends Error {
  code: number | string
  type: string
  meta?: object
  constructor (message: string, code: number | string, type: string, meta?: object) {
    super(message)
    this.code = code
    this.type = type
    this.meta = meta
  }
}
export {
  AppError
}
