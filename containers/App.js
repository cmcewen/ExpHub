import React from 'react-native'

import * as actions from 'ExpHub/actions.js'
import { bindActionCreators } from 'redux'
import {connect} from 'react-redux/native'

import AddComment from 'ExpHub/containers/AddComment.js'
import Comment from 'ExpHub/components/Comment.js'
import Intro from 'ExpHub/components/Intro.js'
import Issue from 'ExpHub/containers/Issue.js'
import RepoInput from 'ExpHub/containers/RepoInput.js'

let {
  Animated,
  Dimensions,
  DeviceEventEmitter,
  Image,
  ListView,
  StatusBarIOS,
  StyleSheet,
  Text,
  TextInput,
  View,
} = React;

function mapStateToProps(state) {
  return state
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch)
}

class App extends React.Component {
  constructor(props) {
    super(props);
    let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    let cs = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      issuesDataSource: ds.cloneWithRows([]),
      commentsDataSource: cs.cloneWithRows([]),
      commentOpacity: new Animated.Value(0),
      issueOpacity: new Animated.Value(1),
      shownIntro: false,
      keyboardMargin: 0
    };
  }

  componentWillMount () {
    DeviceEventEmitter.addListener('keyboardWillShow', this.keyboardWillShow.bind(this))
    DeviceEventEmitter.addListener('keyboardWillHide', this.keyboardWillHide.bind(this))
  }


  keyboardWillShow (e) {
    this.setState({keyboardMargin: e.endCoordinates.height})
    if (this.refs.cv) {
      this.refs.cv.getScrollResponder().scrollTo(this.yOffset + e.endCoordinates.height);
    }
  }

  keyboardWillHide (e) {
    this.setState({keyboardMargin: 0})
    if (this.refs.cv) {
      this.refs.cv.getScrollResponder().scrollTo(this.yOffset - e.startCoordinates.height);
    }
  }

  handleCommentScroll(event) {
    this.yOffset = event.nativeEvent.contentOffset.y
  }

  componentDidMount() {
    StatusBarIOS.setStyle('light-content');
    this.props.initRepo();
    this.props.fetchCurrentRepo();
  }

  measureListView(event) {
    if (!this.state.listViewHeight) {
      this.setState({listViewHeight: event.nativeEvent.layout.height - 20})
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.issues !== this.props.issues) {
      this.setState({
        issuesDataSource: this.state.issuesDataSource.cloneWithRows(nextProps.issues)
      })
    }
    if (nextProps.selectedComments !== this.props.selectedComments && nextProps.selectedComments) {
      this.setState({
        commentsDataSource: this.state.commentsDataSource.cloneWithRows(
          [nextProps.selectedIssue].concat(nextProps.selectedComments).concat('comment')
        )
      })
    }
    if (nextProps.selectedIssue !== this.props.selectedIssue) {
      if (nextProps.selectedIssue) {
        this.animateToComments.call(this, nextProps.selectedIssue);
      } else {
        this.animateToIssues.call(this);
      }
    }
  }

  animateToComments(issue) {
    let index = this.props.issues.indexOf(issue);
    this.setState({issueOffset: index * 110});
    this.refs.lv.getScrollResponder().scrollTo(index * 110);

    setTimeout(() => {
      Animated.sequence([
        Animated.timing(
          this.state.commentOpacity,
          {toValue: 1,
            duration:100},
        ),
        Animated.timing(
          this.state.issueOpacity,
          {toValue: 0,
          duration:100},
        )
      ]).start();
      setTimeout(() => {
        this.props.animationFinished('animatingToComments')
      }, 250);
    }, 1100);
  }

  animateToIssues() {
    setTimeout(() => {
      Animated.sequence([
        Animated.timing(
          this.state.issueOpacity,
          {toValue: 1,
            duration:100},
        ),
        Animated.timing(
          this.state.commentOpacity,
          {toValue: 0,
          duration:100},
        )
      ]).start();
      setTimeout(() => {
        this.props.animationFinished('animatingToIssues')
      }, 250);
    }, 300);
  }

  commentRow(object) {
    if (object === 'comment') {
      return <AddComment />
    } else if (object.number) {
      return <Issue
        issue={object}
        key={object.id}
        maxHeight={this.state.listViewHeight}
        inComments={true}
      />
    } else {
      return <Comment
        comment={object}
        key={object.id}
      />
    }
  }

  row(object) {
    return <Issue
      issue={object}
      key={object.id}
      maxHeight={this.state.listViewHeight}
    />
  }

  separator(sectionID, rowID) {
    return <View style={styles.separator} key={sectionID.toString() + rowID.toString()}/>
  }

  listView() {
    return (
      <View style={{flex: 1}}>
        <Animated.View
          style={[styles.listView, {opacity: this.state.commentOpacity}]}>
          <ListView
            ref={'cv'}
            dataSource={this.state.commentsDataSource}
            renderRow={this.commentRow.bind(this)}
            renderSeparator={this.separator}
            showsVerticalScrollIndicator={false}
            scrollEnabled={!this.state.animatingToComments}
            onScroll={this.handleCommentScroll.bind(this)}
          />
        </Animated.View>
        <Animated.View
          style={[styles.listView, {opacity: this.state.issueOpacity}]}
          pointerEvents={this.state.issueOpacity._value ? 'auto' : 'none'}
          >
          <ListView
            ref={'lv'}
            dataSource={this.state.issuesDataSource}
            renderRow={this.row.bind(this)}
            renderSeparator={this.separator}
            showsVerticalScrollIndicator={false}
            scrollEnabled={!this.state.animatingToIssues}
          />
        </Animated.View>
      </View>
    )
  }

  loading() {
    return(
      <Image style={styles.loading} source={{uri: 'http://i.imgur.com/UMttquF.gif'}} />
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>ExpHub</Text>
        </View>
        <RepoInput />
        <View style={[styles.issues, , {marginBottom: this.state.keyboardMargin}]} onLayout={this.measureListView.bind(this)}>
          {this.props.isLoading ? this.loading() : this.listView()}
        </View>
        {this.state.shownIntro ? null :
          <Intro onPress={() => this.setState({shownIntro: true})} />
        }
      </View>
    )
  }
}

let styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#5C6C60',
  },
  title: {
    fontSize: 24,
    color: 'white',
    fontFamily: 'Helvetica Neue'
  },
  listView: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    top: 0
  },
  header: {
    height: 40,
    marginTop: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  issues: {
    flex: 1,
    padding: 10,
    backgroundColor: '#CFD1AA',
    justifyContent: 'center'
  },
  separator: {
    flex: 1,
    height: 10
  },
  loading: {
    height: 128,
    width: 128,
    alignSelf: 'center'
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(App)