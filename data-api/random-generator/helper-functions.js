// grabs a random index from array
const getRandomString = arrOfStrings =>
    arrOfStrings[Math.floor(Math.random() * arrOfStrings.length)];

const getRandomIP = () =>
    (Math.floor(Math.random() * 255) + 1) + "."
    + (Math.floor(Math.random() * 255) + 0) + "."
    + (Math.floor(Math.random() * 255) + 0) + "."
    + (Math.floor(Math.random() * 255) + 0);

// randomDate(new Date(2018, 0, 1), new Date())
// generates random time stamp
const randomDate = (start, end) => {
    const options = { hour: 'numeric', year: 'numeric', month: 'long', day: 'numeric', minute: 'numeric' };
    const randomDate = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));

    return randomDate.toLocaleDateString("en-US", options);
}

// generate random cookie strings
const randomCookie = (cookieName, cookieValue, startDay, expireDay) => {
    let d = new Date();
    let start = new Date(startDay);
    d.setTime(start.getTime() + (expireDay*24*60*60*1000));
    let expires = "expires=" + d.toUTCString();
    return `${cookieName}=${cookieValue};${expires};path=/`
}


// formatter for data.js
const cleanNames = dirtyNames => {
    let clean = dirtyNames;

    // removes backspaces with empty string
    clean = clean.replace(/(\r\n\t|\n|\r\t)/gm, "");

    // removes all empty strings
    clean = clean.split(" ");
    clean = clean.filter(x => x != "");

    // gets rid of decimals
    clean = clean.filter(number => !number.includes("."));

    clean = clean.map(names => removeNumbersFromFront(names));

    // removes random hanging empty string
    clean.pop();
    return clean;
}

const removeNumbersFromFront = str => {
    const number = parseInt(str);

    // check if it has a number in the string
    if (!isNaN(number)) {
        const lengthOfNumber = number.toString().length;

        // gets rid of number from string
        return str.substr(lengthOfNumber);
    } else {
        return str;
    }
}

module.exports = {
    cleanNames,
    getRandomIP,
    getRandomString,
    randomDate,
    randomCookie
}