const questions = [
    {
        type: 'date',
        name: 'dateOfReport',
        mask: 'YYYY-MM',
        message: 'Select month of hours report:',
    },
    {
        type: 'text',
        name: 'gitAuthorName',
        message: 'What is your git commit author name:',
        validate: (value) => (value === '' ? `Maybe type something` : true),
    },
    {
        type: 'text',
        name: 'macOsUserName',
        message: 'What is the name of you macOS user (check typing "whoami"):',
        validate: (value) => (value === '' ? `Maybe type something` : true),
    },
    {
        type: 'text',
        name: 'projectFolderPath',
        initial: (previousValue => `/Users/${previousValue}/Projects`),
        message: 'What is your project folder path:',
        validate: (value) => (value === '' ? `Maybe type something` : true),
    },
    {
        type: 'text',
        name: 'gitReportFolderPath',
        initial: ((previousValue, previousValues) => `/Users/${previousValues.macOsUserName}/Documents/report-git-changes`),
        message: 'Where git report should be saved:',
        validate: (value) => (value === '' ? `Maybe type something` : true),
    },
];

module.exports = questions;
