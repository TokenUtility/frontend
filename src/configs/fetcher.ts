interface ErrorException extends Error {
  info?: any;
  status?: any;
}

export const fetcher = async (resource, init) => {
  const res = await fetch(resource, init);

  // If the status code is not in the range 200-299,
  // we still try to parse and throw it.
  if (!res.ok) {
    const error: ErrorException = new Error(
      "An error occurred while fetching the data.",
    );
    error.info = await res.json();
    error.status = res.status;
    // Attach extra info to the error object.
    throw error;
  }
  const resData: any = await res.json();
  return resData;
};
