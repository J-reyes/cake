
const getRandomString = arrOfStrings =>
    arrOfStrings[Math.floor(Math.random() * arrOfStrings.length)];

const getRandomIP = () =>
    (Math.floor(Math.random() * 255) + 1) + "."
    + (Math.floor(Math.random() * 255) + 0) + "."
    + (Math.floor(Math.random() * 255) + 0) + "."
    + (Math.floor(Math.random() * 255) + 0);


// generates random time stamp
const randomDate = (start, end) => {
    const options = { hour: 'numeric', year: 'numeric', month: 'long', day: 'numeric', minute: 'numeric' };
    const randomDate = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));

    return randomDate.toLocaleDateString("en-US", options);
}

// randomDate(new Date(2018, 0, 1), new Date())


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

module.exports = { cleanNames, getRandomIP, getRandomString, randomDate }