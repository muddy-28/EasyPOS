import React, { Component } from 'react'
import { connect } from "react-redux";
import { ActivityIndicator, StyleSheet, View, Dimensions } from 'react-native'

const { width, height } = Dimensions.get('window');

class LoadingIndicator extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const isLoading = this.props.fetching;

    return (
      isLoading && 
      (
        <View style={styles.container}>
          <ActivityIndicator size="large" color="#000000" />
        </View>
      )
    )
  }
}

const mapStateToProps = ({ pos }) => {
  return {
    fetching: pos.fetching,
  }
}

export default connect(mapStateToProps)(LoadingIndicator);

const styles = StyleSheet.create({
  container: {
    width : width,
    height: height,
    position: 'absolute',
    left: 0,
    top: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.5)'
  },
})