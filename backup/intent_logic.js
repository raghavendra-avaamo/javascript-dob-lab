console.log('\nNumerical DOB picked up: ', context.entities.number)


if (!valid_numerical_date_length(context.entities.number[0])) {

  return goto_node('30')

} else {

  if (!parse_valid_length_date(context.entities.number[0])) {
    return goto_node('30')
  }
  
  const user_entered_date_number = parse_valid_length_date(context.entities.number[0])
  console.log("\nUSER ENTERED DOB: ",getDate(user_entered_date_number));

  const current_date = parseInt(Date.parse(new Date()))
  console.log("CURRENT DATE: ", getDate(current_date))

  const past_limit_from_current_date = current_date - (150 * 365 * 24 * 60 * 60 * 1000)

  // validate DOB to ensure it is not a future date or way back in the past
  if (user_entered_date_number < current_date && user_entered_date_number > past_limit_from_current_date) {

    //       date is within valid range
    context.variables.DOB = getDate(user_entered_date_number);
    return goto_node("11")

  } else {

    //   check if date is in future
    if (user_entered_date > current_date) {
      return goto_node("251")
    }

    //   check if date is in past
    if (user_entered_date < past_limit_from_current_date) {
      return goto_node("271")
    }

  }

}
