import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import {
  Divider,
  Grid,
  Segment,
  Sticky,
  Rail,
  Header,
  Dimmer,
  Loader,
  Image
} from "semantic-ui-react";

import _ from "lodash";
import ConfirmEmailMessage from "../messages/ConfirmEmailMessage";
import AddPostCTA from "../ctas/AddPostCTA";
import { fetchStories } from "../../redux/actions/stories";
import { allStoriesSelector } from "../../redux/reducers/stories";
import Feed from "../feed/Feed";
import Featured from "../feed/Featured";
import NetowrkSidebar from "../dashboard/NetworkSidebar";

const Placeholder = () => (
  <Image src="https://react.semantic-ui.com/images/wireframe/paragraph.png" />
);

class DashboardPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { width: 0, height: 0 };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  componentDidMount() {
    this.onInit(this.props);
    this.updateWindowDimensions();
    window.addEventListener("resize", this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateWindowDimensions);
  }

  handleContextRef = contextRef => this.setState({ contextRef });

  onInit = props => props.fetchStories();

  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }

  render() {
    const { isConfirmed, stories } = this.props;
    const { width } = this.state;

    return (
      <div>
        {!isConfirmed && <ConfirmEmailMessage />}
        {/* {stories.length === 0 && <AddPostCTA />} */}
        <Divider hidden />
        <Featured posts={stories} />
        <Divider />

        {width > 855 && (
          <Grid columns={2}>
            <Grid.Column width={12}>
              <Segment basic>
                <Feed posts={stories} />
              </Segment>
            </Grid.Column>
            <Grid.Column width={4}>
              <Sticky>
                <NetowrkSidebar />
              </Sticky>
            </Grid.Column>
          </Grid>
        )}

        {width <= 855 && (
          <Grid columns={1}>
            <Grid.Row>
              <Segment basic>
                <Feed posts={stories} />
              </Segment>
            </Grid.Row>
          </Grid>
        )}
      </div>
    );
  }
}

DashboardPage.propTypes = {
  isConfirmed: PropTypes.bool.isRequired,
  stories: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired
    }).isRequired
  ).isRequired
};

function mapStateToProps(state) {
  console.log(state);
  return {
    isConfirmed: !!state.user.confirmed,
    stories: allStoriesSelector(state)
  };
}

export default connect(
  mapStateToProps,
  { fetchStories }
)(DashboardPage);
