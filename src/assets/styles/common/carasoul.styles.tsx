import { StyleSheet } from 'react-native';
import normalize from 'react-native-normalize';
import colors from '../../colors';

const CarouselStyle = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'flex-start',
    backgroundColor: colors.snow,
    height: normalize(160),
  },
  scrollView: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignContent: 'space-around',
  },
  bullets: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingHorizontal: normalize(10),
    width: '100%',
    overflow: 'hidden',
  },
  bullet: {
    paddingHorizontal: normalize(5),
    fontSize: normalize(30),
    // color: color.darkAzure,
  },
  wrapper: {
    flexBasis: '100%',
    maxWidth: '100%',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    alignContent: 'space-between',
    justifyContent: 'center',
    marginRight: normalize(1),
  },
  icon: {
    alignSelf: 'center',
  },
  labelWrapper: {
    width: '100%',
    marginBottom: normalize(8),
    alignSelf: 'center',
    textAlign: 'center',
  },
  label: {
    textAlign: 'center',
    fontSize: normalize(12),
    fontWeight: '600',
  },
  item: {},
  itemContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    marginTop: normalize(-65),
    width: '100%',
  },
});

export { CarouselStyle };
