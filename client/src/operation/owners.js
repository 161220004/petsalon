import request from '../util/request';

export function queryList() {
  return request('/api/owners');
}

export function queryOne(id) {
  return request(`/api/owners/${id}`);
}

export function editOne(id, data) {
  return request(`/api/owners/${id}`, {
    headers: {
      'content-type': 'application/json',
    },
    method: 'PATCH',
    body: JSON.stringify(data)
  });
}

export function deleteOne(id) {
  console.log(`operation - deleteOne: param id = ${id}`);
  console.log('ready to request');
  return request(`/api/owners/${id}`, {
    method: 'DELETE'
  });
}

export function addOne(data) {
  return request('/api/owners', {
    headers: {
      'content-type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify(data),
  });
}
