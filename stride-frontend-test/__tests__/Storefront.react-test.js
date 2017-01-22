import React from 'react';
import ReactTestUtils from 'react-addons-test-utils'
import Storefront from '../lib/storefront';


describe("idk", () => {
  beforeEach(function() {
    ReactDOM.render(React.createElement(Storefront))
  });

  it("renders a paragraph which greets someone", function() {
    const renderer = ReactTestUtils.createRenderer();
    renderer.render(<Storefront />);
    const result = renderer.getRenderOutput();

    expect(result.type).toBe('div');
  });
})
