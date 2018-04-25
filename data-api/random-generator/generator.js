const { affiliate, campaign, userAgent, cities, names } = require('./data');
const { cleanNames, getRandomIP, getRandomString, randomDate, randomCookie } = require('./helper-functions');


// ex. let testData = generator(1000, new Date(2018, 3, 1), new Date(), createClickObject)
const generator = (amount, beginningDate, endDate, func) => {
    // creates an array of undefined objects of length amount
    let returnArray = [...Array(amount)];

    // array full of unsorted objects
    returnArray = returnArray.map(item => func(beginningDate, endDate));

    // sort array 
    return returnArray.sort(sortByDate);
}

const createClickObject = (beginningDate, endDate) => {
    let time = randomDate(beginningDate, endDate);
    let user = getRandomString(names);
    return {
        timeStamp: time,
        campaign: getRandomString(campaign),
        affiliate: getRandomString(affiliate),
        userAgent: user,
        location: getRandomString(cities),
        ipAddress: getRandomIP(),
        cookies: randomCookie("user", user, time, 1)
    }
}

const sortByDate = (a, b) => {
    const firstTime = new Date(a.timeStamp).getTime();
    const secondTime = new Date(b.timeStamp).getTime();

    if (firstTime < secondTime) {
        return -1;
    }
    if (firstTime > secondTime) {
        return 1;
    }
    return 0;
}

module.exports = { generator, createClickObject };