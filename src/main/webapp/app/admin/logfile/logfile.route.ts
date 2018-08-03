import { Route } from '@angular/router';

import { SimLogfileComponent } from './logfile.component';

export const logfileRoute: Route = {
    path: 'logs',
    component: SimLogfileComponent,
    data: {
        pageTitle: 'Logs'
    }
};
