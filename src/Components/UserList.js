import React, { Component } from "react";
import axios from "axios";
import {Link, Router} from "react-router-dom"
import {Card} from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.min.css';

class UserList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: [],
      profile:{},
      errorMsg: ""
    };
  }
  componentDidMount() {
    axios
      .get("https://panorbit.in/api/users.json")
      .then((response) => {
        this.setState({ posts: response.data });
      })
      .catch((error) => {
        console.log(error);
        this.setState({ errorMsg: "Error retrieving data" });
      });
    }

    handleClick(id){
      var{ arr}=this.state.posts;
      //var arrs=arr.users; 
      var arrs=arr ? arr.users:null;
      console.log(arrs);

      for(var i=1;i< arrs && arrs.length;i++){
        if(i===id){
          this.setState({profile:arrs})
        }
      }
    }
        
    
  render() {
      //var posts=this.state;
   var { posts } = this.state ;
    //console.log(posts);
    var postts=posts ? posts.users:null;
    //console.log(posts.users);
    var userData=this.state.profile;
    return (
        
          <Card>
       <h1> Select a Users</h1>
        {postts && postts.length 
          ? postts.map((post) => (
              <div key={post.id} className="list">
                 <h3> <img className="image" src={post.profilepicture} alt="Avatar"/> 
                <a  onClick={this.handleClick(post.id)} href="" >{post.name}</a></h3>
                {/* <Router><Link to={{pathname:"/Details",id:post.id}} /></Router></h3> */}
               </div>
            ))
          : null}
        <div>
        <h2>Name : {userData.name}
           UserName: {userData.username}
           E-mail: {userData.email}
           
        </h2> 
        
        </div>
      

        </Card>
        
      
    );
  }
}

export default UserList;
