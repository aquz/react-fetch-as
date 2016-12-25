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

## Props

Name | Description | Is required | Default
------------ | ------------- | ------------- | -------------
from | URL of the resource you want to fetch. | yes | -
as | Name of the prop, which will be passed to the children component. | no | data
options | Fetch options (https://developer.mozilla.org/en-US/docs/Web/API/GlobalFetch/fetch#Parameters) |  no | `{}`
toJson | If `true` response will be parsed to object.  | no | `true`
spinner | React component or string. Will be displayed while loading. | no | `null`
onError | Callback on catch error. | no | -
onSuccess | Callback on success. | no | -
