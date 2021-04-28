#!/usr/bin/env node

const prompts = require('prompts');
const fs = require('fs');
const {
    checkIfDirectoryExistsAndCreateIfNeeded,
    getFirstDayOfMonth,
    getLastDayOfMonth,
    isDirectoryChecker,
    returnMonthFolderName,
    runCommandOnPath,
    saveFileWithContent,
} = require('./utils/utils.js');
const questions = require('./utils/questions.js');

(async () => {
    const response = await prompts(questions);
    const {
        dateOfReport,
        gitAuthorName,
        projectFolderPath,
        gitReportFolderPath,
    } = response;

    const afterDate = getFirstDayOfMonth(dateOfReport);
    const beforeDate = getLastDayOfMonth(dateOfReport);
    const gitReportFolderName = returnMonthFolderName(dateOfReport);
    const gitReportChangesPath =
        gitReportFolderPath + `/${gitReportFolderName}`;
    const consoleCommand = `git log  --reverse --all --after=${afterDate} --before=${beforeDate} --author="${gitAuthorName}" -p`;
    console.log('Run command: ', consoleCommand);

    if (!fs.existsSync(projectFolderPath)) {
        console.error('Passed project folder path not exists.');

        return;
    }

    const listOfProjects = fs.readdirSync(projectFolderPath);

    if (listOfProjects.length === 0) {
        console.error(
            'There are no any projects inside of the folder. Try to use different project path.'
        );

        return;
    }

    checkIfDirectoryExistsAndCreateIfNeeded(gitReportFolderPath);
    checkIfDirectoryExistsAndCreateIfNeeded(gitReportChangesPath);

    listOfProjects.forEach(async (file) => {
        const fullFilePath = `${projectFolderPath}/${file}`;

        isDirectoryChecker(fullFilePath)
            .then((isDirectory) => {
                if (isDirectory) {
                    runCommandOnPath(consoleCommand, fullFilePath)
                        .then((resultOfCommand) => {
                            saveFileWithContent(
                                `${gitReportChangesPath}/${file}.txt`,
                                resultOfCommand
                            );
                        })
                        .catch((err) => {
                            console.error(consoleCommand, fullFilePath, err);
                            return;
                        });
                }
            })
            .catch((err) => {
                console.error(consoleCommand, fullFilePath, err);
                return;
            });
    });
})();
