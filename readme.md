# Report Git Changes

> NOTE: Project is tested only for `macOS` users!

This project was created to help with reporting monotonic monthly changes in projects for company purposes.

It is using `git log` command:

```bash
git log  --reverse --all --after=first-day-of-month --before=last-day-of-month --author="author-of-git-commits" -p
```

and iterate through all projects from passed folder.

You have to answer for a few questions and script will be able to generate files with your changes:

![Example of project](https://raw.githubusercontent.com/kubek93/report-git-changes/assets/images/example.png)

## How to use

> This technique is recommended by author

You can use this script without installing code on you local machine.

Command:

```bash
npx report-git-changes
```

## Different way for using package

If you decide to store packages locally, first of all install it as a global npm packages using:

```bash
npm i -g report-git-changes
```

Or clone repository locally:

```bash
git clone https://github.com/kubek93/report-git-changes.git
```

and execute command in your command line:

```bash
report-git-changes
```

## TODO

- [ ] Add colors to cli commands
- [ ] Clean up console logs, more descriptive outputs of errors
- [ ] zip compress files
