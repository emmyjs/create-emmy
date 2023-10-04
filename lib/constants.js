#!/usr/bin/env node
const TEMPLATES = {
    counter:
`import { LightComponent, launch } from "emmy-dom";

class Counter extends LightComponent {
    constructor() {
        super();
        this.setAttribute('counter', 0);

        this.render(\`
            <h2>Counter</h2>
            <p id="counter">\${this.getAttribute('counter')}</p>
            <div class='flex flex-row'>
                <button id='plusButton' class='round'>+</button>
                <button id='minusButton' class='round'>-</button>
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

        this.render(/*html*/\`
            <div class="text-center">
                <h1 class="text-3xl font-bold">Hello from Emmy!</h1>
                <p class="text-xl">
                    This is a sample app created with
                    <a href="https://github.com/eanorambuena/create-emmy" target="_blank">Emmy.js</a>
                </p>
                <Counter></Counter>
            </div>
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
`};

module.exports = { TEMPLATES };
