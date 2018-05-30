import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import PostIndex from './components/Posts_index';
import PostsNew from './components/posts_new';
import PostsShow from './components/post_show';

import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import promise from 'redux-promise';

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <BrowserRouter>
      <div>
        <Switch>
          <Route path="/posts/new" component={PostsNew } />
          <Route path="/posts/:id" component={PostsShow} />
          <Route exact path="/" component={PostIndex } />
       </Switch>
      </div>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'));
registerServiceWorker();
