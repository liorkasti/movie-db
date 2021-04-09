import { Dimensions } from 'react-native'
import Config from 'react-native-config'

const { height, width } = Dimensions.get('screen')
const tabBarHeight = 54

export const APP_CONSTANT = {
  // api_base_url: Config.API_ENDPOINT,
  api_base_url: 'https://api.themoviedb.org/3',
  // api_key: `api_key=${Config.API_KEY}`,
  api_key: `api_key=2490cc7c5bae166cde5e69c074cf83ea`,
  goldenRatio: 1.618,
  width,
  height: height - tabBarHeight * 2
}


export const COLORS = {
  movieDark: '#0d253f',
  movieLight : '#01b4e4',
  movieGreen : '#90cea1',
  darkBkg : '#223343',
  lightCard : '#445565',
  favorite : '#FFDF00',
  remove : '#ff0000'
  // lightCard : '#4287f5'
};
