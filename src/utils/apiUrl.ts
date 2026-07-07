const PROD_BACKEND_URL = 'https://ai-chat-backend-jvye.onrender.com'
const LOCAL_BACKEND_URL = 'http://localhost:3000'

const isLocalhost = ['localhost', '127.0.0.1'].includes(window.location.hostname)

export const BASE_URL = isLocalhost ? LOCAL_BACKEND_URL : PROD_BACKEND_URL
