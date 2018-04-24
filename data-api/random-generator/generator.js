const { affiliate, campaign, userAgent, cities, names } = require('./data');
const { cleanNames, getRandomIP, getRandomString, randomDate } = require('./helper-functions');


// ex. let testData = generator(1000, new Date(2018, 3, 1), new Date())
const generator = (amount, beginningDate, endDate) => {
    // creates an array of undefined objects of length amount
    let returnArray = [...Array(amount)];

    // array full of unsorted objects
    returnArray = returnArray.map(item => createSingleObject(beginningDate, endDate));

    // sort array 
    return returnArray.sort(sortByDate);
}

const createSingleObject = (beginningDate, endDate) => ({
    timeStamp: randomDate(beginningDate, endDate),
    campaign: getRandomString(campaign),
    affiliate: getRandomString(affiliate),
    userAgent: getRandomString(names),
    location: getRandomString(cities),
    ipAddress: getRandomIP()
})

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

module.exports = generator;