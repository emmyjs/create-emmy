#!/usr/bin/env node
const TEMPLATES = {
  application: (options) =>
/*html*/`<!DOCTYPE html>
<html>
  <head>
    <title>${ options.name }</title>
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <meta name="theme-color" content="#0F172A">
    <link rel="icon" href="https://raw.githubusercontent.com/emmyjs/emmyjs.github.io/main/public/favicon.ico" type="image/x-icon">
    ${ options.rails ? "<%= csrf_meta_tags %>\n<%= csp_meta_tag %>" : "" }
    ${ options.tailwind
      ? ( options.rails
        ? '<%= stylesheet_link_tag "tailwind", "inter-font", "data-turbo-track": "reload" %>'
        : '' )
      : `<script src="https://cdn.tailwindcss.com"></script>` }
    ${ options.vanilla ? '<link rel="stylesheet" href="./styles/index.css">' : ''}
    ${ options.rails ? 
    `<%= stylesheet_link_tag "application", "data-turbo-track": "reload" %>
    <%= javascript_importmap_tags %>` : "" }
  </head>
  <body class="antialiased h-screen w-screen flex flex-col justify-center items-center bg-slate-900">
    <main class="flex flex-col justify-center items-center space-y-3 text-center w-full h-full">
      ${ options.rails ? "<%= yield %>" : "" }
      ${ (options.vanilla && !options.prerender) ?
      `<emmy-app></emmy-app>
      <script type='module' src='./app/index.js'></script>` : "" }
      ${ (options.vanilla && options.prerender) ? `{content}` : "" }
    </main>
  </body>
</html>
`,
  counter: (options) =>
`import { load, html } from "${ options.prerender ? 'emmy-dom/dist/server.js' : 'emmy-dom' }";

export function counter ({ el }) {
  el.className = 'flex flex-col justify-center items-center space-y-3';
  const [counter, setCounter] = el.useState(0);

  el.useEffect(() => {
    console.log('Counter value changed to', counter());
  }, [counter]);

  el.useEffect(() => {
    el.querySelector('#plusButton').addEventListener('click', () => setCounter(counter() + 1));
    el.querySelector('#minusButton').addEventListener('click', () => setCounter(counter() - 1));
  }, ['didMount']);

  return () => html\`
    <h2 class='text-2xl font-bold'>Counter</h2>
    <p id="counter">\${ counter() }</p>
    <div class='flex flex-row justify-center items-center space-x-2'>
      <button id='plusButton' class='text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700'>
        +
      </button>
      <button id='minusButton' class='text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700'>
        -
      </button>
    </div>
  \`;
}

load(counter, 'Counter');
`,
  css: (options) =>
`${
  options.tailwind
? `@tailwind base;
@tailwind components;
@tailwind utilities;`
: ''
}

* {
  font-family: 'Inter var', 'Verdana', sans-serif;
}
`,
  index: (options) =>
`import { load, html } from "${ options.prerender ? 'emmy-dom/dist/server.js' : 'emmy-dom' }";
import "${ options.rails ? '../..' : '.' }/components/counter.js";

export function app({ el }) {
  el.className = 'flex flex-col justify-center items-center space-y-3 text-center w-full h-full text-white';

  return html\`
    <h1 class="text-3xl font-bold">Hello from Emmy.js!</h1>
    <p class="text-xl">
      Edit <code style="font-family: source-code-pro, Menlo, Monaco, Consolas;">
      app/index.js
      </code> and save to reload.
    </p>
    <a href="https://emmyjs.github.io/" class="inline-flex items-center justify-center p-5 text-base font-medium text-gray-500 rounded-lg bg-gray-50 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-white">
      <img src="https://raw.githubusercontent.com/emmyjs/emmyjs.github.io/main/public/logo.png" alt="Emmy.js logo" class="w-6 h-6 mr-2">
      <span class="w-full">Get started with Emmy.JS</span>
      <svg class="w-4 h-4 ml-2" aria-hidden="true" fill="none" viewBox="0 0 14 10">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
      </svg>
    </a>
    <Counter></Counter>
    <a
    href="https://github.com/emmyjs"
    class="text-white bg-[#24292F] hover:bg-[#24292F]/90 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-500 dark:hover:bg-[#050708]/30 mr-2 mb-2"
    >
      <svg class="w-4 h-4 mr-2" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
        <path fill-rule="evenodd" d="M10 .333A9.911 9.911 0 0 0 6.866 19.65c.5.092.678-.215.678-.477 0-.237-.01-1.017-.014-1.845-2.757.6-3.338-1.169-3.338-1.169a2.627 2.627 0 0 0-1.1-1.451c-.9-.615.07-.6.07-.6a2.084 2.084 0 0 1 1.518 1.021 2.11 2.11 0 0 0 2.884.823c.044-.503.268-.973.63-1.325-2.2-.25-4.516-1.1-4.516-4.9A3.832 3.832 0 0 1 4.7 7.068a3.56 3.56 0 0 1 .095-2.623s.832-.266 2.726 1.016a9.409 9.409 0 0 1 4.962 0c1.89-1.282 2.717-1.016 2.717-1.016.366.83.402 1.768.1 2.623a3.827 3.827 0 0 1 1.02 2.659c0 3.807-2.319 4.644-4.525 4.889a2.366 2.366 0 0 1 .673 1.834c0 1.326-.012 2.394-.012 2.72 0 .263.18.572.681.475A9.911 9.911 0 0 0 10 .333Z" clip-rule="evenodd"/>
      </svg>
      View Emmy.js on GitHub
    </a>
  \`;
}

export const App = load(app, 'App');
`,
  home:
/*html*/`
<script type='module' src='/javascript/views/home/index.js'></script>
<script type='module' src='/javascript/components/counter.js'></script>
<emmy-app></emmy-app>
`,
  routes:
`Rails.application.routes.draw do
    root 'home#index'
end
`,
  tailwind: (options) =>
`const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    ${ options.vanilla ? 
    `'./app/**/*.{html,js}',
    './*.html',
    './styles/*.css',
    './public/*.html'` :
    `'./public/*.html',
    './app/helpers/**/*.rb',
    './app/javascript/**/*.js',
    './app/views/**/*.{erb,haml,html,slim}',
    './public/javascript/**/*.js'` }
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter var'${ options.rails ? ', ...defaultTheme.fontFamily.sans' : '' }]
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    ${ options.rails ? "require('@tailwindcss/aspect-ratio')," : '' }
    require('@tailwindcss/typography'),
    ${ options.rails ? "require('@tailwindcss/container-queries')" : '' }
  ]
}
`, 
  prerender: (options) => `
import { build } from "emmy-dom/dist/server.js";
import { app, App } from "./app/index.js";
import { counter } from "./app/components/counter.js";

build({
  app: App,
  dependencies: \`
    import { load, html } from "emmy-dom";
  \`,
  generators: {
    app, counter
  },
  template: './template.html'
});
`};

module.exports = { TEMPLATES };
