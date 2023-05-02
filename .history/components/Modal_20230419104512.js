import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import DatePicker from 'react-native-datepicker';

class MyDatePicker extends Component {
  constructor(props) {
    super(props);
    this.state = { date: new Date() };
  }

  render() {
    return (
      <View style={styles.container}>
        <DatePicker
          style={styles.datePicker}
          date={this.state.date}
          mode="date"
          placeholder="select date"
          format="YYYY-MM-DD"
          minDate="2021-01-01"
          maxDate="2023-12-31"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          onDateChange={(date) => {
            this.setState({ date: date });
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  datePicker: {
    width: 200,
    marginTop: 20,
  },
});

export default MyDatePicker;
