// B1/ routine to parse various valid date lengths:
const parse_valid_length_date = (numerical_date_input) => {
  console.log(
    "JS02B_Input Check:",
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

  if (numerical_date_input.length === 6) {
    return process_six(numerical_date_input);
  }

  if (numerical_date_input.length === 7) {
    return process_seven(numerical_date_input);
  }
};

// B2/ subroutines to parse various date lengths
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

  // capture year -----------------------------------------------------
  const supposed_year = eigth_digit_string_input.slice(4);
  console.log("supposed_year: ", supposed_year, typeof supposed_year);

  // validate and return epoch date -----------------------------------
  if (
    validate_month_string(supposed_month) &&
    validate_day_string(supposed_month, supposed_day) &&
    is_valid_leap_year_date(supposed_month, supposed_day, supposed_year)
  ) {
    return custom_date_string_to_epcoh(
      supposed_month,
      supposed_day,
      supposed_year
    );
  } else {
    return false;
  }
};

const four_to_epoch = (four_digit_string_input) => {
  console.log("received input: ", four_digit_string_input);

  // validate input length before using function - does not error handle
  // expects a four digit number in string format

  //     capture month -----------------------------------------------------
  const supposed_month = four_digit_string_input[0];
  console.log("supposed_month: ", supposed_month, typeof supposed_month);

  // capture day -----------------------------------------------------
  const supposed_day = four_digit_string_input[1];
  console.log("supposed_day: ", supposed_day, typeof supposed_day);

  // capture year -----------------------------------------------------
  const supposed_short_year = four_digit_string_input.slice(2, 4);
  console.log("supposed_short_year: ", supposed_short_year);
  const supposed_full_year = short_to_full_year(supposed_short_year);
  console.log(
    "supposed_full_year: ",
    supposed_full_year,
    typeof supposed_full_year
  );

  // validate and return epoch date -----------------------------------
  if (
    validate_month_string(supposed_month) &&
    validate_day_string(supposed_month, supposed_day) &&
    is_valid_leap_year_date(supposed_month, supposed_day, supposed_full_year)
  ) {
    return custom_date_string_to_epcoh(
      supposed_month,
      supposed_day,
      supposed_full_year
    );
  } else {
    return false;
  }
};

const process_five = (five_digit_string_input) => {
  // neither M-DD-YY or MM-D-YY
  if (
    !five_digit_mddyy_handler(five_digit_string_input) &&
    !five_digit_mmdyy_handler(five_digit_string_input)
  ) {
    return false;
  } else {
    // both M-DD-YY and MM-D-YY
    if (
      five_digit_mddyy_handler(five_digit_string_input) &&
      five_digit_mmdyy_handler(five_digit_string_input)
    ) {
      return [
        five_digit_mddyy_handler(five_digit_string_input),
        five_digit_mmdyy_handler(five_digit_string_input),
      ];
    }
    // M-DD-YY
    else if (
      five_digit_mddyy_handler(five_digit_string_input) &&
      !five_digit_mmdyy_handler(five_digit_string_input)
    ) {
      return five_digit_mddyy_handler(five_digit_string_input);
    }
    // MM-D-YY
    else if (
      !five_digit_mddyy_handler(five_digit_string_input) &&
      five_digit_mmdyy_handler(five_digit_string_input)
    ) {
      return five_digit_mmdyy_handler(five_digit_string_input);
    }
    // exception
    else {
      console.log("something went wrong in procesing five digit string input!");
      return false;
    }
  }
};

