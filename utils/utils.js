const fs = require('fs');
const moment = require('moment');
const { exec } = require('child_process');

function getFirstDayOfMonth(date) {
    const currDate = moment(date).hours(0).minutes(0).seconds(0);

    return currDate.startOf('month').format('YYYY-MM-DD');
}

function getLastDayOfMonth(date) {
    const currDate = moment(date).hours(0).minutes(0).seconds(0);

    return currDate.endOf('month').format('YYYY-MM-DD');
}

function returnMonthFolderName(date) {
    const currDate = new Date(date);
    const monthNames = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
    ];
    var year = currDate.getFullYear().toString();
    var month = (currDate.getMonth() + 101).toString().substring(1);

    return `${year}-${month}-${monthNames[currDate.getMonth()]}`;
}

const isDirectoryExist = (folderPath) => {
    return fs.existsSync(folderPath);
}

const createDirectory = (folderPath) => {
    return fs.mkdirSync(folderPath, { recursive: true }, (err) => {
        if (err) throw err;
    });
}

const checkIfDirectoryExistsAndCreateIfNeeded = async (folderPath) => {
    const isDirectory = await isDirectoryExist(folderPath);

    if (!isDirectory) {
        createDirectory(folderPath);
    }
}

function isDirectoryChecker(filePath) {
    return new Promise((resolve, reject) => {
        fs.lstat(filePath, (err, stats) => {
            if (err || stats == undefined) {
                return reject(err);
            }

            return resolve(stats.isDirectory());
        });
    });
}

function runCommandOnPath(command, cwd) {
    return new Promise((resolve, reject) => {
        // Save files (maxBuffer) up to 25MB
        exec(command, { cwd, maxBuffer: 25000 * 1024 }, (err, stdout, stderr) => {
            if (err) {
                return reject(err);
            }

            if (stderr) {
                return reject(stderr);
            }

            resolve(stdout);
        });
    });
}

function saveFileWithContent(filePath, fileContent = '') {
    if (fileContent === '') {
        return;
    }

    return new Promise((resolve, reject) => {
        fs.writeFile(filePath, fileContent, function (err) {
            if (err) {
                reject(err);
            } else {
                console.log(`Git changes has been saved! - ${filePath}`);
                resolve(true);
            }
        });
    });
}

module.exports = {
    checkIfDirectoryExistsAndCreateIfNeeded,
    getFirstDayOfMonth,
    getLastDayOfMonth,
    isDirectoryExist,
    isDirectoryChecker,
    returnMonthFolderName,
    runCommandOnPath,
    saveFileWithContent,
};
