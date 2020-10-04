import { Platform, StyleSheet } from 'react-native';
import colors from '../../colors';
import { theme, fonts } from '../theme';
import normalize from 'react-native-normalize';

const approveRequest = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingHorizontal: normalize(20),
  },
  headerDate: {
    fontFamily: fonts.poppinsMedium,
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
  senderView: { marginLeft: normalize(8), flex: 1 },
  sender: {
    fontSize: normalize(theme.size.base),
    fontFamily: fonts.mulishBold,
    textTransform: 'capitalize',
  },
  dateView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: normalize(4),
  },
  leaveType: {
    fontSize: normalize(theme.size.xxs),
    fontFamily: fonts.poppinsMedium,
    textTransform: 'uppercase',
    color: colors.fontGrey,
  },
  date: {
    fontSize: normalize(theme.size.xxs),
    color: colors.fontGrey,
  },
  sendView: {
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  send: {
    color: colors.white,
    padding: normalize(3),
    backgroundColor: colors.primary,
    borderWidth: 1,
    overflow: 'hidden',
    borderColor: colors.primary,
    borderRadius: normalize(8),
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
  sectionDate: {
    marginLeft: normalize(5),
    fontSize: normalize(theme.size.xs),
    color: colors.fontGrey,
  },
  sectionBody: {
    flex: 1,
    paddingTop: normalize(10),
    paddingLeft: normalize(10),
    overflow: 'hidden',
  },
  note: {
    fontFamily: fonts.mulishRegular,
    fontSize: normalize(theme.size.normal),
    lineHeight: normalize(theme.size.lg),
  },
  responseView: {
    flex: 1,
    marginTop: normalize(20),
    marginLeft: normalize(10),
  },
  response: {
    color: colors.fontGrey,
    fontFamily: fonts.poppinsMedium,
    fontSize: normalize(theme.size.base),
  },
  spacer: { marginTop: normalize(theme.spacing.wider) },
  teamWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  teamLeadView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  teamLead: {
    fontFamily: fonts.mulishRegular,
    fontSize: normalize(theme.size.xs),
    color: colors.fontGrey,
  },
  leadText: {
    fontFamily: fonts.mulishRegular,
    marginTop: normalize(15),
    lineHeight: normalize(theme.size.lg),
    opacity: 0.7,
  },
  text: {
    fontFamily: fonts.mulishRegular,
    fontSize: normalize(theme.size.xxs),
    color: colors.fontGrey,
  },
  buttonView: {
    flex: 0.1,
    backgroundColor: colors.white,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: normalize(5),
    paddingHorizontal: normalize(20),
  },
  approve: { color: colors.white, fontFamily: fonts.mulishBold },
  deny: { color: colors.primary, fontFamily: fonts.mulishBold },
  buttonApprove: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: fonts.mulishBold,
    fontSize: normalize(theme.size.base),
    backgroundColor: colors.primary,
    paddingHorizontal: normalize(55),
    paddingVertical: normalize(13),
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
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: fonts.mulishBold,
    fontSize: normalize(theme.size.base),
    backgroundColor: colors.white,
    color: colors.primary,
    borderWidth: 1,
    borderColor: colors.primary,
    paddingVertical: normalize(13),
    paddingHorizontal: normalize(55),
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
