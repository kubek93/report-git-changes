const fs = require('fs');
const { exec } = require('child_process');

function getFirstDayOfMonth(date) {
    const currDate = new Date(date);
    const firstDayOfMonth = new Date(
        currDate.getFullYear(),
        currDate.getMonth(),
        2,
        0
    );

    return `${firstDayOfMonth.getFullYear()}-${firstDayOfMonth.getMonth()}-${firstDayOfMonth.getDate()}`;
}

function getLastDayOfMonth(date) {
    const currDate = new Date(date);
    const lastDayOfMonth = new Date(
        currDate.getFullYear(),
        currDate.getMonth() + 1,
        1
    );

    return `${lastDayOfMonth.getFullYear()}-${lastDayOfMonth.getMonth()}-${lastDayOfMonth.getDate()}`;
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

function checkIfDirectoryExistsAndCreateIfNeeded(folderPath) {
    if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath);

        console.log(`Folder: ${folderPath} has been created.`);
    }

    return true;
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
        exec(command, { cwd }, (err, stdout, stderr) => {
            if (err) {
                return reject(err);
            }

            if (stderr) {
                return reject('stderr', stderr);
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
                console.log(`File: ${filePath} has been saved!`);
                resolve(true);
            }
        });
    });
}

module.exports = {
    checkIfDirectoryExistsAndCreateIfNeeded,
    getFirstDayOfMonth,
    getLastDayOfMonth,
    isDirectoryChecker,
    returnMonthFolderName,
    runCommandOnPath,
    saveFileWithContent,
};
