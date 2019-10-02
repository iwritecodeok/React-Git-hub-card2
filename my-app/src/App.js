import React from "react";
import axios from "axios";
import "./App.css";

import Card from "./components/Card";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      user: "jnichols93",
      userData: {},
      followersData: []
    };
  }

  componentDidMount() {
    this.getUser();
    this.setState({ user: "" })
  }

  componentDidUpdate(prevProps, prevState) {
    // if the userData is updated
    if (this.state.userData !== prevState.userData) {
      // reset followersData
      this.setState(() => ({ followersData: [] }))
      // update followersData
      axios.get(this.state.userData.followers_url)
        .then(response => {
          const followerURLs = response.data.map(follower => follower.url);
          followerURLs.forEach(url => {
            axios.get(url)
              .then(response => {
                this.setState(() => ({ followersData: [...this.state.followersData, response.data]}))
              })
              .catch(error => console.log(error))
          })
        })
        .catch(error => {
          console.log(error);
        });
    }
  }

  getUser = () => {
    // fetch data for current user
    axios.get(`https://api.github.com/users/${this.state.user}`)
      .then(response => {
        // console.log(response);
        // then put the data into userData state
        this.setState({ userData: response.data });
      })
      .catch(error => {
        console.log(error);
      });
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value})
  }

  handleSubmit = event => {
    event.preventDefault();
    this.getUser();
    this.setState({ user: "" })
  }

  render() {
    return (
      <div className="App">
        <h1 className="main-heading">github user cards</h1>
        <form onSubmit={this.handleSubmit}>
          <input 
            type="text" 
            placeholder="enter a username" 
            value={this.state.user}
            name="user"
            onChange={this.handleChange}
          />
          <button type="submit">search</button>
        </form>
        <div className="card-container">
          <div className="user-card">
            <h2 className="main-heading">User: </h2>
            <Card userData={this.state.userData}/>
          </div>
          <div className="follower-container">
            <h2 className="main-heading">Followers: </h2>
            <div className="follower-cards">
              {this.state.followersData.map(follower => {
                return <Card userData={follower} key={follower.id} />
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;