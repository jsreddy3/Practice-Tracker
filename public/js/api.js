let API_URL = "/api";

const apiRequest = async (method, path, body = null) => {
  path = API_URL + path;
  let res;
  if (!body) {
    res = await fetch(path, {
      method: method,
      headers: { "Content-Type": "application/json" },
    });
  } else {
    res = await fetch(path, {
      method: method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    });
  }
  if (res.status !== 200) {
    let httpErr = new HTTPError(res.status, res.error);
  }
  let data = await res.json();
  return data;
};

window.apiRequest = apiRequest;
export default apiRequest;
