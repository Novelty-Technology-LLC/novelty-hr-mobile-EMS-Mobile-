import { WSnackBar } from 'react-native-smart-tip';

const snackErrorBottom = (err) => {
  const snackBarOpts = {
    data: err.message.slice(0, 35),
    position: WSnackBar.position.BOTTOM,
    duration: WSnackBar.duration.LONG,
    textColor: '#ff490b',
    backgroundColor: '#050405',
    actionTextColor: '#ff490b',
  };
  return WSnackBar.show(snackBarOpts);
};

export { snackErrorBottom };
