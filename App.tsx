import React from 'react';
import { SafeAreaView } from 'react-native';
import RootNavigation from './src/app/navigations';
import { globalStyle as style } from './src/assets/styles';

const App = (props: any) => {
  return (
    <SafeAreaView style={style.safeArea}>
      <RootNavigation />
    </SafeAreaView>
  );
};

export default App;