const process_six = (six_digit_string_input) => {
  // neither M-DD-YY or MM-D-YY
  if (
    !six_digit_mmddyy_handler(six_digit_string_input) &&
    !six_digit_mdyyyy_handler(six_digit_string_input)
  ) {
    return false;
  } else {
    // both MM-DD-YY and M-D-YYYY
    if (
      six_digit_mmddyy_handler(six_digit_string_input) &&
      six_digit_mdyyyy_handler(six_digit_string_input)
    ) {
      return [
        six_digit_mmddyy_handler(six_digit_string_input),
        six_digit_mdyyyy_handler(six_digit_string_input),
      ];
    }
    // MM-DD-YY
    else if (
      six_digit_mmddyy_handler(six_digit_string_input) &&
      !six_digit_mdyyyy_handler(six_digit_string_input)
    ) {
      return six_digit_mmddyy_handler(six_digit_string_input);
    }
    // M-D-YYYY
    else if (
      !six_digit_mmddyy_handler(six_digit_string_input) &&
      six_digit_mdyyyy_handler(six_digit_string_input)
    ) {
      return six_digit_mdyyyy_handler(six_digit_string_input);
    }
    // exception
    else {
      console.log("something went wrong in procesing six digit string input!");
      return false;
    }
  }
};

const process_seven = (seven_digit_string_input) => {

  // neither MM-D-YYYY or M-DD-YYYY
  if (
    !seven_digit_mmdyyyy_handler(seven_digit_string_input) &&
    !seven_digit_mddyyyy_handler(seven_digit_string_input)
  ) {
    return false;
  } else {
    // both MM-D-YYYY and M-DD-YYYY
    if (
      seven_digit_mmdyyyy_handler(seven_digit_string_input) &&
      seven_digit_mddyyyy_handler(seven_digit_string_input)
    ) {
      return [
        seven_digit_mmdyyyy_handler(seven_digit_string_input),
        seven_digit_mddyyyy_handler(seven_digit_string_input),
      ];
    }
    // MM-D-YYYY
    else if (
      seven_digit_mmdyyyy_handler(seven_digit_string_input) &&
      !seven_digit_mddyyyy_handler(seven_digit_string_input)
    ) {
      return seven_digit_mmdyyyy_handler(seven_digit_string_input);
    }
    // M-DD-YYYY
    else if (
      !seven_digit_mmdyyyy_handler(seven_digit_string_input) &&
      seven_digit_mddyyyy_handler(seven_digit_string_input)
    ) {
      return seven_digit_mddyyyy_handler(seven_digit_string_input);
    }
    // exception
    else {
      console.log("something went wrong in procesing seven digit string input!");
      return false;
    }
  }
};

// C1/ dob range filter 
const dob_range_filter_epoch_to_date = (epoch_input) => {
  const epoch_now = Date.parse(new Date())
  const epoch_120_years_ago = Date.parse(new Date()) - (120*365*24*60*60*1000)

  if (epoch_input <= epoch_now && epoch_input > epoch_120_years_ago) {
    return getDate(epoch_now)
  }
  else {
    
    if (epoch_input > epoch_now) {
      return `future`
    }

    if (epoch_input < epoch_120_years_ago) {
      return `past`
    }

    return false
  }

}

/* DOB HELPER FUNCTIONS ===================================================================== */

