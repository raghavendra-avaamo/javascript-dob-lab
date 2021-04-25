// A/ allow 8 digit numbers to be parsed as dates:
const valid_numerical_date_length = (numerical_entity_input) => {

    //     check if numeric message is 8 digits:
    if (numerical_entity_input.length === 8 ) {
      return true
    } else {
      return false
    }
  
  }
  
  
  // B/ parse various valid date lengths:
  const parse_valid_length_date = (numerical_date_input) => {
  
    console.log(
      "JS02B_Input Check:",
      numerical_date_input,
      typeof numerical_date_input
    );
  
    if (numerical_date_input.length === 8) {
  
      //     capture month -----------------------------------------------------
      const supposed_month = numerical_date_input.slice(0, 2);
      console.log('supposed_month: ',supposed_month, typeof supposed_month);
  
      //     validate month
      const numerical_supposed_month = parseInt(supposed_month)
      if (numerical_supposed_month < 0 || numerical_supposed_month > 12) {
        return false
      }
  
      // capture day -----------------------------------------------------
      const supposed_day = numerical_date_input.slice(2, 4);
      console.log('supposed_day: ',supposed_day, typeof supposed_day);
  
      // validate day    
      const numerical_supposed_day = parseInt(supposed_day)
  
      const thirty_one_day_months = [1,3,5,7,8,10,12]
      const thirty_day_months = [4,6,9,11]
  
      //     check if day is appropriate for 31 day months
      if (thirty_one_day_months.includes(numerical_supposed_day) && numerical_supposed_day > 31){
        return false
      }
  
      // check if day is appropriate for 30 day months 
      if (thirty_day_months.includes(numerical_supposed_day) && numerical_supposed_day > 30){
        return false
      }   
  
      // check if day is appropriate for feb
      if (numerical_supposed_month === 2 && numerical_supposed_day > 29){
        return false
      } 
  
      //     capture year -----------------------------------------------------
      const supposed_year = numerical_date_input.slice(4);
      console.log('supposed_year: ',supposed_year, typeof supposed_year);
  
  
      //     validate leap year date ----------------------------------------------
      const numerical_supposed_year = parseInt(supposed_year)
      console.log('Is Leap Year?: ',is_leap_year(numerical_supposed_year))
      console.log('numerical_supposed_month: ',numerical_supposed_month)
      console.log('numerical_supposed_day: ',numerical_supposed_day)
  
      if (!is_leap_year(numerical_supposed_year) && numerical_supposed_month === 2 && numerical_supposed_day >= 29) {
        return false
      }
  
      //     assemble and return validated epoch date -----------------------------------------
      const assembled_date_string = supposed_month + '-' + supposed_day + '-' + supposed_year
      console.log('assembled_date_string: ',assembled_date_string)
  
      const epoch_date_number = Date.parse(assembled_date_string)
      console.log('epoch_date_number: ',epoch_date_number, typeof epoch_date_number)
      return epoch_date_number
    }
  };
  
  // C/ leap year tester function:
  const is_leap_year = (int_year) => {
    if (int_year % 400 === 0) {return true}
    else if (int_year % 100 === 0) {return false}
    else if (int_year % 4 === 0 ) {return true}
    else {return false}
  }