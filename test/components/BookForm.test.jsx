import chai, { expect } from 'chai';
import spies from 'chai-spies';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import { BookForm } from '../../src/components/BookForm';

chai.use(spies);


const setup = () => {
    const props = {
        fields: {},
        store: chai.spy(),
        dispatch: chai.spy(),
        handleSubmit: chai.spy(),
        submitting: false
    };

    const renderer = TestUtils.createRenderer();
    renderer.render(<BookForm {...props} />);
    const output = renderer.getRenderOutput();

    return {
        props,
        output,
        renderer
    }
};

describe('components', () => {
    describe('BookForm component', () => {
        it('should render correctly', () => {
            const { output } = setup();

            expect(output.type).to.equal('form');
        });
    });
});