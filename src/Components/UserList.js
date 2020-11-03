import React from "react";

import axios from "axios";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Card } from "react-bootstrap";
import Gallery from "./Gallery";
import Todo from "./Todo";
import PostDetails from "./PostDetails";
class UserList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: [],
      profile: [],
      errorMsg: "",
      isClick:false
    };
    this.handleClick = this.handleClick.bind(this);
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

  handleClick(id) {
    this.setState({isClick :true})
    var arr  = this.state.posts;
    console.log("in handleclick");
    var arrs = arr ? arr.users : null;
    console.log(arrs);

    for (var i = 0; i < arrs.length; i++) {
      if (i+1 === id) {
        this.setState({ profile: arrs[i] });
      }
    }
  }

  render() {
    var { posts } = this.state;
    var postts = posts ? posts.users : null;
    var userDetails=this.state.profile;
    return (
      <Card>
        {!this.state.isClick &&
       <div><h1> Select a Users</h1>
        { postts && postts.length
          ? postts.map((post) => (
              <div key={post.id} className="list">
                <h3>
                  {" "}
                  <img
                    className="image"
                    src={post.profilepicture}
                    alt="Avatar"
                  />
                  <a href='javascript:void(0)' onClick={() => this.handleClick(post.id)}>
                    {post.name}
                  </a>
                </h3>
                {/* <Router><Link to={{pathname:"/Details",id:post.id}} /></Router></h3> */}
              </div>
            ))
          : null}
        </div> }
         {this.state.isClick && <div>
          <h2>
            <div>
            <BrowserRouter>
            <Switch>
              <Route exact path="/post" component={PostDetails} />
              <Route path="/about" component={Todo} />
              <Route path="/gallery" component={Gallery} />
            </Switch>
            </BrowserRouter>
            </div>
            <div><img
                    src={userDetails.profilepicture}
                    alt="Profile photo"
                  /></div>
           <div> Name :  {userDetails.name}</div>
           <div> UserName :  {userDetails.username}</div>
           <div> E-mail :  {userDetails.email}</div>
          <div>Phone : {userDetails.phone}</div>
           <div>
             Addres: Street - {userDetails.address.street}
                     Soute No - {userDetails.address.suite} 
                     City - {userDetails.address.city}
                     Zip Code -{userDetails.address.zipcode}
           </div>
           <div>
             Web Site : {userDetails.website}
           </div>
           <div>
             Company Name :{userDetails.company.name}
           </div>
          </h2>
        </div>}
      </Card>
    );
  }
}

export default UserList;
