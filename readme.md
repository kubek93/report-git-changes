# Report Git Changes

This project was created to help with monotonic reporting monthly changes in projects.

It is using `git log` command, example:

```bash
$ git log  --reverse --all --after=first-day-of-month --before=last-day-of-month --author="author-of-git-commits" -p
```

and iterate through all folders in declared path `PROJECT_FOLDER_PATH`.

## Installation

1. Clone repository locally:

```bash
$ git clone https://github.com/kubek93/report-git-changes.git
```

2. Copy or rename of the file `.env.example` to `.env` and change your `user_name`.
- You can also modify project variables, using correct paths for `projects` folder and folder where reports will be generated.

```env
PROJECT_FOLDER_PATH=/Users/user_name/Projects
GIT_REPORT_FOLDER_PATH=/Users/user_name/Documents/report-git-changes
```

## Using

You have to run project and answer for the questions:

```bash
$ cd report-git-changes
$ node server.js
```
