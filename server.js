require('dotenv').config();
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
    const gitReportChangesPath = gitReportFolderPath + `/${gitReportFolderName}`;
    const consoleCommand = `git log  --reverse --all --after=${afterDate} --before=${beforeDate} --author="${gitAuthorName}" -p`;

    const listOfProjects = fs.readdirSync(projectFolderPath);

    if (listOfProjects.length === 0) {
        console.log('There are no projects - verify env PROJECT_FOLDER_PATH');

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
                            console.error('runCommandOnPath error');
                        });
                }
            })
            .catch((err) => {
                console.error('isDirectoryChecker error', err);
            });
    });
})();
