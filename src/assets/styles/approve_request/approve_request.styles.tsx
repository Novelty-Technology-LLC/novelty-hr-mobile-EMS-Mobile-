import { Platform, StyleSheet } from 'react-native';
import colors from '../../colors';
import { theme } from '../theme';
import normalize from 'react-native-normalize';

const approveRequest = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingHorizontal: normalize(20),
  },
  headerDate: {
    color: colors.fontGrey,
    fontSize: normalize(theme.size.xs),
    marginLeft: normalize(theme.spacing.wider),
  },
  scrollView: { flex: 1 },
  requestView: {
    flex: 0.6,
    flexDirection: 'column',
  },
  main: {
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    paddingBottom: normalize(15),
  },
  imageView: {
    paddingTop: normalize(15),
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: normalize(40),
    height: normalize(40),
    borderRadius: normalize(25),
    marginRight: normalize(10),
  },
  senderView: { marginLeft: normalize(10), flex: 1 },
  sender: { fontSize: normalize(theme.size.base), fontWeight: '500' },
  dateView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: normalize(4),
  },
  leaveType: {
    fontSize: normalize(theme.size.xxs),
    fontWeight: '500',
    textTransform: 'uppercase',
  },
  date: {
    fontSize: normalize(theme.size.xxs),
    color: colors.fontGrey,
  },
  sectionView: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  sectionHeader: {
    paddingTop: normalize(15),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  calander: { marginLeft: normalize(10), color: colors.fontGrey },
  sectionDateView: { flex: 1, flexDirection: 'row', alignItems: 'center' },
  sectionDate: { marginLeft: normalize(5), fontSize: theme.size.xs },
  sectionBody: {
    flex: 1,
    paddingTop: normalize(10),
    paddingLeft: normalize(10),
    overflow: 'hidden',
  },
  note: { lineHeight: normalize(theme.size.lg) },
  responseView: {
    flex: 1,
    marginTop: normalize(20),
    marginLeft: normalize(10),
  },
  response: {
    fontSize: normalize(theme.size.base),
  },
  spacer: { marginTop: normalize(theme.spacing.wider) },
  teamLeadView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  teamLead: {
    fontSize: normalize(theme.size.xxs),
    marginTop: normalize(1),
    color: colors.fontGrey,
  },
  leadText: {
    marginTop: normalize(15),
    lineHeight: normalize(theme.size.lg),
  },
  buttonView: {
    flex: 0.1,
    backgroundColor: colors.white,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: normalize(5),
    paddingHorizontal: normalize(20),
    marginBottom: normalize(0),
  },
  buttonApprove: {
    paddingHorizontal: normalize(55),
    paddingVertical: normalize(15),
    fontSize: normalize(theme.size.base),
    backgroundColor: colors.primary,
    color: colors.white,
    fontWeight: '600',
    ...Platform.select({
      ios: {
        borderRadius: normalize(5),
      },
      android: {
        borderRadius: normalize(5),
      },
    }),
  },
  buttonDeny: {
    paddingHorizontal: normalize(55),
    paddingVertical: normalize(15),
    fontSize: normalize(theme.size.base),
    backgroundColor: colors.white,
    color: colors.primary,
    borderWidth: 1,
    borderColor: colors.primary,
    fontWeight: '600',
    ...Platform.select({
      ios: {
        borderRadius: normalize(5),
      },
      android: {
        borderRadius: normalize(5),
      },
    }),
  },
});

export { approveRequest };
