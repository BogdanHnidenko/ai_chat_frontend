// Keys returned by the backend in { status: 'error', error: '<key>' }
export const API_ERRORS = {
  NO_AUTH:            'no auth',
  USER_NOT_FOUND:     'user_not_found',
  INVALID_CREDENTIALS:'invalid_credentials',
} as const

export type ApiErrorKey = typeof API_ERRORS[keyof typeof API_ERRORS]
