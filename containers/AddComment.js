import React from 'react-native'

import * as actions from 'ExpHub/actions.js'
import { bindActionCreators } from 'redux'
import {connect} from 'react-redux/native'

let {
  Animated,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View,
} = React;

function mapStateToProps(state) {
  return {
    commentInput: state.commentInput,
    user: state.user,
    error: state.userError
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch)
}

class AddComment extends React.Component {
  renderCommentInput() {
    return (
      <View style={styles.commentContainer}>
        <TextInput
          style={styles.comment}
          onChangeText={this.props.changeComment}
          value={this.props.commentInput}
          multiline={true}
          autoCapitalize={'none'}
          autoCorrect={false}
          onSubmitEditing={this.props.addComment}
        />
        <TouchableHighlight onPress={this.props.addComment}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>Submit</Text>
          </View>
        </TouchableHighlight>
      </View>
    )
  }

  renderSignIn() {
    let text = this.props.error ? this.props.error :
      "Sign in to Github to comment - promise I'm not doing " +
      "anything sketchy (this is open source if you want to check)"

    let hintStyle = this.props.error ? styles.error : styles.hint

    return(
      <View style={styles.signInBox}>
        <Text style={hintStyle}>{text}</Text>
        <View style={styles.inputLine}>
          <Text style={[styles.hint, styles.label]}>Username</Text>
          <TextInput
            style={styles.input}
            onChangeText={this.props.changeUsername}
            value={this.props.user.username}
            multiline={false}
            autoCapitalize={'none'}
            autoCorrect={false}
            onSubmitEditing={this.props.signIn}
          />
        </View>
        <View style={styles.inputLine}>
          <Text style={[styles.hint, styles.label]}>Password</Text>
          <TextInput
            style={styles.input}
            onChangeText={this.props.changePassword}
            value={this.props.user.password}
            multiline={false}
            autoCapitalize={'none'}
            autoCorrect={false}
            secureTextEntry={true}
            onSubmitEditing={this.props.signIn}
          />
        </View>
        <TouchableHighlight onPress={this.props.signIn}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>Sign In</Text>
          </View>
        </TouchableHighlight>
      </View>
    )
  }

  render() {
    return (
      <View style={[styles.commentBox]}>
        <Text style={styles.header}>Reply</Text>
        {this.props.user.signedIn ? this.renderCommentInput() : this.renderSignIn()}
      </View>
    )
  }
}

let styles = StyleSheet.create({
  button: {
    flex: 1,
    alignSelf: 'flex-end',
    backgroundColor: '#5C6C60',
    padding: 5
  },
  buttonText: {
    fontSize: 12,
    fontFamily: 'Helvetica Neue',
    color: "white"
  },
  commentBox: {
    flex: 1,
    padding: 10,
    height: 200,
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: 'white',
  },
  commentContainer: {
    flex: 1
  },
  comment: {
    padding: 5,
    marginVertical: 10,
    flex: 1,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#373743',
    color: '#373743',
    fontSize: 14,
    fontFamily: 'Helvetica Neue',
  },
  header: {
    fontSize: 16,
    fontFamily: 'Helvetica Neue',
    fontWeight: '800',
  },
  hint: {
    fontSize: 10,
    fontFamily: 'Helvetica Neue',
    color: "#52555A"
  },
  label: {
    flex: 1
  },
  error: {
    fontSize: 12,
    fontWeight: '600',
    fontFamily: "Helvetica Neue",
    color: '#801919',
  },
  inputLine: {
    flex: 1,
    height: 35,
    marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    marginLeft: 5,
    flex: 4,
    paddingHorizontal: 5,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#373743',
    color: '#373743',
    fontSize: 14,
    fontFamily: 'Helvetica Neue',
  },
  signInBox: {
    flex: 1
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(AddComment)