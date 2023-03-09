/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import 'react-native-gesture-handler';

import React, {useState, useEffect} from 'react';
import {RecoilRoot} from 'recoil';
import {Provider as PaperProvider} from 'react-native-paper';

import AppStack from './AppStack';
import Splash from './screens/Splash';

const App = () => {
  const [isInit, setIsInit] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsInit(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);
  return (
    <RecoilRoot>
      <PaperProvider>{isInit ? <Splash /> : <AppStack />}</PaperProvider>
    </RecoilRoot>
  );
};

export default App;
