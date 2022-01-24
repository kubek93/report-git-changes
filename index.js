#!/usr/bin/env node

const prompts = require('prompts');
const fs = require('fs');
const {
    checkIfDirectoryExistsAndCreateIfNeeded,
    getFirstDayOfMonth,
    getLastDayOfMonth,
    isDirectoryExist,
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

    const gitReportFolderName = returnMonthFolderName(dateOfReport);

    if (!fs.existsSync(projectFolderPath)) {
        console.error('Passed projects folder path does not exists.');
        return 0;
    }

    const listOfProjects = fs.readdirSync(projectFolderPath);

    if (listOfProjects.length === 0) {
        console.error('Projects folder is empty. Try to use different projects path.');
        return;
    }

    checkIfDirectoryExistsAndCreateIfNeeded(gitReportFolderPath);
    checkIfDirectoryExistsAndCreateIfNeeded(gitReportFolderPath + "/" + gitReportFolderName);

    const afterDate = getFirstDayOfMonth(dateOfReport);
    const beforeDate = getLastDayOfMonth(dateOfReport);
    const gitLogBashCommand = `git log  --reverse --all --after=${afterDate} --before=${beforeDate} --author="${gitAuthorName}" -p`;

    listOfProjects.forEach(async (file) => {
        const fullFilePath = `${projectFolderPath}/${file}`;
        const isDirectory = await isDirectoryChecker(fullFilePath);

        if (isDirectory) {
            if (!isDirectoryExist(`${fullFilePath}/.git`)) {
                console.log(`Not checking: ${fullFilePath} - .git folder does not exists!`);
                return 0;
            }

            console.log(`Checking: ${fullFilePath}`);

            runCommandOnPath(gitLogBashCommand, fullFilePath)
                .then((resultOfCommand) => {
                    saveFileWithContent(
                        `${gitReportFolderPath + "/" + gitReportFolderName}/${file}.txt`,
                        resultOfCommand
                    );
                })
                .catch((err) => {
                    console.log('ERROR IN: ', fullFilePath);
                    throw new Error(err);
                });
        }
    });
})();
