# Contribution guide
We're glad you're interested in contributing valaxy-theme-sakura! In this document you will find the information you need to contribute to the project.

## Roadmap
See [ROADMAP.md](./ROADMAP.md)

## Issues
Before creating an issue, please check the following:

- To avoid duplication, please search for similar issues before creating a new issue.
- Do not use Issues to ask questions or troubleshooting.
  - Issues should only be used to feature requests, suggestions, and bug tracking.
  - Please ask questions or troubleshooting in [GitHub Discussions](https://github.com/wrxinyue/valaxy-theme-sakura/discussions)

> **Warning**
> Do not close issues that are about to be resolved. It should remain open until a commit that actually resolves it is merged.

## Before implementation
When you want to add a feature or fix a bug, **first have the design and policy reviewed in an Issue** (if it is not there, please make one). Without this step, there is a high possibility that the PR will not be merged even if it is implemented.

At this point, you also need to clarify the goals of the PR you will create, and make sure that the other members of the team are aware of them.
PRs that do not have a clear set of do's and don'ts tend to be bloated and difficult to review.

Also, when you start implementation, assign yourself to the Issue (if you cannot do it yourself, ask another member to assign you). By expressing your intention to work the Issue, you can prevent conflicts in the work.

## Well-known branches

- **`master`** branch is tracking the latest release and used for production purposes.

## Creating a PR
Thank you for your PR! Before creating a PR, please check the following:

- If possible, prefix the title with a keyword that identifies the type of this PR, as shown below.
  - `fix` / `refactor` / `feat` / `enhance` / `perf` / `chore` etc
  - Also, make sure that the granularity of this PR is appropriate. Please do not include more than one type of change or interest in a single PR.
- If there is an Issue which will be resolved by this PR, please include a reference to the Issue in the text.
- Please add the summary of the changes to [`releases.md`](./docs/pages/releases.md). However, this is not necessary for changes that do not affect the users, such as refactoring.
- Check if there are any documents that need to be created or updated due to this change.
- If you have added a feature or fixed a bug, please add a test case if possible.
- Please make sure that tests and Lint are passed in advance.
  - You can run it with `pnpm test` and `pnpm lint`.
- If this PR includes UI changes, please attach a screenshot in the text.

Thanks for your cooperation 🤗

## Reviewers guide
Be willing to comment on the good points and not just the things you want fixed 💯

### Review perspective

- Scope
  - Are the goals of the PR clear?
  - Is the granularity of the PR appropriate?
- Security
  - Does merging this PR create a vulnerability?
- Performance
  - Will merging this PR cause unexpected performance degradation?
  - Is there a more efficient way?
- Testing
  - Does the test ensure the expected behavior?
  - Are there any omissions or gaps?
  - Does it check for anomalies?

## Deploy
The `/deploy` command by issue comment can be used to deploy the contents of a PR to the preview environment.

```
/deploy sha=<commit hash>
```

An actual domain will be assigned so you can test the federation.

## Merge

## Release
### Release Instructions

1. Commit version changes in the `develop` branch ([package.json](https://github.com/WRXinYue/valaxy-theme-sakura/blob/main/theme/package.json))
2. Create a release PR.

- Into `master` from `develop` branch.
- The title must be in the format `Release: x.y.z`.
- `x.y.z` is the new version you are trying to release.

3. Deploy and perform a simple QA check. Also verify that the tests passed.
4. Merge it. (Do not squash commit)
5. Create a [release of GitHub](https://github.com/wrxinyue/valaxy-theme-sakura/releases)

- The target branch must be `master`
- The tag name must be the version

> **Note**
> Why this instruction is necessary:
>
> - To perform final QA checks
> - To distribute responsibility
> - To check direct commits to develop
> - To celebrate the release together 🎉

## Development

For information on development, visit our [Development Site](https://sakura.valaxy.site/dev).
