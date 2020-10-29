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
        message: 'What is your GitHub commits author name:',
        validate: (value) => (value === '' ? `Maybe type something` : true),
    },
    {
        type: 'text',
        name: 'projectFolderPath',
        initial: process.env.PROJECT_FOLDER_PATH,
        message: 'What is your project folder path:',
        validate: (value) => (value === '' ? `Maybe type something` : true),
    },
    {
        type: 'text',
        name: 'gitReportFolderPath',
        initial: process.env.GIT_REPORT_FOLDER_PATH,
        message: 'Where should I save your reports:',
        validate: (value) => (value === '' ? `Maybe type something` : true),
    },
];

module.exports = questions;
