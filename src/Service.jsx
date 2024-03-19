const API = `https://65ef5bb3ead08fa78a5055fb.mockapi.io/list`;

const service = {
  get: () => fetch(API).then((data) => data.json()),
  delete: (id) => fetch(API + `/${id}`, { method: "DELETE" }),
};
export default service;
