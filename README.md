<section align="center" style="display: flex; flex-direction: column">
  <h1>create-emmy</h1>
  <div>
    <img alt="npm" src="https://img.shields.io/npm/v/create-emmy"/>
    <img alt="npm" src="https://img.shields.io/npm/dt/create-emmy"/>
    <img alt="NPM" src="https://img.shields.io/npm/l/create-emmy"/>
    <img alt="GitHub last commit (by committer)" src="https://img.shields.io/github/last-commit/emmyjs/create-emmy"/>
  </div>
  <i>An Emmy.js applications generator</i><br />
  <a href="https://emmyjs.github.io/">More information about Emmy.js</a>
</section>
<hr />

## Quick start
Just run the following command to create a new Emmy.js application using Create Emmy CLI:
```bash
npx create-emmy
```

### Creating a Ruby on Rails + Emmy.js + TailwindCSS application
For creating a new Emmy.js application with Ruby on Rails and TailwindCSS, just run the following command:
```bash
npx create-emmy my-app --rails --tailwind --run
```

### Creating a Vanilla JS + Emmy.js + TailwindCSS application
For creating a new Emmy.js application with Vanilla Vite and TailwindCSS, just run the following command:
```bash
npx create-emmy my-app --vanilla --tailwind --run
```

## Options
- `--vanilla` - Creates a Vanilla application uing Vite
- `--rails` - Creates a Ruby on Rails application
- `--tailwind` - Adds TailwindCSS to the application
- `--run` - Runs the application after creation
- `-v, --version` - Output the version number
