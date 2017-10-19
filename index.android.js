/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { AppRegistry, Image, View, Text, StyleSheet, TextInput, 
  ScrollView, FlatList, SectionList, Button, TouchableHighlight, 
  Animated, NativeModules, TouchableOpacity, LayoutAnimation, twirl, PixelRatio} from 'react-native';
import { StackNavigator, TabNavigator} from 'react-navigation';

class StopWatch extends Component {
  constructor () {
    super()
    this.state = {
      timerList: [],
      m: 0,
      s: 0,
      ms: 0,
      secondM: 0,
      secondS: 0,
      secondMs: 0,
      timesCount: 1,
      reSet: true,
      isCount: true,
      isStart: true,
      alreadyStart: false,
    }
  }

  titleChange() {
    this.setState({
      isStart: !this.state.isStart,
      alreadyStart: true,
    })

    if (this.state.isStart && !this.state.isCount) {
      this.setState({
        isCount: true
      })
    }

    if (!this.state.isStart) {
      this.setState({
        isCount: false
      })
    }
  }

  start() {
      this.titleChange()
      if (this.state.isStart) {
        this.interVal = setInterval(() => {
          this.secondCount();
          this.setState(previousState => {
            return {
              ms: previousState.ms + 100,
            }
          })
        }, 100);

        this.interVal2 =  setInterval(() => {
          this.setState(previousState => {
            this.secondCount()
            return {
              secondMs: previousState.secondMs + 100
            }
          })
        }, 100);
      }

     if (!this.state.isStart) {
        clearInterval(this.interVal);
        clearInterval(this.interVal2);
     }
  };

  count() {
    if (this.state.isCount) {
      this.setState({
        secondM: 0,
        secondS: 0,
        secondMs: 0
      });

      this.state.timerList.unshift(this.state);
      this.setState({
        timerList: this.state.timerList,
        timesCount: this.state.timesCount + 1
      })
    } else {
     this.setState({
      m: 0,
      s: 0,
      ms: 0,
      secondM: 0,
      secondS: 0,
      secondMs: 0,
      timesCount: 1,
      isCount: true,
      alreadyStart: false,
      timerList: []
     })
    }
  }

  secondCount() {
    if (this.state.s == 60) {
      this.setState ({
        m: this.state.m + 1,
        s: 0
      })
    }

    if (this.state.ms == 1000) {
      this.setState ({
        s: this.state.s + 1,
        ms: 0
      })
    }

    if (this.state.secondS == 60) {
      this.setState ({
        secondM: this.state.secondM + 1,
        secondS: 0
      })
    }

    if (this.state.secondMs == 1000) {
      this.setState ({
        secondS: this.state.secondS + 1,
        secondMs: 0
      })
    }
  }

	render () {
    const listLength = this.state.timerList.length;
		return (
      <View style = {{flex: 1}}>
        <View style = {styles.top}> 
          <Text style = {styles.font}>秒表</Text>
        </View>
        <View style = {styles.container}>
          <Board
            onClick = {this.start.bind(this)}
            onSubmit = {this.count.bind(this)}
            param = {this.state}
          />
          <TimerCountList
            param = {this.state}
            list = {this.state.timerList}
          />
        </View>
      </View>
		);
	}
};

class Board extends Component {
  render () {
    return (
      <View>
        <Text style = {styles.font1}>{this.props.param.m}:{this.props.param.s}.{this.props.param.ms}</Text>
        <View style = {{marginTop:10, flexDirection: 'row'}}>
          <View style={{flexDirection: 'row', marginRight: 90}}>
            <Button onPress = {this.props.onSubmit}  title = {this.props.param.isCount ? '计次': '复位'}/>
          </View>
          <View style={{flexDirection: 'row', marginLeft: 90}}>
            <Button onPress = {this.props.onClick}  title = {this.props.param.isStart ? '启动': '停止'}/>
          </View>
        </View>  
      </View>
    )
  }
}

class TimerCountList extends Component {
  render () {
    const listLength = this.props.list.length;
    let count = this.props.param.alreadyStart ? '计次' + this.props.param.timesCount + ':' + this.props.param.secondM + ':' + this.props.param.secondS + '.' + this.props.param.secondMs : null;
    return (
      <View>
        <Text style = {styles.font}>{count}</Text>
        <View>{this.props.list.map((list,i) => <TimeList list={list} key={i} index={ listLength - i}/>)}</View>
      </View>
    )
  }
}

class TimeList extends Component {
  render() {
    return (
      <View>
        <Text style = {styles.font}>
          计次{this.props.index}:{this.props.list.secondM}:{this.props.list.secondS}.{this.props.list.secondMs}
        </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  top: {
    backgroundColor: '#333333', 
    alignItems: 'center'
  },
  container: {
    flex:1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  font: {
    color: "white",
  },
  font1: {
    color: "white",
    fontSize:80
  }
});

AppRegistry.registerComponent('Bananas', () => StopWatch );
