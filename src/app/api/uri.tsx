import { Platform } from 'react-native';
export const BASE_URI =
<<<<<<< HEAD
  Platform.OS == 'ios' ? 'http://127.0.0.1:8088' : 'http://10.0.2.2:8088';

=======
  Platform.OS === 'ios'
    ? 'http://127.0.0.1:8080'
    : 'http://60033ed05b28.ngrok.io';
>>>>>>> 107f40be1d5895a3e220cb39203c14d53ce5259f
