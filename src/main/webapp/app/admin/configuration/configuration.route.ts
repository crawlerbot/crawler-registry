import { Route } from '@angular/router';

import { SimConfigurationComponent } from './configuration.component';

export const configurationRoute: Route = {
    path: 'sim-configuration',
    component: SimConfigurationComponent,
    data: {
        pageTitle: 'Cloud configuration'
    }
};
