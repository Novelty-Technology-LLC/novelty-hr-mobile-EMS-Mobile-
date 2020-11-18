import React from 'react';
import { SafeAreaView } from 'react-native';
import RootNavigation from './src/app/navigations';
import { globalStyle as style } from './src/assets/styles/';

if (__DEV__) {
  import('./ReactotronConfig').then(() => console.log('Reactotron Configured'));
}

const App = (props: any) => {
  const { theme } = props;
  return (
    <SafeAreaView style={style.safeArea}>
      <RootNavigation />
    </SafeAreaView>
  );
};

export default App;
