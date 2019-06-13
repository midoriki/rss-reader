import axios from './base';

function getSourcesList() {
  return axios.get('/list');
}

function fetchArticlesById(id) {
  return axios.get(`/id/${id}`);
}

function checkXFrame(url) {
  return axios.get('/check', { params: { url } });
}

export default { getSourcesList, fetchArticlesById, checkXFrame };
