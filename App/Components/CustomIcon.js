import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, Image } from 'react-native'
import styles from './Styles/CustomIconStyle'

export default class CustomIcon extends Component {
  static propTypes = {
    name: PropTypes.string,
  }

  render () {
    let path;
    switch (this.props.name) {
      case 'menu':
        path = require('../Images/Icon/menu.png');
        break;
      case 'search':
        path = require('../Images/Icon/search.png');
        break;
      case 'list':
        path = require('../Images/Icon/list.png');
        break;
      case 'add':
        path = require('../Images/Icon/add.png');
        break;
      case 'remove':
        path = require('../Images/Icon/remove.png');
        break;
      case 'mail':
        path = require('../Images/Icon/mail.png');
        break;
      case 'print':
        path = require('../Images/Icon/print.png');
        break;
      case 'edit':
        path = require('../Images/Icon/edit.png');
        break;
      case 'save':
        path = require('../Images/Icon/save.png');
        break;
      case 'tag':
        path = require('../Images/Icon/tag.png');
        break;
      case 'dropbox':
        path = require('../Images/Icon/dropbox.png');
        break;
      case 'cut_dollar':
        path = require('../Images/Icon/cut_dollar.png');
        break;
      case 'arrow':
        path = require('../Images/Icon/arrow.png');
        break;
      case 'controls':
        path = require('../Images/Icon/controls.png');
        break;
      case 'settings':
        path = require('../Images/Icon/settings.png');
        break;
      case 'calculator':
        path = require('../Images/Icon/calculator.png');
        break;
      case 'print_big':
        path = require('../Images/Icon/print_big.png');
        break;

      case 'black_add':
        path = require('../Images/Icon/black_add.png');
        break;
      case 'black_close':
        path = require('../Images/Icon/black_close.png');
        break;
      case 'black_calendar':
        path = require('../Images/Icon/black_calendar.png');
        break;
      case 'black_save':
        path = require('../Images/Icon/black_save.png');
        break;
      case 'black_back':
        path = require('../Images/Icon/black_back.png');
        break;
      case 'black_tag':
        path = require('../Images/Icon/black_tag.png');
        break;
      case 'black_dropbox':
        path = require('../Images/Icon/black_dropbox.png');
        break;
      case 'black_cut_dollar':
        path = require('../Images/Icon/black_cut_dollar.png');
        break;
      case 'black_arrow':
        path = require('../Images/Icon/black_arrow.png');
        break;
      case 'black_controls':
        path = require('../Images/Icon/black_controls.png');
        break;
      case 'black_settings':
        path = require('../Images/Icon/black_settings.png');
        break;
      case 'black_calculator':
        path = require('../Images/Icon/black_calculator.png');
        break;
      case 'black_print_big':
        path = require('../Images/Icon/black_print_big.png');
        break;

      case 'green_mail':
        path = require('../Images/Icon/green_mail.png');
        break;
    }
    return (
      <View style={styles.container}>
        <Image source={path} style={styles.icon} />
      </View>
    )
  }
}
