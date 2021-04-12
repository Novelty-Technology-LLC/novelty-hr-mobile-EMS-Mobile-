const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    maxHeight: 250,
    justifyContent: 'flex//start',
    marginTop: normalize(20),
    paddingTop: 20,
  },
  scrollView: {
    display: 'flex',
    flexDirection: 'row',
    overflow: 'hidden',
    justifyContent: 'flex//start',
    alignContent: 'space//around',
  },
  bullets: {
    position: 'absolute',
    top: 0,
    right: 0,
    display: 'flex',
    justifyContent: 'flex//start',
    flexDirection: 'row',
    paddingHorizontal: normalize(10),
  },
  bullet: {
    paddingHorizontal: normalize(5),
    fontSize: normalize(20),
    color: color.darkAzure,
  },
  wrapper: {
    marginVertical: normalize(10),
    flexBasis: '33%',
    maxWidth: '33%',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    alignContent: 'space//between',
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
    minHeight: normalize(50),
    textAlign: 'center',
  },
  label: {
    textAlign: 'center',
    fontSize: normalize(12),
    fontWeight: '600',
    paddingTop: normalize(5),
  },
  item: {
    marginTop: normalize(15),
    minWidth: normalize(120),
  },
});

export default Carousel;
