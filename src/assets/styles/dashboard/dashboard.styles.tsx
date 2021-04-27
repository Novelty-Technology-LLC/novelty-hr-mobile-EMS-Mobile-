import { StyleSheet } from 'react-native';
import normalize from 'react-native-normalize';
import colors from '../../colors';

const dashboardStyle = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.white,
  },
  body: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: colors.white,
    paddingHorizontal: 20,
  },
  text: {
    color: colors.text,
    fontSize: 16,
  },
  gap: {
    marginTop: 5,
  },
  name: {
    color: colors.black,
    fontSize: 20,
    fontWeight: 'bold',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  work: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 20,
  },
  workText: {
    color: colors.white,
    fontSize: 12,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  image: {
    height: normalize(40),
    width: normalize(40),
    borderRadius: normalize(20),
  },
  wrapContainer: { flexDirection: 'row', flexWrap: 'wrap' },
  wrapItem: {
    width: '49%',
    marginTop: normalize(25),
    borderRadius: normalize(8),
  },
  timeLog: {
    marginTop: normalize(20),
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  marking: {
    marginTop: normalize(20),
    paddingRight: normalize(30),
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  markingGap: {
    marginLeft: normalize(7),
  },
  border: {
    height: 1,
    width: 20,
    borderRadius: 1,
    borderWidth: 1,
  },
});

export { dashboardStyle };
