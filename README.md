# React Fetcher Component
## Install
```
npm install --save react-fetcher
```

## Example

After response, children component (`<Slider/>`) will be rendered with "photos" prop, which will contain data from response.
```javascript
import React, { Component } from 'react';
import Fetch from 'react-fetcher';

class FetcherExample extends Component {
  render() {
    return (
      <Fetch from="http://example.org/photos" as="photos">
        <Slider/>
      </Fetch>
    );
  }
}
```
