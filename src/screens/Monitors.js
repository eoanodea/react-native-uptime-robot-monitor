import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Dimensions,
  Platform,
  TouchableOpacity,
  ActivityIndicator,
  View,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import {
  Card, Block, NavBar, Icon, Text,
} from 'galio-framework';
import api from './api';

// Galio components
import theme from '../theme';

const { width } = Dimensions.get('screen');

const cards = [
  {
    id: 1,
    image:
      'https://images.unsplash.com/photo-1494252713559-f26b4bf0b174?w=840&q=300',
    avatar: 'http://i.pravatar.cc/100',
    title: 'Christopher Moon',
    caption: '138 minutes ago',
    location: 'Los Angeles, CA',
  },
  {
    id: 2,
    image:
      'https://images.unsplash.com/photo-1503631285924-e1544dce8b28?&w=1200&h=1600&fit=crop&crop=entropy&q=300',
    avatar: 'http://i.pravatar.cc/100',
    title: 'Christopher Moon',
    caption: '138 minutes ago',
    location: 'Los Angeles, CA',
  },
  {
    id: 3,
    image:
      'https://images.unsplash.com/photo-1497802176320-541c8e8de98d?&w=1600&h=900&fit=crop&crop=entropy&q=300',
    avatar: 'http://i.pravatar.cc/100',
    title: 'Christopher Moon',
    caption: '138 minutes ago',
    location: 'Los Angeles, CA',
    padded: true,
  },
  {
    id: 4,
    image:
      'https://images.unsplash.com/photo-1490049350474-498de43bc885?&w=1600&h=900&fit=crop&crop=entropy&q=300',
    avatar: 'http://i.pravatar.cc/100',
    title: 'Christopher Moon',
    caption: '138 minutes ago',
    location: 'Los Angeles, CA',
    padded: true,
  },
  {
    id: 5,
    image:
      'https://images.unsplash.com/photo-1493612216891-65cbf3b5c420?&w=1500&h=900&fit=crop&crop=entropy&q=300',
    avatar: 'http://i.pravatar.cc/100',
    title: 'Christopher Moon',
    caption: '138 minutes ago',
    full: true,
  },
  {
    id: 6,
    image:
      'https://images.unsplash.com/photo-1506321806993-0e39f809ae59?&w=1500&h=1900&fit=crop&crop=entropy&q=300',
    avatar: 'http://i.pravatar.cc/100',
    title: 'Christopher Moon',
    caption: '138 minutes ago',
    full: true,
  },
];

export default class Monitors extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      error: null,
      data: null,
      pagination: null,
    };
  }

  componentDidMount() {
    this.fetchMonitors();
  }

  getURLFavicon = url => `https://s2.googleusercontent.com/s2/favicons?domain_url=${url}`

  fetchMonitors() {
    api.getMonitors().then((res) => {
      if (res.error) {
        console.log('error!', res.error);
        this.setState({
          loading: false,
          error: res.error.message,
        });
      } else {
        console.log('data!', res);
        this.setState({
          loading: false,
          data: res.monitors,
          pagination: res.pagination,
        });
      }
    });
  }

  render() {
    const {
      loading, data, error, pagination,
    } = this.state;
    const { navigation } = this.props;
    return (
      <Block safe flex style={{ backgroundColor: theme.COLORS.WHITE }}>
        <NavBar
          title={pagination ? `Monitors: ${pagination.total}` : 'Monitors'}
          left={(
            <TouchableOpacity onPress={() => navigation.openDrawer()}>
              <Icon
                name="menu"
                family="feather"
                size={theme.SIZES.BASE}
                color={theme.COLORS.ICON}
              />
            </TouchableOpacity>
          )}
          style={
            Platform.OS === 'android' ? { marginTop: theme.SIZES.BASE } : null
          }
        />
        <ScrollView contentContainerStyle={styles.cards}>
          <Block flex space="between">
            {loading ? (
              <ActivityIndicator />
            ) : error ? (
              <Text>
                Error!
                {' '}
                {error}
              </Text>
            ) : (
              <View>
                {data.map((dat, i) => (
                  <Card
                    key={i}
                    flex
                    borderless
                    shadowColor={theme.COLORS.BLACK}
                    style={styles.card}
                    title={dat.friendly_name}
                    caption={dat.url}
                    avatar={this.getURLFavicon(dat.url)}
                    location={dat.status === 2 ? 'Active' : 'Down'}
                    image="https://i1.wp.com/wspace.ie/wp-content/uploads/2019/03/image-from-rawpixel-id-478019-deriv-trial-e1552834536557.png?fit=1200%2C800&ssl=1"
                  />
                ))}
              </View>
            )}
          </Block>
        </ScrollView>
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  cards: {
    width,
    backgroundColor: theme.COLORS.WHITE,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  card: {
    backgroundColor: theme.COLORS.WHITE,
    width: width - theme.SIZES.BASE * 2,
    marginVertical: theme.SIZES.BASE * 0.875,
    elevation: theme.SIZES.BASE / 2,
  },
  full: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
  },
  noRadius: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  rounded: {
    borderRadius: theme.SIZES.BASE * 0.1875,
  },
  gradient: {
    bottom: 0,
    left: 0,
    right: 0,
    height: 90,
    position: 'absolute',
    overflow: 'hidden',
    borderBottomRightRadius: theme.SIZES.BASE * 0.5,
    borderBottomLeftRadius: theme.SIZES.BASE * 0.5,
  },
});
