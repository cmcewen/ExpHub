import React from 'react-native'

import Label from 'ExpHub/components/Label.js'

let {
  Image,
  StyleSheet,
  Text,
  View,
} = React;

class IssueHeader extends React.Component {
  setNativeProps(nativeProps) {
    this._root.setNativeProps(nativeProps);
  }

  renderLabels() {
    return (
      <View style={styles.labelContainer}>
        {
          this.props.issue.labels.map((label) => {
            return <Label label={label} key={label.name}/>
          })
        }
      </View>
    )
  }

  render() {
    let title = this.props.issue.pull_request ?
      '[PR] ' + this.props.issue.title :
      this.props.issue.title

    return (
      <View style={styles.top} ref={component => this._root = component} {...this.props}>
        <View style={styles.left}>
          <Text style={styles.issueNumber}>{'#' + this.props.issue.number}</Text>
          <Image
            source={{uri: this.props.issue.user.avatar_url}}
            style={styles.avatar}
          />
        </View>
        <View style={styles.right}>
          <Text style={styles.issueTitle}>{title}</Text>
          {this.renderLabels()}
        </View>
      </View>
    )
  }
}

let styles = StyleSheet.create({
  top: {
    height: 100,
    flexDirection: 'row',
    padding: 10
  },
  issueTitle: {
    fontSize: 14,
    color: '#373743',
    marginBottom: 5,
    fontFamily: 'Helvetica Neue'
  },
  issueNumber: {
    color: '#373743',
    fontSize: 16,
    fontFamily: 'Helvetica Neue',
    fontWeight: '800'
  },
  issueBody: {
    color: '#373743',
    fontSize: 14,
    fontFamily: 'Helvetica Neue',
  },
  avatar: {
    marginTop: 12,
    height: 50,
    width: 50,
  },
  left: {
    width: 60,
    flexDirection: 'column',
  },
  right: {
    flex: 1,
    flexDirection: 'column'
  },
  labelContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    flexWrap: 'wrap'
  },
});

export default IssueHeader