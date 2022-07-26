import {Dimensions, StyleSheet} from 'react-native';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(110, 46, 149, 0.375)',
  },
  heading: {
    color: '#fff',
    fontSize: 25,
    fontWeight: '800',
  },
});

export default styles;
