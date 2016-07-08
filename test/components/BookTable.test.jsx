import chai, { expect } from 'chai';
import spies from 'chai-spies';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import { BookTable } from '../../src/components/BookTable';

const fixtures = require('../../test/fixtures.json');
chai.use(spies);

const setup = () => {
    const props = {
        books: fixtures,
        store: chai.spy(),
        dispatch: chai.spy()
    };

    const renderer = TestUtils.createRenderer();
    renderer.render(<BookTable {...props}/>);
    const output = renderer.getRenderOutput();

    return {
        props,
        output,
        renderer
    }
};

describe('components', () => {
    describe('BookTable component', () => {
        it('should render correctly', () => {
            const { output } = setup();

            expect(output.props.children.length).to.equal(9);
        });
    });
});