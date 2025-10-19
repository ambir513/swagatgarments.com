# Contributing to Swagat Garments — Towards the Fashion

Thank you for your interest in contributing to **Swagat Garments**! We're excited to have you join our community of developers working to build an exceptional fashion e-commerce platform. This document provides guidelines and instructions to help you contribute effectively.

---

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Project Structure](#project-structure)
- [Coding Standards](#coding-standards)
- [Commit Guidelines](#commit-guidelines)
- [Pull Request Process](#pull-request-process)
- [Reporting Issues](#reporting-issues)
- [Feature Requests](#feature-requests)
- [Community](#community)

---

## Code of Conduct

By participating in this project, you agree to maintain a respectful, inclusive, and welcoming environment for all contributors. We are committed to:

- **Respectful Communication**: Treat all contributors with respect and professionalism
- **Constructive Feedback**: Provide helpful, actionable feedback on code and ideas
- **Inclusivity**: Welcome contributors of all skill levels and backgrounds
- **Collaboration**: Work together to improve the project for everyone

Any inappropriate behavior, harassment, or discriminatory language will not be tolerated and may result in removal from the project.

---

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v16.x or higher recommended)
- **npm** (v8.x or higher) or **yarn** (v1.22.x or higher)
- **Git** (v2.x or higher)
- A code editor (We recommend **VS Code**)

### 1. Fork the Repository

Click the **Fork** button at the top right of the [repository page](https://github.com/ambir513/swagatgarments-com) to create your own copy.

### 2. Clone Your Fork

```bash
git clone https://github.com/ambir513/swagatgarments.com.git
cd swagatgarments-com
```

Replace `YOUR-USERNAME` with your GitHub username.

### 3. Add Upstream Remote

Add the original repository as an upstream remote to keep your fork in sync:

```bash
git remote add upstream https://github.com/ambir513/swagatgarments.com.git
```

### 4. Install Dependencies

Install all required project dependencies:

```bash
npm install
```

Or if you're using yarn:

```bash
yarn install
```

### 5. Set Up Environment Variables

Create a `.env.local` file in the root directory and add the necessary environment variables. Refer to `.env.example` for required variables:

```bash
cp .env.example .env.local
```

Fill in your configuration values as needed.

### 6. Run the Development Server

Start the local development server:

```bash
npm run dev
```

Or with yarn:

```bash
yarn dev
```

The application should now be running at `http://localhost:3000` (or the port specified in your configuration).

---

## Development Workflow

### Keeping Your Fork Updated

Before starting new work, sync your fork with the upstream repository:

```bash
git checkout main
git fetch upstream
git merge upstream/main
git push origin main
```

### Creating a Feature Branch

Always create a new branch for your work:

```bash
git checkout -b feature/your-feature-name
```

Use descriptive branch names:

- `feature/add-payment-integration`
- `fix/cart-calculation-bug`
- `docs/update-readme`
- `refactor/optimize-product-listing`

### Making Changes

1. Make your changes in your feature branch
2. Test your changes thoroughly
3. Ensure code follows project coding standards
4. Run linting and formatting tools:

```bash
npm run lint
npm run format
```

### Testing Your Changes

Before submitting, ensure all tests pass:

```bash
npm run test
```

If you're adding new features, please include appropriate tests.

---

## Project Structure

Understanding the project structure will help you navigate the codebase:

```
swagatgarments-com/
├── public/           # Static assets (images, fonts, etc.)
├── src/
│   ├── components/   # Reusable React components
│   ├── pages/        # Next.js pages/routes
│   ├── styles/       # CSS/SCSS stylesheets
│   ├── utils/        # Utility functions and helpers
│   ├── hooks/        # Custom React hooks
│   ├── context/      # React Context providers
│   ├── lib/          # Third-party library configurations
│   └── types/        # TypeScript type definitions
├── tests/            # Test files
├── .env.example      # Example environment variables
└── package.json      # Project dependencies and scripts
```

---

## Coding Standards

### General Guidelines

- Write clean, readable, and maintainable code
- Follow the existing code style and patterns
- Keep functions small and focused on a single responsibility
- Use meaningful variable and function names
- Comment complex logic, but prefer self-documenting code
- Avoid code duplication (DRY principle)

### JavaScript/TypeScript

- Use ES6+ syntax and features
- Prefer `const` over `let`, avoid `var`
- Use arrow functions for callbacks
- Follow functional programming principles where appropriate
- Use TypeScript types/interfaces for type safety

### React/Next.js

- Use functional components and hooks
- Keep components small and reusable
- Use proper prop validation
- Follow React best practices and performance optimization
- Use Next.js features appropriately (SSR, SSG, API routes)

### CSS/Styling

- Use modular CSS or CSS-in-JS as per project convention
- Follow BEM methodology if using plain CSS
- Ensure responsive design for all screen sizes
- Maintain consistent spacing and typography
- Use CSS variables for theming when applicable

### Naming Conventions

- **Components**: PascalCase (e.g., `ProductCard.jsx`)
- **Functions**: camelCase (e.g., `calculateTotal`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `API_BASE_URL`)
- **Files**: kebab-case or camelCase consistently

---

## Commit Guidelines

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification for clear and structured commit messages.

### Commit Message Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- **feat**: A new feature
- **fix**: A bug fix
- **docs**: Documentation changes
- **style**: Code style changes (formatting, missing semicolons, etc.)
- **refactor**: Code refactoring without changing functionality
- **test**: Adding or updating tests
- **chore**: Maintenance tasks, dependency updates, etc.
- **perf**: Performance improvements

### Examples

```bash
feat(cart): add persistent cart functionality

Implement local storage persistence for shopping cart items to maintain cart state across sessions.

Closes #123
```

```bash
fix(checkout): resolve payment gateway timeout issue

Increase timeout duration and add retry logic for payment processing.

Fixes #456
```

```bash
docs(readme): update installation instructions

Add detailed steps for environment variable setup.
```

---

## Pull Request Process

### Before Submitting

1. Ensure your code follows all coding standards
2. Run all tests and ensure they pass
3. Update documentation if needed
4. Rebase your branch on the latest `main` branch
5. Squash commits if necessary for a clean history

### Submitting a Pull Request

1. Push your feature branch to your fork:

```bash
git push origin feature/your-feature-name
```

2. Go to the original repository and click **New Pull Request**

3. Select your feature branch and provide a detailed description:

   - **Title**: Clear, concise summary of changes
   - **Description**:
     - What changes were made and why
     - Related issue numbers (e.g., "Closes #123")
     - Screenshots/GIFs for UI changes
     - Testing instructions
     - Any breaking changes or migration notes

4. Request review from maintainers

5. Address any feedback from code review

6. Once approved, a maintainer will merge your PR

### Pull Request Template

```markdown
## Description

Brief description of what this PR does

## Related Issue

Closes #(issue number)

## Type of Change

- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing

Describe how you tested these changes

## Screenshots (if applicable)

Add screenshots for UI changes

## Checklist

- [ ] My code follows the project's coding standards
- [ ] I have performed a self-review of my code
- [ ] I have commented my code where necessary
- [ ] I have updated the documentation accordingly
- [ ] My changes generate no new warnings
- [ ] I have added tests that prove my fix/feature works
- [ ] All tests pass locally
```

---

## Reporting Issues

### Before Creating an Issue

- Search existing issues to avoid duplicates
- Check if the issue exists in the latest version
- Gather relevant information about your environment

### Creating an Issue

Use the appropriate issue template and provide:

- **Clear Title**: Descriptive summary of the issue
- **Description**: Detailed explanation of the problem
- **Steps to Reproduce**: Exact steps to reproduce the issue
- **Expected Behavior**: What you expected to happen
- **Actual Behavior**: What actually happened
- **Environment**: Browser, OS, Node version, etc.
- **Screenshots/Logs**: Visual evidence or error logs
- **Possible Solution**: (Optional) Suggestions for fixing the issue

---

## Feature Requests

We welcome ideas for new features! When suggesting a feature:

1. Check if the feature has already been requested
2. Clearly describe the feature and its benefits
3. Explain the use case and user story
4. Consider implementation complexity
5. Be open to discussion and feedback

---

## Community

### Getting Help

- **GitHub Discussions**: Ask questions and engage with the community
- **Issues**: Report bugs or technical problems
- **Pull Requests**: Review others' contributions

### Recognition

Contributors will be recognized in our README and release notes. We value every contribution, no matter how small!

---

## License

By contributing to Swagat Garments, you agree that your contributions will be licensed under the same license as the project.

---

## Questions?

If you have any questions about contributing, feel free to:

- Open a discussion on GitHub
- Reach out to the maintainers
- Check our documentation

Thank you for contributing to Swagat Garments! Together, we're building something great. 🚀👔
