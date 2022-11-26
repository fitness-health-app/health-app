/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import 'react-native-gesture-handler';

import {RecoilRoot} from 'recoil';
import AppStack from './AppStack';

const App = () => {
  return (
    <RecoilRoot>
      <AppStack />
    </RecoilRoot>
  );
};

export default App;
