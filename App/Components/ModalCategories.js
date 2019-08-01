import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, Text, Modal, Image, TouchableOpacity } from 'react-native'
import styles from './Styles/ModalCategoriesStyle'
import { Colors, Images } from '../Themes'
import * as ext from '../Lib/helpers'

export default class ModalCategories extends Component {
  static propTypes = {
    visible: PropTypes.bool,
    categories: PropTypes.array,
    selectedId: PropTypes.number,
    onSelectCategory: PropTypes.func,
  }

  render () {
    return (
      <Modal animationType="slide" transparent={true} visible={this.props.visible} supportedOrientations={['portrait', 'portrait-upside-down', 'landscape', 'landscape-left', 'landscape-right']}>
        <View style={styles.categoriesModalContainer}>
          <Image source={Images.tailUp} resizeMode='cover' style={styles.categoryModalTail} />
          <View style={styles.categoriesModal}>
            <View style={styles.categoriesModalTitleRow}>
              <Text style={styles.categoriesModalTitle}>All Categories</Text>
            </View>
            {this.props.categories.map((c, index) => {
              return (
                <TouchableOpacity 
                  key={'category_' + index.toString()} 
                  onPress={() => this.props.onSelectCategory(c.id)} 
                  style={[styles.categoriesModalRow, this.props.selectedId == c.id ? {backgroundColor: ext.hexToRgba(Colors.mainColor, 0.3)} : null]}
                >
                  <Image source={c.image && c.image.url ? {uri: c.image.url} : Images.product} resizeMode='cover' style={styles.categoriesModalImage} />
                  <View style={styles.categoriesModalInfo}>
                    <Text style={styles.categoriesModalName}>{c.category}</Text>
                    <Text style={styles.categoriesModalNum}>{c.num.toString() + " Item(s)"}</Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </Modal>
    )
  }
}
