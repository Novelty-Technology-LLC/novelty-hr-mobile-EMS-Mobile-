import React from 'react';
import {SafeAreaView, Text, View} from 'react-native';
import RootNavigation from './src/app/navigations';
import {globalStyle as style} from './src/assets/styles/';

const App = (props: any) => {
  const {theme} = props;
  return (
    <SafeAreaView style={style.safeArea}>
      <RootNavigation />
    </SafeAreaView>
  );
};

export default App;
