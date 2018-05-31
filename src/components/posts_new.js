import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form'; //reduxForm help our function to talk to the reducer we wired in and similar to the connect helper, allow our component talk directly to the redux store
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createPost } from '../actions';
import '../App.css';

class PostsNew extends Component{
  renderField(field){
    const { meta: { touched, error } } = field;
    const className = `form-group ${touched && error ? 'is-invalid' : ''}`;
    return (
      <div className={className}>
        <label>{field.label}</label>
          <input
           className="form-control"
           type="text"
           {...field.input}
          />
        <div className="text-help">
        {touched ? error : ''}
      </div>
    </div>
    );
  }

  onSubmit(values){  // this === component
    this.props.createPost(values, () => { // call back function
      this.props.history.push('/');
    });
  }

 render(){
   // handleSubmit refer to redux-form
   const { handleSubmit } = this.props;

   return(
     <div className="container">
     <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
         <Field
          label="Title For Post"
          name="title"
          component={this.renderField}
          />
          <Field
          label="Categories"
          name="categories"
          component={this.renderField}
          />
          <Field
           label="Post Content"
           name="content"
           component={this.renderField}
          />
        <button type="submit" className="btn btn-primary">Save</button>
        <Link to="/" className="btn btn-danger" >Cancel</Link>
     </form>
   </div>
   );
  }
}

function validate(values){
  // console.log(values)
  const errors = {};
  // validate the inputs from 'values'
  if(!values.title){
    errors.title = "Enter a title!";
  }
  if(!values.categories){
    errors.categories = "Enter a categorie";
  }
  if(!values.content){
    errors.content = "Enter a content";
  }
  // If errors is empty,the form is fine to submit
  // if errors has *any* properties redux form assumes form is valid
  return errors;
}

export default reduxForm({
  validate,
  form: 'PostsNewForm'  //configuration option form
})(
  connect(null, { createPost })(PostsNew)
);

//reduxForm function is just a helper that wil help
