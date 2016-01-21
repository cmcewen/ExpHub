import React from 'react-native'
import Markdown from 'react-native-markdown'

import * as actions from 'ExpHub/actions.js'
import { bindActionCreators } from 'redux'
import {connect} from 'react-redux/native'

import IssueHeader from 'ExpHub/components/IssueHeader.js'

let {
  Animated,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} = React;

function mapStateToProps(state) {
  return {
    selectedIssue: state.selectedIssue,
    selectedComments: state.selectedComments,
    animating: state.animatingToIssues || state.animatingToComments
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch)
}

class Issue extends React.Component {
  constructor(props) {
    super(props);
    if (props.selectedIssue === props.issue) {
      this.state = {
        height: new Animated.Value(this.props.maxHeight),
        opacity: new Animated.Value(1),
        expanded: true
      }
    } else {
      this.state = {
        height: new Animated.Value(100),
        opacity: new Animated.Value(0),
        expanded: false
      }
    }
  }

  componentDidUpdate(prevProps, prevState) {
    this.animateIfReady.call(this)
  }

  componentDidMount() {
    this.animateIfReady.call(this)
  }

  animateIfReady() {
    if (this.state.expanded) {
      if (this.props.selectedComments && !this.props.animating && this.props.inComments) {
        this.loadedAnimation.call(this)
      } else if (!this.props.selectedIssue && !this.props.animating) {
        this.collapseAnimation.call(this)
      }
    }
  }

  onPress() {
    if (this.props.selectedIssue) {
      this.props.leaveIssue(this.props.issue)
      this.expandAnimation.call(this, 100)
    } else {
      this.props.selectIssue(this.props.issue)
      this.expandAnimation.call(this, 500)
    }
  }

  expandAnimation(duration) {
    Animated.sequence([
      Animated.timing(
        this.state.height,
        {toValue: this.props.maxHeight,
          duration: duration},
      ),
      Animated.timing(
        this.state.opacity,
        {toValue: 1,
          duration: duration},
      )
    ]).start();
    setTimeout(() => {
      this.setState({expanded: true})
    }, duration*2 + 50)
  }

  loadedAnimation() {
    Animated.timing(
      this.state.height,
      {toValue: this.props.maxHeight * 3/4,
        duration: 250},
    ).start();
  }

  collapseAnimation() {
    Animated.sequence([
      Animated.timing(
        this.state.opacity,
        {toValue: 0,
          duration: 250},
      ),
      Animated.timing(
        this.state.height,
        {toValue: 100,
          duration: 250},
      )
    ]).start();
  }

  render() {
    let text = //this.state.expanded ?
      //<Markdown plainText={styles.issueBody}>{this.props.issue.body}</Markdown> :
      <Text>{this.props.issue.body}</Text>

    return (
      <Animated.View style={[styles.issue, {height: this.state.height}]}>
        <TouchableHighlight onPress={this.onPress.bind(this)}>
          <IssueHeader issue={this.props.issue}/>
        </TouchableHighlight>
        <Animated.View style={[styles.bottom, {opacity: this.state.opacity}]}>
          <ScrollView>
            {text}
          </ScrollView>
        </Animated.View>
      </Animated.View>
    )
  }
}

let styles = StyleSheet.create({
  issue: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    backgroundColor: 'white',
  },
  bottom: {
    flex: 1,
    paddingHorizontal: 10,
    paddingBottom: 10
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Issue)