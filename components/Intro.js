import React from 'react-native'

let {
  Dimensions,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} = React;

let {height, width} = Dimensions.get('window');

class Intro extends React.Component {
  render() {
    return (
      <View style={styles.introBox}>
        <Text style={styles.message}>
          {
            "Browse and comment on issues from any Github repo." +
            "Tap the issue to see comments - tap it again to close."
          }
        </Text>
        <TouchableHighlight onPress={this.props.onPress}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>Got it!</Text>
          </View>
        </TouchableHighlight>
      </View>
    )
  }
}

let styles = StyleSheet.create({
  introBox: {
    backgroundColor: '#5C6C60',
    position: 'absolute',
    left: width / 6,
    right: width / 6,
    bottom: height / 3.5,
    top: height / 3.5,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    shadowRadius: 3,
    shadowColor: '#000',
    shadowOpacity: 0.5,
    shadowOffset: { width: 1, height: 1 },
  },
  message: {
    width: width / 2,
    color: 'white',
    textAlign: 'center',
    fontFamily: 'Helvetica Neue',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 20,
  },
  button: {
    padding: 10,
    backgroundColor: '#CFD1AA',
    shadowRadius: 2,
    shadowColor: '#000',
    shadowOpacity: 0.5,
    shadowOffset: { width: 1, height: 1 },
  },
  buttonText: {
    color: '#373743',
    fontFamily: 'Helvetica Neue',
    fontSize: 24,
    fontWeight: '600'
  }
});

export default Intro