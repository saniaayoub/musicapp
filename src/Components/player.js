import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import {moderateScale} from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/FontAwesome';
import {playPause, setPlayObject} from '../Redux/actions';
import TrackPlayer, {
  Event,
  RepeatMode,
  State,
  usePlaybackState,
  useProgress,
  useTrackPlayerEvents,
} from 'react-native-track-player';
const Poppins = 'Poppins-Regular';

const Player = ({navigationProp}) => {
  const dispatch = useDispatch();
  const playerState = usePlaybackState();
  let play_Pause = useSelector(state => state.reducer.play_pause);
  let playObject = useSelector(state => state.reducer.play_object);

  useTrackPlayerEvents(
    [Event.PlaybackTrackChanged, Event.PlaybackQueueEnded],
    async event => {
      if (
        event.type === Event.PlaybackTrackChanged &&
        event.nextTrack != null
      ) {
        const track = await TrackPlayer.getTrack(event.nextTrack);
        trackObject();
        const {title} = track || {};
        console.log(track, 'track');
      } else if (event.type === Event.PlaybackQueueEnded) {
        await TrackPlayer.seekTo(0);
        play('pause');
      }
    },
  );

  const showToast = msg => {
    ToastAndroid.show(msg, ToastAndroid.SHORT);
  };

  const trackObject = async () => {
    let trackIndex = await TrackPlayer.getCurrentTrack();
    let trackObject = await TrackPlayer.getTrack(trackIndex);
    dispatch(setPlayObject(trackObject));
  };

  const next = async () => {
    await TrackPlayer.skipToNext()
      .then(async() => {
        trackObject();
        await TrackPlayer.play();
      })
      .catch(err => {
        showToast(err.toString().substring(6, 40));
        dispatch(playPause('pause'));
      });
  };

  const previous = async () => {
    await TrackPlayer.skipToPrevious()
      .then(async() => {
        trackObject();
        await TrackPlayer.play();
      })
      .catch(err => {
        showToast(err.toString().substring(6, 40));
        dispatch(playPause('pause'));
      });
  };

  const play = async c => {
    if (c == 'play') {
      await TrackPlayer.play();
    } else {
      await TrackPlayer.pause();
    }
    dispatch(playPause(c));
    trackObject();
    // await TrackPlayer.setRepeatMode(RepeatMode.Queue);
  };

  return (
    <TouchableOpacity
      onPress={() => navigationProp.navigate('NowPlaying')}
      style={styles.container}
    >
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        colors={['rgba(70, 12, 66,1)', 'rgba(0, 0, 0, 1)']}
        style={[styles.gradient, styles.row]}
      >
        <View style={[styles.music, styles.center, styles.row]}>
          <Icon name={'music'} color={'#fff'} size={moderateScale(35, 0.1)} />

          <View style={[styles.description]}>
            <Text style={[styles.text, styles.title]}>{playObject?.title}</Text>
            <Text style={[styles.text, styles.artist]}>
              {playObject?.artist}
            </Text>
          </View>
        </View>

        <View
          style={[styles.row, styles.center, styles.buttons, styles.marginR]}
        >
          <TouchableOpacity onPress={() => previous()}>
            <Icon
              name="backward"
              color={'#fff'}
              size={moderateScale(24, 0.1)}
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() =>
              play(playerState === State.Playing ? 'pause' : 'play')
            }
          >
            <Icon
              name={
                playerState === State.Playing ? 'pause-circle' : 'play-circle'
              }
              color={'#fff'}
              size={moderateScale(35, 0.1)}
              style={styles.buttons}
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => next()}>
            <Icon name="forward" color={'#fff'} size={moderateScale(24, 0.1)} />
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default Player;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    paddingHorizontal: moderateScale(20, 0.1),
    backgroundColor: 'transparent',
    position: 'absolute',
    bottom: 0,
  },
  gradient: {
    alignItems: 'center',
    marginBottom: moderateScale(60, 0.1),
    borderRadius: moderateScale(20, 0.1),
    borderBottomEndRadius: moderateScale(10, 0.1),
    zIndex: 1000,
    justifyContent: 'space-between',
  },
  music: {
    paddingVertical: moderateScale(10, 0.1),
    paddingHorizontal: moderateScale(15, 0.1),
  },
  row: {
    flexDirection: 'row',
  },
  description: {
    paddingLeft: moderateScale(15, 0.1),
  },
  text: {
    color: '#fff',
    fontFamily: Poppins,
  },
  title: {
    fontSize: moderateScale(14, 0.1),
  },
  artist: {
    fontSize: moderateScale(11, 0.1),
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttons: {
    paddingHorizontal: moderateScale(10, 0.1),
  },
  marginR: {
    marginRight: moderateScale(10, 0.1),
  },
});
