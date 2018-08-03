import { Route } from '@angular/router';

import { SimApplicationsComponent } from './applications.component';

export const applicationsRoute: Route = {
    path: 'applications',
    component: SimApplicationsComponent,
    data: {
        pageTitle: 'Applications'
    }
};
