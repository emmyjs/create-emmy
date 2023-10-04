#!/usr/bin/env node
const TEMPLATES = {
    counter:
`import { LightComponent, launch } from "emmy-dom";

class Counter extends LightComponent {
    constructor() {
        super();
        this.setAttribute('counter', 0);
        this.behave('section');
        this.setAttribute('class', 'flex flex-col justify-center items-center space-y-2');

        this.render(\`
            <h2>Counter</h2>
            <p id="counter">\${this.getAttribute('counter')}</p>
            <div class='flex flex-row justify-center items-center space-x-2'>
                <button id='plusButton' class='bg-blue-600 hover:bg-red-700 text-white text-sm px-4 py-2  border rounded-full'>+</button>
                <button id='minusButton' class='bg-blue-600 hover:bg-red-700 text-white text-sm px-4 py-2  border rounded-full'>-</button>
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
    index: 
`import { LightComponent, launch } from "emmy-dom";

class App extends LightComponent {
    constructor() {
        super();
        this.behave('div');
        this.setAttribute('class', 'flex flex-col justify-center items-center space-y-2 text-center w-full h-full');

        this.render(/*html*/\`
            <h1 class="text-3xl font-bold">Hello from Emmy.js!</h1>
            <Counter></Counter>
            <p class="text-xl">
                Edit <code>public/javascript/views/home/index.js</code> and save to reload.
                <a href="https://github.com/eanorambuena/emmy-dom" target="_blank">Learn Emmy.js</a>
            </p>
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
    tailwind:
`const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    './public/*.html',
    './app/helpers/**/*.rb',
    './app/javascript/**/*.js',
    './app/views/**/*.{erb,haml,html,slim}',
    './public/javascript/**/*.js'
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/container-queries'),
  ]
}
`};

module.exports = { TEMPLATES };
