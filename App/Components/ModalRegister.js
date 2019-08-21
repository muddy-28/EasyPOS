import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity, Modal } from 'react-native';
import { Dropdown } from 'react-native-material-dropdown'
import styles from './Styles/ModalRegisterStyle';
import CustomIcon from './CustomIcon';
import { Colors } from '../Themes';

const FIRST_COMPANY_DATA = {index: 0, id: -1, value: 'Select an company'}
const FIRST_REGISTER_DATA = {index: 0, id: -1, value: 'Select an Register'}

export default class ModalRegister extends Component {
  static propTypes = {
    visible: PropTypes.bool,
    companies: PropTypes.array,
    registers: PropTypes.array,
    onClickOkay: PropTypes.func,
  }

  constructor(props) {
    super(props)

    this.state = {
      companies: this.getCompanies(this.props),
      registers: this.getRegisters(this.props),
      selectedCompanyIndex: 0,
      selectedRegisterIndex: 0,
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.companies != nextProps.companies) {
      this.setState({ companies: this.getCompanies(nextProps) });
    }
    if (this.props.registers != nextProps.registers) {
      this.setState({ registers: this.getRegisters(nextProps) });
    }
  }

  getCompanies(props) {
    let companies = [FIRST_COMPANY_DATA];
    props.companies && props.companies.forEach((c, i) => {
      companies.push({index: i + 1, id: c.id, value: c.name_of_company})
    });
    return companies;
  }

  getRegisters(props) {
    let registers = [];
    props.registers && props.registers.forEach((r, i) => {
      registers.push({index: i + 1, id: r.id, company_id: r.company_id, value: r.pin})
    });
    return registers;
  }

  getRegistersByCompany(company_id) {
    let registers = [FIRST_REGISTER_DATA];
    this.state.registers && this.state.registers.filter(r => r.company_id == company_id).forEach((r, i) => {
      registers.push(r);
    })
    return registers;
  }

  onClickOkay() {
    const company_id = this.state.companies[this.state.selectedCompanyIndex].id;
    const register_id = this.getRegistersByCompany(company_id)[this.state.selectedRegisterIndex].id;
    this.props.onClickOkay(company_id, register_id);
  }

  render () {
    const company_id = this.state.companies[this.state.selectedCompanyIndex].id || 0;
    const registers = this.getRegistersByCompany(company_id);
    const disabled = this.state.selectedCompanyIndex == 0 || this.state.selectedRegisterIndex == 0;
    
    return (
      <Modal animationType="slide" transparent={true} visible={this.props.visible} supportedOrientations={['portrait', 'portrait-upside-down', 'landscape', 'landscape-left', 'landscape-right']}>
        <View style={styles.screenContainer}>
          <View style={styles.modal}>
            <Dropdown 
              labelHeight={0}
              textColor='black' 
              itemColor='black' 
              baseColor={Colors.text1}
              fontSize={14}
              selectedItemColor='blue' 
              value={this.state.companies[this.state.selectedCompanyIndex].value}
              containerStyle={styles.dropdown}
              data={this.state.companies} 
              onChangeText={(value, index) => this.setState({selectedCompanyIndex: index, selectedRegisterIndex: 0})}
            />
            <Dropdown 
              labelHeight={0}
              textColor='black' 
              itemColor='black' 
              baseColor={Colors.text1}
              fontSize={14}
              selectedItemColor='blue' 
              value={registers[this.state.selectedRegisterIndex].value}
              containerStyle={styles.dropdown}
              data={registers} 
              onChangeText={(value, index) => this.setState({selectedRegisterIndex: index})}
            />

            <TouchableOpacity disabled={disabled} onPress={() => this.onClickOkay()} style={styles.buttonContainer}>
              <Text style={[styles.buttonText, disabled ? {color: Colors.text2} : null]}>Ok</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    )
  }
}
