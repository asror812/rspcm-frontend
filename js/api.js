const BASE_URL = 'http://localhost:8080/api';

function getToken() {
  return localStorage.getItem('token');
}

function getHeaders(isForm) {
  const h = { 'Authorization': `Bearer ${getToken()}` };
  if (!isForm) h['Content-Type'] = 'application/json';
  return h;
}

async function handleResponse(res) {
  if (res.status === 401) {
    localStorage.clear();
    location.href = '/index.html';
    throw new Error('Unauthorized');
  }
  const text = await res.text();
  let data;
  try { data = text ? JSON.parse(text) : null; } catch { data = text; }
  if (!res.ok) {
    const msg = (data && data.message) ? data.message : `Ошибка ${res.status}`;
    throw new Error(msg);
  }
  return data;
}

const api = {
  async get(path) {
    const res = await fetch(BASE_URL + path, { headers: getHeaders() });
    return handleResponse(res);
  },
  async post(path, body) {
    const res = await fetch(BASE_URL + path, {
      method: 'POST', headers: getHeaders(), body: JSON.stringify(body)
    });
    return handleResponse(res);
  },
  async put(path, body) {
    const res = await fetch(BASE_URL + path, {
      method: 'PUT', headers: getHeaders(), body: JSON.stringify(body)
    });
    return handleResponse(res);
  },
  async patch(path, body) {
    const res = await fetch(BASE_URL + path, {
      method: 'PATCH', headers: getHeaders(), body: body != null ? JSON.stringify(body) : undefined
    });
    return handleResponse(res);
  },
  async delete(path) {
    const res = await fetch(BASE_URL + path, { method: 'DELETE', headers: getHeaders() });
    return handleResponse(res);
  },
  async postNoAuth(path, body) {
    const res = await fetch(BASE_URL + path, {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body)
    });
    return handleResponse(res);
  }
};
