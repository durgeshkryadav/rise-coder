/**
 * request — HTTP utility.
 * Pattern from react-boilerplate's app/utils/request.js.
 *
 * Parses JSON and checks status in a single pipeline.
 * Works with React Query's queryFn pattern.
 */

function parseJSON(response) {
  if (response.status === 204 || response.status === 205) {
    return null;
  }
  return response.json();
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

export default function request(url, options) {
  return fetch(url, options).then(checkStatus).then(parseJSON);
}
