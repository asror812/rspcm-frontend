const BASE_URL = 'http://localhost:8080/api';

function getToken() {
  return localStorage.getItem('token');
}

function getHeaders(isForm) {
  const h = { 'Authorization': `Bearer ${getToken()}` };
  if (!isForm) h['Content-Type'] = 'application/json';
  return h;
}

function logRequest(method, path, body) {
  console.groupCollapsed(`→ ${method} ${path}`);
  if (body !== undefined) console.log('body:', body);
  console.groupEnd();
}

async function logResponse(res, startTime) {
  const ms = Date.now() - startTime;
  const clone = res.clone();
  const text = await clone.text();
  let data;
  try { data = text ? JSON.parse(text) : null; } catch { data = text; }
  const style = res.ok ? 'color: green' : 'color: red';
  console.groupCollapsed(`%c← ${res.status} (${ms}ms) ${res.url}`, style);
  if (data !== null) console.log('response:', data);
  console.groupEnd();
}

async function handleResponse(res, startTime) {
  await logResponse(res, startTime);
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
    logRequest('GET', path);
    const t = Date.now();
    const res = await fetch(BASE_URL + path, { headers: getHeaders() });
    return handleResponse(res, t);
  },
  async post(path, body) {
    logRequest('POST', path, body);
    const t = Date.now();
    const res = await fetch(BASE_URL + path, {
      method: 'POST', headers: getHeaders(), body: JSON.stringify(body)
    });
    return handleResponse(res, t);
  },
  async put(path, body) {
    logRequest('PUT', path, body);
    const t = Date.now();
    const res = await fetch(BASE_URL + path, {
      method: 'PUT', headers: getHeaders(), body: JSON.stringify(body)
    });
    return handleResponse(res, t);
  },
  async patch(path, body) {
    logRequest('PATCH', path, body);
    const t = Date.now();
    const res = await fetch(BASE_URL + path, {
      method: 'PATCH', headers: getHeaders(), body: body != null ? JSON.stringify(body) : undefined
    });
    return handleResponse(res, t);
  },
  async delete(path) {
    logRequest('DELETE', path);
    const t = Date.now();
    const res = await fetch(BASE_URL + path, { method: 'DELETE', headers: getHeaders() });
    return handleResponse(res, t);
  },
  async postNoAuth(path, body) {
    logRequest('POST (no auth)', path, body);
    const t = Date.now();
    const res = await fetch(BASE_URL + path, {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body)
    });
    return handleResponse(res, t);
  }
};
