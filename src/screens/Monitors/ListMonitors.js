import React, { Component } from 'react';
import {
  ScrollView,
  StyleSheet,
  Dimensions,
  Platform,
  TouchableOpacity,
  ActivityIndicator,
  View,
} from 'react-native';
import {
  Card, Block, NavBar, Icon, Text 
} from 'galio-framework';
import PropTypes from 'prop-types';
import api from './api';

// Galio components
import theme from '../../theme';

const { width } = Dimensions.get('screen');

export default class ListMonitors extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
  };

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

  getURLFavicon = url =>
    `https://s2.googleusercontent.com/s2/favicons?domain_url=${url}`;

  fetchMonitors() {
    api.getMonitors().then((res) => {
      if (res.error) {
        this.setState({
          loading: false,
          error: res.error.message,
        });
      } else {
        this.setState({
          loading: false,
          data: res.monitors,
          pagination: res.pagination,
        });
      }
    });
  }

  render() {
    const { loading, data, error, pagination } = this.state;
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