// A1/ month string tester function:
const validate_month_string = (month_string) => {
  const numerical_supposed_month = parseInt(month_string);

  if (numerical_supposed_month < 1 || numerical_supposed_month > 12) {
    console.log("valid month check fails");
    return false;
  }

  return true;
};
// A1/ day string tester function:
const validate_day_string = (month_string, day_string) => {
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
// A3/ valid leap year date tester function:
const is_valid_leap_year_date = (
  month_string,
  day_string,
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

// B1/ leap year tester function:
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
// B2/ two digit year to gour digit year estimator function:
const short_to_full_year = (short_year_string) => {
  // expects two digit year string
  // returns four digit year string

  const numerical_short_year = parseInt(short_year_string);

  if (numerical_short_year > 1 && numerical_short_year < 32) {
    return "20" + short_year_string;
  } else {
    return new Date(short_year_string).getFullYear().toString();
  }
};
// B3/ two digit year to gour digit year estimator function:
const custom_date_string_to_epcoh = (
  supposed_month,
  supposed_day,
  supposed_year
) => {
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

// C1/ 5 digit tester - A (M-DD-YY)
const five_digit_mddyy_handler = (five_digit_mddyy_input) => {
  // capture month -----------------------------------------------------
  const supposed_month = five_digit_mddyy_input[0];
  console.log("supposed_month: ", supposed_month, typeof supposed_month);

  // capture day -----------------------------------------------------
  const supposed_day = five_digit_mddyy_input.slice(1, 3);
  console.log("supposed_day: ", supposed_day, typeof supposed_day);

  // capture year -----------------------------------------------------
  const supposed_short_year = five_digit_mddyy_input.slice(3);
  console.log("supposed_short_year: ", supposed_short_year);
  const supposed_full_year = short_to_full_year(supposed_short_year);
  console.log(
    "supposed_full_year: ",
    supposed_full_year,
    typeof supposed_full_year
  );

  if (
    validate_month_string(supposed_month) &&
    validate_day_string(supposed_month, supposed_day) &&
    is_valid_leap_year_date(supposed_month, supposed_day, supposed_full_year)
  ) {
    return custom_date_string_to_epcoh(
      supposed_month,
      supposed_day,
      supposed_full_year
    );
  } else {
    return false;
  }
};
// C2/ 5 digit tester - B (MM-D-YY)
const five_digit_mmdyy_handler = (five_digit_mmdyy_input) => {
  // capture month -----------------------------------------------------
  const supposed_month = five_digit_mmdyy_input.slice(0, 2);
  console.log("supposed_month: ", supposed_month, typeof supposed_month);

  // capture day -----------------------------------------------------
  const supposed_day = five_digit_mmdyy_input[2];
  console.log("supposed_day: ", supposed_day, typeof supposed_day);

  // capture year -----------------------------------------------------
  const supposed_short_year = five_digit_mmdyy_input.slice(3);
  console.log("supposed_short_year: ", supposed_short_year);
  const supposed_full_year = short_to_full_year(supposed_short_year);
  console.log(
    "supposed_full_year: ",
    supposed_full_year,
    typeof supposed_full_year
  );

  if (
    validate_month_string(supposed_month) &&
    validate_day_string(supposed_month, supposed_day) &&
    is_valid_leap_year_date(supposed_month, supposed_day, supposed_full_year)
  ) {
    return custom_date_string_to_epcoh(
      supposed_month,
      supposed_day,
      supposed_full_year
    );
  } else {
    return false;
  }
};

// D1/ 6 digit tester - A (MM-DD-YY)
const six_digit_mmddyy_handler = (six_digit_mmddyy_input) => {
  // validate input length before using function - does not error handle
  // expects a six digit number in string format

  //     capture month -----------------------------------------------------
  const supposed_month = six_digit_mmddyy_input.slice(0, 2);
  console.log("supposed_month: ", supposed_month, typeof supposed_month);

  // capture day -----------------------------------------------------
  const supposed_day = six_digit_mmddyy_input.slice(2, 4);
  console.log("supposed_day: ", supposed_day, typeof supposed_day);

  // capture year -----------------------------------------------------
  const supposed_short_year = six_digit_mmddyy_input.slice(4);
  console.log("supposed_short_year: ", supposed_short_year);
  const supposed_full_year = short_to_full_year(supposed_short_year);
  console.log(
    "supposed_full_year: ",
    supposed_full_year,
    typeof supposed_full_year
  );

  // validate and return epoch date -----------------------------------
  if (
    validate_month_string(supposed_month) &&
    validate_day_string(supposed_month, supposed_day) &&
    is_valid_leap_year_date(supposed_month, supposed_day, supposed_full_year)
  ) {
    return custom_date_string_to_epcoh(
      supposed_month,
      supposed_day,
      supposed_full_year
    );
  } else {
    return false;
  }
};
// D2/ 6 digit tester - B (M-D-YYYY)
const six_digit_mdyyyy_handler = (six_digit_mdyyyy_input) => {
  // validate input length before using function - does not error handle
  // expects a six digit number in string format

  //     capture month -----------------------------------------------------
  const supposed_month = six_digit_mdyyyy_input[0];
  console.log("supposed_month: ", supposed_month, typeof supposed_month);

  // capture day -----------------------------------------------------
  const supposed_day = six_digit_mdyyyy_input[1];
  console.log("supposed_day: ", supposed_day, typeof supposed_day);

  // capture year -----------------------------------------------------
  const supposed_full_year = six_digit_mdyyyy_input.slice(2);
  console.log(
    "supposed_full_year: ",
    supposed_full_year,
    typeof supposed_full_year
  );

  // validate and return epoch date -----------------------------------
  if (
    validate_month_string(supposed_month) &&
    validate_day_string(supposed_month, supposed_day) &&
    is_valid_leap_year_date(supposed_month, supposed_day, supposed_full_year)
  ) {
    return custom_date_string_to_epcoh(
      supposed_month,
      supposed_day,
      supposed_full_year
    );
  } else {
    return false;
  }
};

// E1/ 7 digit tester - A (MM-D-YYYY)
const seven_digit_mmdyyyy_handler = (seven_digit_mmdyyyy_input) => {
  // capture month -----------------------------------------------------
  const supposed_month = seven_digit_mmdyyyy_input.slice(0, 2);
  console.log("supposed_month: ", supposed_month, typeof supposed_month);

  // capture day -----------------------------------------------------
  const supposed_day = seven_digit_mmdyyyy_input[2];
  console.log("supposed_day: ", supposed_day, typeof supposed_day);

  // capture year -----------------------------------------------------
  const supposed_full_year = seven_digit_mmdyyyy_input.slice(3);
  console.log(
    "supposed_full_year: ",
    supposed_full_year,
    typeof supposed_full_year
  );

  if (
    validate_month_string(supposed_month) &&
    validate_day_string(supposed_month, supposed_day) &&
    is_valid_leap_year_date(supposed_month, supposed_day, supposed_full_year)
  ) {
    return custom_date_string_to_epcoh(
      supposed_month,
      supposed_day,
      supposed_full_year
    );
  } else {
    return false;
  }
};
// E2/ 7 digit tester - B (M-DD-YYYY)
const seven_digit_mddyyyy_handler = (seven_digit_mddyyyy_input) => {
  // capture month -----------------------------------------------------
  const supposed_month = seven_digit_mddyyyy_input[0];
  console.log("supposed_month: ", supposed_month, typeof supposed_month);

  // capture day -----------------------------------------------------
  const supposed_day = seven_digit_mddyyyy_input.slice(1, 3);
  console.log("supposed_day: ", supposed_day, typeof supposed_day);

  // capture year -----------------------------------------------------
  const supposed_full_year = seven_digit_mddyyyy_input.slice(3);
  console.log(
    "supposed_full_year: ",
    supposed_full_year,
    typeof supposed_full_year
  );

  if (
    validate_month_string(supposed_month) &&
    validate_day_string(supposed_month, supposed_day) &&
    is_valid_leap_year_date(supposed_month, supposed_day, supposed_full_year)
  ) {
    return custom_date_string_to_epcoh(
      supposed_month,
      supposed_day,
      supposed_full_year
    );
  } else {
    return false;
  }
};

/* TEST CASES =================================================================================== */

// PRIMARY FUNCTION TESTS WITH DUMMY DATA -------------------------------------------------------------------

/* 8 DIGIT CASES ---------------------------------------------- */
// valid date
// parse_valid_length_date("12112000");

// invaid date
// console.log(parse_valid_length_date('12332000'))

/* 4 DIGIT CASES ---------------------------------------------- */
// valid date
// console.log(parse_valid_length_date("9909"));

// invaid date
// console.log(parse_valid_length_date("0909"));

/* 5 DIGIT CASES ---------------------------------------------- */
// valid date
// console.log(parse_valid_length_date("91309"));
// console.log(parse_valid_length_date("11111"))
// console.log(parse_valid_length_date("12911"))

// invaid date
// console.log(parse_valid_length_date("23911"))
// console.log(parse_valid_length_date("22911"))
// console.log(parse_valid_length_date("94960"))

/* 6 DIGIT CASES ---------------------------------------------- */
// valid date
// console.log(parse_valid_length_date("111308"));
// console.log(parse_valid_length_date("112060"))
// console.log(parse_valid_length_date("122554"))
// console.log(parse_valid_length_date("121908"))
// console.log(parse_valid_length_date("922018"))
// console.log(parse_valid_length_date("113208"))

// invaid date

/* 6 DIGIT CASES ---------------------------------------------- */
// valid date
// console.log(parse_valid_length_date("1112008"))
// console.log(parse_valid_length_date("1221960"))
// console.log(parse_valid_length_date("9301943"))
// console.log(parse_valid_length_date("2212019"))
// console.log(parse_valid_length_date("1312018"))
// console.log(parse_valid_length_date("2121960"))

// invaid date
// console.log(parse_valid_length_date("2291983"))
// console.log(parse_valid_length_date("2312019"))
// console.log(parse_valid_length_date("9331980"))


// HELPER FUNCTION TESTS WITH DUMMY DATA -------------------------------------------------------------------

/* LEAP YEAR TEST ---------------------------------------------- */
// console.log(is_leap_year(2000))
// console.log(is_leap_year(2001))

/* 2-DIGIT TO 4-DIGIT YEAR CONVERTOR ---------------------------------------------- */
// console.log(short_to_full_year('01'))
// console.log(short_to_full_year('02'))
// console.log(short_to_full_year('03'))
// console.log(short_to_full_year('31'))
// console.log(short_to_full_year('32'))
// console.log(short_to_full_year('75'))
// console.log(short_to_full_year('56'))
// console.log(short_to_full_year('50'))

/* 4 DIGIT CASES ---------------------------------------------- */

// vaid date
// four_to_epoch("9909");

// invaid date
// four_to_epoch("0909")

/* 5 DIGIT CASES ---------------------------------------------- */
// valid date
// five_digit_mddyy_handler("91308");
// five_digit_mddyy_handler("12108");
// five_digit_mddyy_handler("13150");

// invaid date
// five_digit_mddyy_handler("23008");
// five_digit_mddyy_handler("54308");

// valid date
// five_digit_mmdyy_handler("12108");

// invaid date
// five_digit_mmdyy_handler("91308");
// five_digit_mmdyy_handler("23008");
// five_digit_mmdyy_handler("54308");

/* 6 DIGIT CASES ---------------------------------------------- */
// valid date
// six_digit_mmddyy_handler("111308");
// six_digit_mmddyy_handler("112060");
// six_digit_mmddyy_handler("121008");
// six_digit_mmddyy_handler("122554");

// invaid date
// six_digit_mmddyy_handler("233308");
// six_digit_mmddyy_handler("113208");
// six_digit_mmddyy_handler("561983");
// six_digit_mmddyy_handler("731989");

// valid date
// six_digit_mdyyyy_handler("121908");
// six_digit_mdyyyy_handler("922018");

// invaid date

/* 7 DIGIT CASES ---------------------------------------------- */
// valid date
// seven_digit_mmdyyyy_handler("1112008");
// seven_digit_mmdyyyy_handler("1221960");

// invaid date
// seven_digit_mmdyyyy_handler("1312018");
// seven_digit_mmdyyyy_handler("2121960");

// valid date
// seven_digit_mddyyyy_handler("9301943")
// seven_digit_mddyyyy_handler("2212019")

// invaid date
// seven_digit_mddyyyy_handler("2312019")
// seven_digit_mddyyyy_handler("9331980")
// seven_digit_mddyyyy_handler("2291983")
