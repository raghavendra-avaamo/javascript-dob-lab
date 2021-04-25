
const is_leap_year = (int_year) => {
    if (int_year % 400 === 0) {return true}
    else if (int_year % 100 === 0) {return false}
    else if (int_year % 4 === 0 ) {return true}
    else {return false}
}


console.log(is_leap_year(2000))
console.log(is_leap_year(2001))