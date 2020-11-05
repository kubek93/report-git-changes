# Report Git Changes

> NOTE: Project is tested only for `macOS` users!

This project was created to help with monotonic reporting monthly changes in projects.

It is using `git log` command, example:

```bash
$ git log  --reverse --all --after=first-day-of-month --before=last-day-of-month --author="author-of-git-commits" -p
```

and iterate through all projects from passed folder.

After few questions you will be able to generate files with you changes:

![Example of project](https://raw.githubusercontent.com/kubek93/report-git-changes/assets/images/example.png)

## Usage

You can use this script without installing code on you local machine which is recommended. For do that use command:

```bash
$ npx report-git-changes
```

If you decide to store packages locally, first of all install it as a global npm packages using:

```bash
$ npm i -g report-git-changes
```

Or clone repository locally:

```bash
$ git clone https://github.com/kubek93/report-git-changes.git
```

and execute: `$ report-git changes` in your command line.
