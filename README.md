# React Fetch As Component
## Install
```
npm install --save react-fetch-as
```

## Example

After response, children component (`<Slider/>`) will be rendered with "photos" prop, which will contain data from response.
```javascript
import React, { Component } from 'react';
import Fetch from 'react-fetch-as';

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
