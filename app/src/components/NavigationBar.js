import React, { Component } from "react";
import { Menu, Segment, Input, Header, Container } from "semantic-ui-react";
import './style/navigation.css'


export default class MenuExampleInvertedSecondary extends Component {
  state = { activeItem: "home" };

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const { activeItem } = this.state;

    return (
        <Menu pointing secondary>
        <Menu.Menu position='left'>
            <div className='header'>Abhijeet Malamkar</div>
        </Menu.Menu>
        <Menu.Menu position='right'>
          <Menu.Item
            name="home"
            active={activeItem === "home"}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            name="portfolio"
            active={activeItem === "portfolio"}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            name="about me"
            active={activeItem === "about me"}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            name="contact"
            active={activeItem === "contact"}
            onClick={this.handleItemClick}
          />
          <Menu.Item >
            <Input className="icon" icon="search" placeholder="Search..." />
          </Menu.Item>
          </Menu.Menu>
        </Menu>
    );
  }
}
