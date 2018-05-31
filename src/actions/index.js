import axios from 'axios';

export const FETCH_POSTS = 'fetch_posts';
export const FETCH_POST = 'fetch_post';
export const CREATE_POSTS = 'create_posts';
export const DELETE_POST = 'delete_post';


const ROOT_URL = 'http://reduxblog.herokuapp.com/api';
const API_KEY = '?key=TUNECHI1233';

// FETCH LIST OF POST AND RETURN TO REDUCERS
export function fetchPosts() {
  const request = axios.get(`${ROOT_URL}/posts${API_KEY}`);

  return{
   type: FETCH_POSTS,
   payload: request
 };
}

// CREATE POST
export function createPost(values, callback){ // values represent the blog post (title,categories,content)
  const request = axios.post(`${ROOT_URL}/posts${API_KEY}`, values)
  .then(() => callback());

  return {
    type: CREATE_POSTS,
    payload: request
  };
}

// FETCH POST
export function fetchPost(id){
  const request = axios.get(`${ROOT_URL}/posts/${id}${API_KEY}`);

  return {
    type: FETCH_POST,
    payload: request
  };
}

// DELETE POST
export function deletePost(id, callback){
  const request = axios.delete(`${ROOT_URL}/posts/${id}${API_KEY}`)
  .then(() => callback());

  return{
    type: DELETE_POST,
    payload: id
  }
}
