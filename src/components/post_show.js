import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchPost, deletePost } from '../actions';

class PostsShow extends Component{
  componentDidMount(){
   const { id } = this.props.match.params;
   this.props.fetchPost(id); // this means i want this post with this particular id
  }

  onDeleteClick(){
    const { id } = this.props.match.params;
    this.props.deletePost(id, () => { // this means i want this delete with this particular id
      this.props.history.push('/');
    });
  }

  render(){
    const { post } = this.props;

    if(!post){
      return(
      <div>Loading...</div>
      )
    }

    return (
     <div className="container">
       <Link to="/">Back to index</Link>
       <button
         className="btn btn-danger float-right"
         onClick={this.onDeleteClick.bind(this)}
         >
        Delete Post
       </button>
       <h3>{post.title}</h3>
       <h6>Categories: {post.categories}</h6>
       <p>{post.content}</p>
     </div>
    )
  };
}

function mapStateToProps({ posts }, ownProps) { // WE ARE FETCHING A VERY PARTICULAR ID
 return { post: posts[ownProps.match.params.id]}
}

export default connect(mapStateToProps, { fetchPost,deletePost })(PostsShow);
