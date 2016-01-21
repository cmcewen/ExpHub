import React from 'react-native'

let {
  StyleSheet,
  Text,
  View,
} = React;

class Label extends React.Component {
  render() {
    return (
      <View style={[styles.labelBox, { backgroundColor: this.props.label.color}]}>
        <Text style={[styles.label,
          {color: textColorFromBackground(this.props.label.color)}]}>
            {this.props.label.name}
        </Text>
      </View>
    )
  }
}

function textColorFromBackground(color) {
  return (parseInt(color, 16) > 0xffffff / 2) ? '#000' : '#fff';
}

let styles = StyleSheet.create({
  labelBox: {
    height: 21,
    padding: 5,
    marginRight: 5,
    marginBottom: 5,
  },
  label: {
    fontFamily: 'Helvetica Neue',
    fontSize: 10,
    fontWeight: '600'
  }
});

export default Label