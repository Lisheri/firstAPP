import React, { useState, useEffect } from 'react';

import { Button, View, Text, StyleSheet } from 'react-native';

// import { NavigationContainer, StackActions } from '@react-navigation/native';

// import { createStackNavigator } from '@react-navigation/stack';

import RootStore from './mobx';

import Nav from './src/nav'

// import Login from './src/views/account/login/index';

// * inject 用于注入
import { Provider, inject, observer, useObserver } from 'mobx-react'

// import MobxUse from './src/views/mobxUse'
// import TestBtn from './src/views/mobxUse/testBtn'

// import {
//   SafeAreaView,
//   StyleSheet,
//   ScrollView,
//   View,
//   Text,
//   StatusBar,
//   Dimensions, // * 用于获取屏幕宽高
//   TouchableOpacity, // * 用于点击事件
// } from 'react-native';

// const screenWidth = Math.round(Dimensions.get('window').width); // * 获取设备宽度
// const screenHeight = Math.round(Dimensions.get('window').height); // * 获取设备高度

// import {
//   Header,
//   LearnMoreLinks,
//   Colors,
//   DebugInstructions,
//   ReloadInstructions,
// } from 'react-native/Libraries/NewAppScreen';


// // const Test = 

// const TestChild = inject("RootStore")(observer((props) => {

//   const [count, setCount] = useState(0);
//   const { name } = props.RootStore
//   useEffect(() => {
//     console.info(count)
//     console.info(props.RootStore.name)
//   }, [count])

//   const handlePlus = () => {
//     setCount(count + 1);
//   }

//   const handleReduce = () => {
//     setCount(count - 1);
//   }

//   const handleChangeName = () => {
//     props.RootStore.changeName(`悟空${count}`)
//   }

//   return (<View style={{ width: screenWidth, height: screenHeight / 6, backgroundColor: 'green' }}>
//     <View style={{ display: 'flex', flexDirection: 'row' }}>
//       <TouchableOpacity style={styles.button} onPress={handlePlus}><Text>{`点击+1`}</Text></TouchableOpacity>
//       <TouchableOpacity style={styles.button} onPress={handleReduce}><Text>{`点击-1`}</Text></TouchableOpacity>
//       <TouchableOpacity style={styles.button} onPress={handleChangeName}><Text>{`点击改名`}</Text></TouchableOpacity>
//     </View>
//     <Text>{count}</Text>
//     {count > 80 ? <Text>罗云大帝死亡</Text> : <Text>罗云大帝出生</Text>}
//     <View>
//       <Text>{name}</Text>
//     </View>
//   </View>)
// }))

const App: () => React$Node = () => {
  return (
    <View style={{flex: 1}}>
      <Nav />
    </View>
//     <Provider RootStore={RootStore}>
//       <StatusBar barStyle="dark-content" />
//       <SafeAreaView>
//         <ScrollView
//           contentInsetAdjustmentBehavior="automatic"
//           style={styles.scrollView}>
//           <Header />
//           {global.HermesInternal == null ? null : (
//             <View style={styles.engine}>
//               <Text style={styles.footer}>Engine: Hermes</Text>
//             </View>
//           )}
//           <View style={styles.body}>
//             <View style={styles.sectionContainer}>
//               {/* 
//                 // * 文本必须包裹在Text组件下面,
//                 // * rn中样式没有继承
//                 // * RN 中不需要加px, 设别会自适应, 也没有vw vh, 但是可以使用百分比
//               */}
//               {/* <Text style={styles.sectionTitle}>第一步</Text>
//               <Text style={styles.sectionDescription}>
//                 Edit <Text style={styles.highlight}>App.js</Text> to change this
//                 screen and then come back to see your edits.
//               </Text> */}
//             </View>
//             <TestChild />
//             <TestBtn />
//             {/* <MobxUse screenWidth={screenWidth} screenHeight={screenHeight}/> */}
//           </View>
//         </ScrollView>
//       </SafeAreaView>
//     </Provider>
  );
};

const styles = StyleSheet.create({
  // scrollView: {
  //   backgroundColor: Colors.lighter,
  // },
  // engine: {
  //   position: 'absolute',
  //   right: 0,
  // },
  // body: {
  //   backgroundColor: Colors.white,
  // },
  // sectionContainer: {
  //   marginTop: 32,
  //   paddingHorizontal: 24,
  // },
  // sectionTitle: {
  //   fontSize: 24,
  //   fontWeight: '600',
  //   color: Colors.black,
  // },
  // sectionDescription: {
  //   marginTop: 8,
  //   fontSize: 18,
  //   fontWeight: '400',
  //   color: Colors.dark,
  // },
  // highlight: {
  //   fontWeight: '700',
  // },
  // footer: {
  //   color: Colors.dark,
  //   fontSize: 12,
  //   fontWeight: '600',
  //   padding: 4,
  //   paddingRight: 12,
  //   textAlign: 'right',
  // },
  // button: {
  //   alignItems: "center",
  //   backgroundColor: "#DDDDDD",
  //   padding: 10,
  //   width: screenWidth / 5,
  //   height: 50,
  //   fontSize: 16
  // },
});

export default App;