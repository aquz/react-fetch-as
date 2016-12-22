import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import Fetch from '../index';

const Photo = ({data}) => (
  <img src={data.thumbnailUrl}/>
);


storiesOf('ReactFetcher', module)
  .add('simple example', () => (
    <Fetch from="https://jsonplaceholder.typicode.com/photos/1" spinner="Loading photo...">
      <Photo/>
    </Fetch>
  ));