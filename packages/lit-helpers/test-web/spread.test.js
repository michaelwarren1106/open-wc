import { expect, fixture } from '@open-wc/testing';
import { LitElement, html } from 'lit';
import { spread, spreadProps } from '../index.js';

class SpreadTestElement extends LitElement {
  static get properties() {
    return {
      string: { type: String },
      number: { type: Number },
      array: { type: Array },
      object: { type: Object },
    };
  }

  constructor() {
    super();
    this.string = '';
    this.number = 0;
    this.array = [];
    this.object = {};
  }

  render() {
    return html`<slot></slot>`;
  }
}

customElements.define('spread-test-element', SpreadTestElement);

describe('spread', () => {
  const string = 'Hello, I am a string.';
  const number = 42;
  const array = 'This is an array.'.split(' ');
  const object = {
    foo: 'bar',
    baz: true,
    bar: false,
  };
  it('spread', async () => {
    let clickTest = 0;
    const properties = {
      string,
      number,
      '.array': array,
      '.object': object,
      '@click': () => {
        clickTest += 1;
      },
    };
    const el = await fixture(html`
      <spread-test-element ${spread(properties)}></spread-test-element>
    `);

    expect(el.string).to.equal(string);
    expect(el.number).to.equal(number);
    expect(el.array).to.deep.equal(array);
    expect(el.object).to.deep.equal(object);
    expect(clickTest).to.equal(0);
    el.click();
    expect(clickTest).to.equal(1);
  });
  it('spreadProperties', async () => {
    const properties = {
      string,
      number,
      array,
      object,
    };
    const el = await fixture(html`
      <spread-test-element ${spreadProps(properties)}></spread-test-element>
    `);

    expect(el.string).to.equal(string);
    expect(el.number).to.equal(number);
    expect(el.array).to.equal(array);
    expect(el.object).to.equal(object);
  });
});
