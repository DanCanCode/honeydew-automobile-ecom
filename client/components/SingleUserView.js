import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchUser } from "../store/singleUserStore";
import { removeUser } from "../store/allUsersStore";

class SingleUserView extends React.Component {
  componentDidMount() {
    this.props.fetchUserData(this.props.match.params.id);
  }

  render() {
    const user = this.props.userData;
    console.log(user)
    return (
      <div className='text-white h-screen text-center'>
        {user ? (
          <div>
            <h1>USER: {user.name}</h1>
            <h2>USER EMAIL: {user.email}</h2>
            <h3>DATE OF BIRTH: {user.dateOfBirth}</h3>
           <div> <Link to={`/user/modify/${this.props.match.params.id}`}>Modify {user.name}</Link></div>

           <div><Link to={`/orders/${this.props.match.params.id}`}>Order History</Link></div>
           <div> <button
              onClick={() => this.props.deleteUserData(this.props.match.params.id)}
              type="submit"
            >
              Remove
            </button>
          </div>
          </div>
        ) : (
          "There is no user data"
        )}
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    userData: state.userData,
  };
};

const mapDispatch = (dispatch, { history }) => {
  return {
    fetchUserData: (id) => dispatch(fetchUser(id)),
    deleteUserData: (id) => dispatch(removeUser(id, history)),
  };
};

export default connect(mapState, mapDispatch)(SingleUserView);
