#!/usr/bin/env node
const TEMPLATES = {
    application: (options) =>
/*html*/`<!DOCTYPE html>
<html>
  <head>
    <title>${ options.name }</title>
    <meta name="viewport" content="width=device-width,initial-scale=1">
    ${ options.rails ? "<%= csrf_meta_tags %>\n<%= csp_meta_tag %>" : "" }
    ${ options.tailwind
      ? ( options.rails
        ? '<%= stylesheet_link_tag "tailwind", "inter-font", "data-turbo-track": "reload" %>'
        : '<link rel="stylesheet" href="./styles/index.css">' )
      : `<script src="https://cdn.tailwindcss.com"></script>
    <script>
      tailwind.config = {
        theme: {
          extend: {
            fontFamily: {
              sans: ['Inter var],
            },
          },
        },
      }
    </script>` }
    ${ options.rails ? 
    `<%= stylesheet_link_tag "application", "data-turbo-track": "reload" %>
    <%= javascript_importmap_tags %>` : "" }
  </head>
  <body class="antialiased h-screen w-screen flex flex-col justify-center items-center">
    <main class="flex flex-col justify-center items-center space-y-3 text-center w-full h-full">
      ${ options.rails ? "<%= yield %>" : "" }
      ${ options.vanilla ?
      `<script type='module' src='../node_modules/emmy-dom/emmy.js'></script>
      <script type='module' src='./app/index.js'></script>
      <script type='module' src='./app/components/counter.js'></script>
      <emmy-app></emmy-app>` : "" }
    </main>
  </body>
</html>
`,
    counter: (options) =>
`import { LightComponent, launch } from "${ options.vanilla ? 
  '../../node_modules/emmy-dom/emmy.js' : 'emmy-dom' }";

class Counter extends LightComponent {
  constructor() {
    super();
    this.setAttribute('counter', 0);
    this.behave('section');
    this.setAttribute('class', 'flex flex-col justify-center items-center space-y-3');

    this.render(\`
      <h2 class='text-2xl font-bold'>Counter</h2>
      <p id="counter">\${ this.getAttribute('counter') }</p>
      <div class='flex flex-row justify-center items-center space-x-2'>
        <button id='plusButton' class='bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 border rounded-full'>
          +
        </button>
        <button id='minusButton' class='bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 border rounded-full'>
          -
        </button>
      </div>
    \`, (_) => {
      _.$('#plusButton').onclick = () => {
        _.setAttribute('counter', parseInt(_.getAttribute('counter')) + 1);
      };
      _.$('#minusButton').onclick = () => {
        _.setAttribute('counter', parseInt(_.getAttribute('counter')) - 1);
      };
    });
  }

  static get observedAttributes() {
    return ['counter'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'counter') {
      this.$('#counter').innerHTML = newValue;
    }
  }
}

launch(Counter);
`,
    css:
`@tailwind base;
@tailwind components;
@tailwind utilities;
`,
    index: (options) =>
`import { LightComponent, launch } from "${ options.vanilla ?
  '../node_modules/emmy-dom/emmy.js' : 'emmy-dom' }";

class App extends LightComponent {
  constructor() {
    super();
    this.behave('div');
    this.setAttribute('class',
      'flex flex-col justify-center items-center space-y-3 text-center w-full h-full');

    this.render(/*html*/\`
      <h1 class="text-3xl font-bold">Hello from Emmy.js!</h1>
      <p class="text-xl">
        Edit <code style="font-family: source-code-pro, Menlo, Monaco, Consolas;">
        ${ options.rails ? 'public/javascript/views/home/index.js' : 'app/index.js' }
        </code> and save to reload.
      </p>
      <a href="https://eanorambuena.github.io/Emmy.js" target="_blank" class="text-blue-600 hover:text-blue-700">
        Learn Emmy.js
      </a>
      <Counter></Counter>
    \`);
  }
}

launch(App);
`,
    home:
/*html*/`<script type='module' src='/javascript/views/home/index.js'></script>
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
    './styles/*.css'` :
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
`};

module.exports = { TEMPLATES };
