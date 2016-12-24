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

You can nested `<Fetch/>` components. `<Slider/>` receive "photos" and "images" prop.
```javascript
import React, { Component } from 'react';
import Fetch from 'react-fetch-as';

class NestedExample extends Component {
  render() {
    return (
      <Fetch from="http://example.org/photos" as="photos">
        <Fetch from="http://example.org/images" as="images">
          <Slider/>
        </Fetch>
      </Fetch>
    );
  }
}
```
