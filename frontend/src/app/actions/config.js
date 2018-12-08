export const standardHeaders = {
  'Authorization': 'whatever-you-want',
  'Content-Type': 'application/json',
  'Accept': 'application/json'
};

export const backEndUrl = window.environment ?  window.environment : `http://localhost:3001`;
