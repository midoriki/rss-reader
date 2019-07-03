import { combineReducers } from 'redux';

/*
state shape
{
  sources: {
    isFetching: false,
    items: [
      {
        id: 1,
        name: 'Hacker News',
        url: 'hn.rss',
        type: 'url' // optional
      }
    ],
  },
  selectedSource: 1,
  articlesBySource: {
    1: {
      isFetching: false,
      lastUpdated: 119922992,
      items: [
        1: {
          id: 1,
          title: 'Title 1',
          link: 'Link 1',
          allowed: false,
        }
      ]
    }
  },
  selectedArticle: 1,
}
*/

import {
  REQUEST_SOURCES,
  RECEIVE_SOURCES,
  SELECT_SOURCE,
  SELECT_ARTICLE,
  REQUEST_ARTICLES,
  RECEIVE_ARTICLES,
  RECEIVE_XFRAME_OPTION,
  REQUEST_XFRAME_OPTION,
  ADD_SOURCE,
} from '../actions/rss';

function sources(state = {
  isFetching: true,
  items: [],
}, action) {
  switch (action.type) {
    case REQUEST_SOURCES:
      return Object.assign({}, state, {
        isFetching: true,
      });
    case RECEIVE_SOURCES:
      return Object.assign({}, state, {
        isFetching: false,
        items: action.sources,
      });
    case ADD_SOURCE: {
      const maxId = state.items.reduce((acc, curr) => ((acc.id > curr.id) ? acc : curr));
      return Object.assign({}, state, {
        items: state.items.concat([{
          id: maxId.id + 1,
          name: action.name,
          url: action.url,
          type: 'url',
        }]),
      });
    }
    default:
      return state;
  }
}

function selectedSource(state = 0, action) {
  switch (action.type) {
    case SELECT_SOURCE:
      return action.id;
    default:
      return state;
  }
}

function article(state = {
  isFetching: true,
}, action) {
  switch (action.type) {
    case REQUEST_XFRAME_OPTION:
      return Object.assign({}, state, {
        isFetching: true,
      });
    case RECEIVE_XFRAME_OPTION:
      return Object.assign({}, state, {
        isFetching: false,
        allowed: action.allowed,
      });
    default:
      return state;
  }
}

function articles(state = {
  isFetching: false,
  items: [],
}, action) {
  switch (action.type) {
    case REQUEST_ARTICLES:
      return Object.assign({}, state, {
        isFetching: true,
      });
    case RECEIVE_ARTICLES:
      return Object.assign({}, state, {
        isFetching: false,
        items: action.articles,
        lastUpdated: action.receivedAt,
      });
    case REQUEST_XFRAME_OPTION:
    case RECEIVE_XFRAME_OPTION:
      return Object.assign({}, state, {
        items: state.items.map((item, index) => {
          if (index === action.articleId) {
            return article(item, action);
          }
          return item;
        }),
      });
    default:
      return state;
  }
}

function articlesBySource(state = {}, action) {
  switch (action.type) {
    case REQUEST_XFRAME_OPTION:
    case RECEIVE_XFRAME_OPTION:
    case REQUEST_ARTICLES:
    case RECEIVE_ARTICLES:
      return Object.assign({}, state, {
        [action.sourceId]: articles(state[action.sourceId], action),
      });
    default:
      return state;
  }
}

function selectedArticle(state = -1, action) {
  switch (action.type) {
    case SELECT_ARTICLE:
      return action.id;
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  sources,
  selectedSource,
  articlesBySource,
  selectedArticle,
});

export default rootReducer;
