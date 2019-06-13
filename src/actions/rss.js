import rssAPI from '../services/api/rss';

export const REQUEST_SOURCES = 'FETCH_SOURCES';
export const RECEIVE_SOURCES = 'RECEIVE_SOURCES';
export const SELECT_SOURCE = 'SELECT_SOURCE';
export const REQUEST_ARTICLES = 'REQUEST_ARTICLES';
export const RECEIVE_ARTICLES = 'RECEIVE_ARTICLES';
export const SELECT_ARTICLE = 'SELECT_ARTICLE';
export const REQUEST_XFRAME_OPTION = 'REQUEST_XFRAME_OPTION';
export const RECEIVE_XFRAME_OPTION = 'RECEIVE_XFRAME_OPTION';

export function requestSources() {
  return { type: REQUEST_SOURCES };
}

export function receiveSources(data) {
  return {
    type: RECEIVE_SOURCES,
    sources: data,
  };
}

export function selectSource(id) {
  return { type: SELECT_SOURCE, id };
}

export function requestArticles(sourceId) {
  return { type: REQUEST_ARTICLES, sourceId };
}

export function receiveArticles(sourceId, data) {
  return {
    sourceId,
    type: RECEIVE_ARTICLES,
    articles: data.items.map((item, index) => Object.assign({}, item, {
      isFetching: false,
      id: index,
    })),
    receivedAt: Date.now(),
  };
}

export function selectArticle(id) {
  return { type: SELECT_ARTICLE, id };
}

export function requestXFrameOption(sourceId, articleId, url) {
  return {
    type: REQUEST_XFRAME_OPTION,
    sourceId,
    articleId,
    url,
  };
}

export function receiveXFrameOption(sourceId, articleId, data) {
  return {
    type: RECEIVE_XFRAME_OPTION,
    sourceId,
    articleId,
    allowed: data.allowed,
  };
}

export function fetchSources() {
  return (dispatch) => {
    dispatch(requestSources());

    return rssAPI.getSourcesList()
      .then(
        res => dispatch(receiveSources(res.data)),
        error => console.log(error),
      );
  };
}

export function fetchArticles(id) {
  return (dispatch) => {
    dispatch(requestArticles(id));

    return rssAPI.fetchArticlesById(id)
      .then(
        res => dispatch(receiveArticles(id, res.data)),
        error => console.log(error),
      );
  };
}

export function fetchXFrameCheck(sourceId, articleId, url) {
  return (dispatch) => {
    dispatch(requestXFrameOption(sourceId, articleId, url));

    return rssAPI.checkXFrame(url)
      .then(
        res => dispatch(receiveXFrameOption(sourceId, articleId, res.data)),
        error => console.log(error),
      );
  };
}
