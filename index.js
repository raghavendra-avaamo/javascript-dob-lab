// B/ parse various valid date lengths:
const parse_valid_length_date = (numerical_date_input) => {
  console.log(
    "S02B_Input Check:",
    numerical_date_input,
    typeof numerical_date_input
  );

  if (numerical_date_input.length === 8) {
    return eigth_to_epoch(numerical_date_input);
  }

  if (numerical_date_input.length === 4) {
    return four_to_epoch(numerical_date_input);
  }

  if (numerical_date_input.length === 5) {
    return process_five(numerical_date_input);
  }
};

const four_to_epoch = (four_digit_string_input) => {
  console.log("received input: ", four_digit_string_input);

  // validate input before using function - does not error handle
  // expects a four digit number in string format

  //     capture month -----------------------------------------------------
  const supposed_month = four_digit_string_input[0];
  console.log("supposed_month: ", supposed_month, typeof supposed_month);

  // capture day -----------------------------------------------------
  const supposed_day = four_digit_string_input[1];
  console.log("supposed_day: ", supposed_day, typeof supposed_day);

  //     capture year -----------------------------------------------------
  const supposed_short_year = new Date(four_digit_string_input.slice(2, 4))
    .getFullYear()
    .toString();

  const supposed_full_year = short_to_full_year(supposed_short_year)

  console.log("supposed_year: ", supposed_year, typeof supposed_year);


  //     assemble and return validated epoch date -----------------------------------------
  const assembled_date_string =
    supposed_month + "-" + supposed_day + "-" + supposed_year;
  console.log("assembled_date_string: ", assembled_date_string);

  const epoch_date_number = Date.parse(assembled_date_string);
  console.log(
    "epoch_date_number: ",
    epoch_date_number,
    typeof epoch_date_number
  );
  return epoch_date_number;
};

const process_five = (five_digit_string_input) => {
  // validate input before using function - does not error handle
  // expects a five digit number in string format
  // expected formats
  // M-DD-YY
  // MM-D-YY
};

const process_six = (six_digit_string_input) => {
  pass;
};

const process_seven = (seven_digit_string_input) => {
  pass;
};

const eigth_to_epoch = (eigth_digit_string_input) => {
  // validate input length before using function - does not error handle for invalid input length 
  // expects a eigth digit number in string format 
  // MM-DD-YYYY

  //     capture month -----------------------------------------------------
  const supposed_month = eigth_digit_string_input.slice(0, 2);
  console.log("supposed_month: ", supposed_month, typeof supposed_month);

  // capture day -----------------------------------------------------
  const supposed_day = eigth_digit_string_input.slice(2, 4);
  console.log("supposed_day: ", supposed_day, typeof supposed_day);

  //     capture year -----------------------------------------------------
  const supposed_year = eigth_digit_string_input.slice(4);
  console.log("supposed_year: ", supposed_year, typeof supposed_year);

  if (
    validate_month_string(supposed_month) &&
    validate_day_string(supposed_day, supposed_month) &&
    is_valid_leap_year_date(supposed_day, supposed_month, supposed_year)
  ) {
    //     assemble and return validated epoch date -----------------------------------------
    const assembled_date_string =
      supposed_month + "-" + supposed_day + "-" + supposed_year;
    console.log("assembled_date_string: ", assembled_date_string);

    const epoch_date_number = Date.parse(assembled_date_string);
    console.log(
      "epoch_date_number: ",
      epoch_date_number,
      typeof epoch_date_number
    );
    return epoch_date_number;
  } else {
    return false;
  }
};

/* DOB HELPER FUNCTIONS ---------------------------------------- */

