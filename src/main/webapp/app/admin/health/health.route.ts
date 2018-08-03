import { Route } from '@angular/router';

import { SimHealthCheckComponent } from './health.component';

export const healthRoute: Route = {
    path: 'sim-health',
    component: SimHealthCheckComponent,
    data: {
        pageTitle: 'Health Checks'
    }
};
