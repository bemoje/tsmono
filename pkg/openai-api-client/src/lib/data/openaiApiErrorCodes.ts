export const openaiApiErrorCodes = new Map([
  [401, 'Invalid Authentication. Ensure the correct API key and requesting organization are being used.'],
  [429, 'Rate limit reached or hard limit quota reached. You can apply for a quota increase.'],
  [
    500,
    'The server had an error. Retry your request after a brief wait and contact us if the issue persists. Check the status page.',
  ],
  [503, 'The engine is currently overloaded, please try again later. Please retry your requests after a brief wait.'],
])
