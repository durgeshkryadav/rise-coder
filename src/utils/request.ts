/**
 * request — HTTP utility.
 * Pattern from react-boilerplate's app/utils/request.js.
 *
 * Parses JSON and checks status in a single pipeline.
 * Works with React Query's queryFn pattern.
 */

import type { RequestError } from '../types';

function parseJSON(response: Response) {
  if (response.status === 204 || response.status === 205) {
    return null;
  }
  return response.json();
}

function checkStatus(response: Response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText) as RequestError;
  error.response = response;
  throw error;
}

export default function request(url: string | URL, options?: RequestInit) {
  return fetch(url, options).then(checkStatus).then(parseJSON);
}
