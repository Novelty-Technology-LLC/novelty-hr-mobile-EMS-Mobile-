import { StyleSheet } from 'react-native';
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
    alignItems: 'flex-start',
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
});

export { dashboardStyle };
