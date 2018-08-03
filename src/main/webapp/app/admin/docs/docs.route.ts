import { Route } from '@angular/router';

import { SimDocsComponent } from './docs.component';

export const docsRoute: Route = {
    path: 'docs',
    component: SimDocsComponent,
    data: {
        pageTitle: 'API'
    }
};
