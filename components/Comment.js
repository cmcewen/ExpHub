import React from 'react-native'
import Markdown from 'react-native-markdown'

let {
  Animated,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} = React;

class Comment extends React.Component {
  render() {
    let text =
      //Markdown y u no work
      //this.state.expanded ?
      //<Markdown plainText={styles.issueBody}>{this.props.issue.body}</Markdown> :
      <Text>{this.props.comment.body}</Text>

    return (
      <View style={styles.commentBox}>
        <View style={styles.left}>
          <Image
            source={{uri: this.props.comment.user.avatar_url}}
            style={styles.avatar}
          />
          <Text style={styles.username}>{this.props.comment.user.login}</Text>
        </View>
        <View style={styles.right}>
          <Text style={styles.comment}>{text}</Text>
        </View>
      </View>
    )
  }
}

function textColorFromBackground(color) {
  return (parseInt(color, 16) > 0xffffff / 2) ? '#000' : '#fff';
}

let styles = StyleSheet.create({
  commentBox: {
    flex: 1,
    padding: 10,
    flexDirection: 'row',
    backgroundColor: 'white',
  },
  bottom: {
    flex: 1,
    paddingHorizontal: 10,
    paddingBottom: 10
  },
  username: {
    marginTop: 10,
    fontSize: 10,
    fontWeight: '800',
    color: '#373743',
    fontFamily: 'Helvetica Neue'
  },
  comment: {
    color: '#373743',
    fontSize: 12,
    fontFamily: 'Helvetica Neue',
  },
  avatar: {
    height: 50,
    width: 50,
  },
  left: {
    width: 70,
    flexDirection: 'column',
  },
  right: {
    flex: 1,
    flexDirection: 'column'
  },
});

export default Comment;