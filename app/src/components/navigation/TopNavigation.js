import React from "react";
import { Menu, Dropdown, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logout } from "../../redux/actions/auth";

const TopNavigation = ({ user, logout }) => (
  <div className='navigationBar'>
  <Menu secondary>
    <Menu.Item as={Link} to="/dashboard" style={{ fontSize: "20px" }}>
      Football Paradise
    </Menu.Item>

    <Menu.Menu position="right">
    <Menu.Item as={Link} to={"/@" +  user.name} style={{ fontSize: "20px" }}>
      User
    </Menu.Item>
    <Menu.Item as={Link} to="/new-story" style={{ fontSize: "20px" }}>
      New Post
    </Menu.Item>
      <Dropdown
        trigger={
          <Image avatar src={user.profile_pic} className="middle" />
        }
        icon={null}
        // options={options}
      >
      <Dropdown.Menu>
      <Dropdown.Item onClick={() => logout()}>Logout</Dropdown.Item>
      </Dropdown.Menu>
      </Dropdown>
    </Menu.Menu>
  </Menu>
  </div>
  // <ul>
  //   <li>
  //     <a href="/dashboard">Home</a>
  //   </li>
  //   <li>
  //     <a href="#news">News</a>
  //   </li>
  //   <li>
  //     <a href="#contact">Contact</a>
  //   </li>
  //   <li style={{ float: "right" }}>
  //     <a className="active" href="#about">
  //       About
  //     </a>
  //   </li>
  // </ul>
);

TopNavigation.propTypes = {
  user: PropTypes.shape({
    email: PropTypes.string.isRequired
  }).isRequired,
  logout: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  console.log(state.user)
  return {
    user: state.user
  };
}

export default connect(
  mapStateToProps,
  { logout }
)(TopNavigation);
