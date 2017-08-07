export const acceptOrRejectRequest = (resp) => {
  if (resp.status >= 200 && resp.status < 300) {
    return resp.json();
  } else {
    throw new Error(resp.status);
  }
};