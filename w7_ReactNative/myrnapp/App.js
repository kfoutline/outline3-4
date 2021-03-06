/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import { Button, ThemeProvider,CheckBox,SearchBar } from "react-native-elements";

const instructions = Platform.select({
  ios: "Press Cmd+R to reload,\n" + "Cmd+D or shake for dev menu",
  android:
    "Double tap R on your keyboard to reload,\n" +
    "Shake or press menu button for dev menu"
});

import HelloWorld from './components/HelloWorld';

type Props = {};
export default class App extends Component {
  constructor(){
    super();
    this.state = {
      keyword:''
    }

    this.updateSearch = this.updateSearch.bind(this)
  }
  updateSearch(keyword){
    this.setState({
      keyword
    })
  }
  render() {
    console.log(666);
    return (
      <View style={styles.container}>
        <HelloWorld/>
        <Text style={styles.welcome}>
          Hello, laoxie, Are you okey! Welcome to React Native!
        </Text>
        <Text style={styles.instructions}>To get started, edit App.js</Text>
        <Text style={styles.instructions}>{instructions}</Text>
        {/* <ThemeProvider> */}
        <Button title="Hey666!" />
        <CheckBox title="Click Here" checked={true} />
        <SearchBar
        placeholder="Type Here..."
        onChangeText={this.updateSearch}
        value={this.state.keyword}
      />
        {/* </ThemeProvider> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5
  }
});
