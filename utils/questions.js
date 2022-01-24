const {
    runCommandOnPath,
} = require('./utils.js');

const questions = [
    {
        type: 'date',
        name: 'dateOfReport',
        mask: 'YYYY-MM',
        message: 'Select date:',
    },
    {
        type: 'text',
        name: 'gitAuthorName',
        message: 'Part of search git commit author:',
        validate: (value) => (value === '' ? `Please type something` : true),
    },
    {
        type: 'text',
        name: 'projectFolderPath',
        initial: (async () => {
            const userName = await runCommandOnPath('whoami');
            return `/Users/${userName.slice(0, -1)}/Projects`;
        }),
        message: 'Projects folder path:',
        validate: (value) => (value === '' ? `Please type something` : true),
    },
    {
        type: 'text',
        name: 'gitReportFolderPath',
        initial: (async () => {
            const userName = await runCommandOnPath('whoami');
            return `/Users/${userName.slice(0, -1)}/Documents/report-git-changes`
        }),
        message: 'Raport folder path:',
        validate: (value) => (value === '' ? `Please type something` : true),
    },
];

module.exports = questions;
