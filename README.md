[![Build Status](https://travis-ci.org/kctang/mdl-ui.svg)](https://travis-ci.org/kctang/mdl-ui)
[![Dependency Status](https://gemnasium.com/kctang/mdl-ui.svg)](https://gemnasium.com/kctang/mdl-ui)
# mdl-ui

React based [stateless functional components](http://tylermcginnis.com/functional-components-vs-stateless-functional-components-vs-stateless-components/) using Material Design Lite (MDL).

Provides high level UI components that represent typical application screens. Configurations are done purely based on each component's `props`.

 * Onboarding screen
 * Application layout screen with options to display avatar profile photo and more.

While it is possible and definitely more flexible to create these screens using MDL directly, having them as higher level UI components makes it easier to prototype applications in a consistent manner.

## Getting Started

These commands will clone, install and run [storybook](https://github.com/kadirahq/react-storybook) locally:
```
clone https://github.com/kctang/mdl-ui.git
cd mdl-ui
npm install
npm run build
npm run storybook
```

Review source code at `src/.stories` for examples on how to use components in this package.

## Usage (for NPM based project)

Install this package:
```
npm install -S mdl-ui
```

Install this package's [peer dependencies](https://nodejs.org/en/blog/npm/peer-dependencies/) if you are using [NPM 3](http://blog.npmjs.org/post/110924823920/npm-weekly-5).
```
npm install -S react react-mdl nuka-carousel underscore
```

```javascript
// sets up react-mdl
import 'react-mdl/extra/material.css';
import 'react-mdl/extra/material';

// sets up this package and expose all exported modules as "MdlUi"
import * as MdlUi from 'mdl-ui';

const MyApp = () => <MdlUi.App title="My App" />;
```

## Need Help?

Create an [issue](https://github.com/kctang/mdl-ui/issues/new) or contact @kctang on Twitter if you need help.