// A1/ leap year tester function:
const is_leap_year = (int_year) => {
  if (int_year % 400 === 0) {
    return true;
  } else if (int_year % 100 === 0) {
    return false;
  } else if (int_year % 4 === 0) {
    return true;
  } else {
    return false;
  }
};
// A2/ month string tester function:
const validate_month_string = (month_string) => {
  const numerical_supposed_month = parseInt(month_string);

  if (numerical_supposed_month < 1 || numerical_supposed_month > 12) {
    console.log("valid month check fails");
    return false;
  }

  return true;
};
// A3/ day string tester function:
const validate_day_string = (day_string, month_string) => {
  const numerical_supposed_month = parseInt(month_string);

  const numerical_supposed_day = parseInt(day_string);

  const thirty_one_day_months = [1, 3, 5, 7, 8, 10, 12];
  const thirty_day_months = [4, 6, 9, 11];

  //     check if day is appropriate for 31 day months
  if (
    thirty_one_day_months.includes(numerical_supposed_month) &&
    numerical_supposed_day > 31
  ) {
    console.log("valid day check fails");
    return false;
  }

  // check if day is appropriate for 30 day months
  if (
    thirty_day_months.includes(numerical_supposed_month) &&
    numerical_supposed_day > 30
  ) {
    console.log("valid day check fails");
    return false;
  }

  // check if day is appropriate for feb
  if (numerical_supposed_month === 2 && numerical_supposed_day > 29) {
    console.log("valid day check fails");
    return false;
  }

  return true;
};
// A4/ valid leap year date tester function:
const is_valid_leap_year_date = (
  day_string,
  month_string,
  full_year_string
) => {
  //     validate leap year date ----------------------------------------------
  const numerical_supposed_year = parseInt(full_year_string);
  const numerical_supposed_month = parseInt(month_string);
  const numerical_supposed_day = parseInt(day_string);
  console.log("Is Leap Year?: ", is_leap_year(numerical_supposed_year));
  console.log("numerical_supposed_month: ", numerical_supposed_month);
  console.log("numerical_supposed_day: ", numerical_supposed_day);
  console.log("numerical_supposed_year: ", numerical_supposed_year);

  if (
    !is_leap_year(numerical_supposed_year) &&
    numerical_supposed_month === 2 &&
    numerical_supposed_day >= 29
  ) {
    console.log("date fails valid leap year check");
    return false;
  }

  return true;
};

// B1/ two digit year to gour digit year estimator function:
const short_to_full_year = (short_year_string) => {

  const numerical_short_year = parseInt(short_year_string)

  if (numerical_short_year > 1 && numerical_short_year < 32) {
    return '20' + short_year_string
  } else {
    return (new Date(short_year_string).getFullYear()).toString()
  }

}

// C1/ 5 digit tester - A (M-DD-YY)
const five_digit_mddyy_handler = (five_digit_mddyy_input) => {
  //     capture month -----------------------------------------------------
  const supposed_month = five_digit_mddyy_input[0];
  console.log("supposed_month: ", supposed_month, typeof supposed_month);

  // capture day -----------------------------------------------------
  const supposed_day = five_digit_mddyy_input.slice(1, 3);
  console.log("supposed_day: ", supposed_day, typeof supposed_day);

  // capture year -----------------------------------------------------
  // const supposed_year = (new Date(five_digit_mddyy_input.slice(3)).getFullYear()).toString();
  const supposed_year = five_digit_mddyy_input.slice(3);
  console.log("supposed_year: ", supposed_year, typeof supposed_year);

  //     assemble and return validated epoch date -----------------------------------------
  const assembled_date_string =
    supposed_month + "-" + supposed_day + "-" + supposed_year;
  console.log("assembled_date_string: ", assembled_date_string);

  const epoch_date_number = Date.parse(assembled_date_string);
  console.log(
    "epoch_date_number: ",
    epoch_date_number,
    typeof epoch_date_number
  );
  return epoch_date_number;
};
// C2/ 5 digit tester - A (MM-D-YY)

// FUNCTION CALLS WITH DUMMY DATA -------------------------------------------------------------------

/* 8 DIGIT CASES ---------------------------------------------- */
// valid date
// parse_valid_length_date("12112000");

// invaid date
// console.log(parse_valid_length_date('12332000'))

/* 4 DIGIT CASES ---------------------------------------------- */
// process_four("9909")
// parse_valid_length_date("9909");

// invaid date
// process_four("0909")
// console.log(parse_valid_length_date("0909"));

/* 5 DIGIT CASES ---------------------------------------------- */
// five_digit_mddyy_handler("91308");
