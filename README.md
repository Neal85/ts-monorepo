# ts-monorepo

    yarn install
    yarn run build
    yarn run prerelaese
    

### Local development

Using yarn link for local develpment.

    cd /ts-monorepo/
    yarn run link


    # In your app using yarn link
    cd /your-app-path/
    yarn link "@ts-monorepo/core"
    yarn link "@ts-monorepo/feature"


    # Your app/main.js
    const feature = require('@ts-monorepo/feature');
    const core = require('@ts-monorepo/core');

    console.log('Core name:', core.default.name);

    feature.default.info();


    node main.js
