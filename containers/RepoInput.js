import React from 'react-native'

import * as actions from 'ExpHub/actions.js'
import { bindActionCreators } from 'redux'
import {connect} from 'react-redux/native'

let {
  Animated,
  Easing,
  Image,
  ListView,
  ScrollView,
  StatusBarIOS,
  StyleSheet,
  Text,
  TextInput,
  View,
} = React;

function mapStateToProps(state) {
  return {
    repoInput: state.repoInput,
    error: state.repoInputError
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch)
}

class RepoInput extends React.Component {
  render() {
    return (
      <View style={styles.repoInput}>
        {this.props.error ?
          <Text style={styles.error}>{this.props.error}</Text> :
          <Text style={styles.hint}>Enter a repo:</Text>
        }
        <TextInput
          style={styles.repoTextInput}
          onChangeText={this.props.changeRepoInput}
          value={this.props.repoInput}
          multiline={false}
          autoCapitalize={'none'}
          autoCorrect={false}
          onSubmitEditing={this.props.fetchCurrentRepo}
        />
      </View>
    )
  }
}

let styles = StyleSheet.create({
  repoInput: {
    height: 74,
    padding: 10,
    backgroundColor: '#5C6C60',
  },
  repoTextInput: {
    flex: 1,
    paddingHorizontal: 5,
    backgroundColor: 'white',
    marginTop: 8
  },
  hint: {
    fontSize: 12,
    fontFamily: "Helvetica Neue",
    color: 'white',
  },
  error: {
    fontSize: 12,
    fontWeight: '600',
    fontFamily: "Helvetica Neue",
    color: '#801919',
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(RepoInput)