# Report Git Changes

> NOTE: Project is tested only for `macOS` users!

This project was created to help with monotonic reporting monthly changes in projects.

It is using `git log` command, example:

```bash
$ git log  --reverse --all --after=first-day-of-month --before=last-day-of-month --author="author-of-git-commits" -p
```

and iterate through all projects from passed folder.

## Installation

```bash
$ npm i -g report-git-changes
```

Or clone repository locally:

```bash
$ git clone https://github.com/kubek93/report-git-changes.git
```

## Using

You should be able to run command: `report-git-changes` in your command line.

Or just go to cloned repo and run manually:

```bash
$ cd report-git-changes
$ node server.js
```
