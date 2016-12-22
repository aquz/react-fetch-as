import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import Fetch from '../index';

const Photo = ({ data }) => (
  <img src={data.thumbnailUrl} />
);

const PhotoAs = ({ photo }) => (
  <img src={photo.thumbnailUrl} />
);


const Album = ({ photo, photo2 }) => (
  <div>
    <img src={photo.thumbnailUrl} />
    <img src={photo2.thumbnailUrl} />
  </div>
);

const Result = ({data}) => (
  <pre>
    {JSON.stringify(data)}
  </pre>
);


storiesOf('ReactFetcher', module)
  .add('simple example', () => (
    <Fetch from="https://jsonplaceholder.typicode.com/photos/1" spinner="Loading photo...">
      <Photo />
    </Fetch>
  ))
  .add('with "as" prop', () => (
    <Fetch from="https://jsonplaceholder.typicode.com/photos/2" as="photo" spinner="Loading photo...">
      <PhotoAs />
    </Fetch>
  ))
  .add('on error', () => (
    <Fetch from="https://fake.domain.example" onError={() => global.alert('Fetch error')} spinner="Loading photo..." >
      <Photo />
    </Fetch>
  ))
  .add('nested', () => (
    <Fetch from="https://jsonplaceholder.typicode.com/photos/1" as="photo" spinner="Loading photo...">
      <Fetch from="https://jsonplaceholder.typicode.com/photos/2" as="photo2" spinner="Loading photo2...">
        <Album />
      </Fetch>
    </Fetch>
  ))
  .add('props "options", POST request', () => (
    <Fetch from="https://jsonplaceholder.typicode.com/posts" options={{method: 'POST'}} spinner="POST request...">
      <Result/>
    </Fetch>
  ));
