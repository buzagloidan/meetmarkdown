# Contributing to MeetMarkdown

Thanks for your interest in contributing! MeetMarkdown is a community-driven project and we welcome contributions of all kinds.

## Getting Started

1. Fork the repository
2. Clone your fork:
   ```bash
   git clone https://github.com/YOUR_USERNAME/meetmarkdown.git
   cd meetmarkdown
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the dev server:
   ```bash
   npm run dev
   ```
5. Open [http://localhost:3000](http://localhost:3000)

## Making Changes

1. Create a new branch from `main`:
   ```bash
   git checkout -b feat/your-feature
   ```
2. Make your changes
3. Test locally with `npm run build` to ensure there are no build errors
4. Commit your changes with a clear message:
   ```bash
   git commit -m "feat: add cool new feature"
   ```
5. Push and open a pull request

## Commit Convention

We follow [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` — new feature
- `fix:` — bug fix
- `docs:` — documentation only
- `style:` — formatting, no code change
- `refactor:` — code change that neither fixes a bug nor adds a feature
- `perf:` — performance improvement
- `chore:` — maintenance tasks

## Guidelines

- Keep PRs focused — one feature or fix per PR
- All processing happens client-side. Do not introduce server-side file processing or external API calls that send user content off-device
- Follow existing code patterns and project structure
- Test your changes across light and dark themes

## Reporting Bugs

Open an [issue](https://github.com/buzagloidan/meetmarkdown/issues) with:
- Steps to reproduce
- Expected vs. actual behavior
- Browser and OS info

## Feature Requests

We love ideas! Open an issue with the `enhancement` label describing your proposal.

## License

By contributing, you agree that your contributions will be licensed under the [MIT License](LICENSE).
