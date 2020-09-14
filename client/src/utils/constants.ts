const ENDPOINT: string =
  process.env.NODE_ENV === "production"
    ? "https://cs3219-otot-b-server-reeh2u5ugq-as.a.run.app/api"
    : "http://localhost:8000/api";

const API = Object.freeze({
  GET_NOTES: `${ENDPOINT}/notes`,
  CREATE_NOTE: `${ENDPOINT}/notes`,
  UPDATE_NOTE: `${ENDPOINT}/notes`,
  DELETE_NOTE: `${ENDPOINT}/notes`,
});

export { ENDPOINT, API };
