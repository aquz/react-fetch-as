import React from 'react';
import { mount } from 'enzyme';
import { expect } from 'chai';
import fetchMock from 'fetch-mock';
import Fetch from '../index';

const { describe, it } = global;

fetchMock.get('*', {text: 'Fetcher test'});

const Test = ({data}) => (
  <div>aaaa: {data.text}</div>
);

describe('<Fetch/>', () => {
  it('child should render text', (done) => {
    const wrapper = mount(
      <Fetch from="http://example.org" onSuccess={onSuccess}>
        <Test/>
      </Fetch>
    );

    function onSuccess() {
      expect(wrapper.find('Test').text()).to.contain('Fetcher test');
      done();
    }
  });
});
