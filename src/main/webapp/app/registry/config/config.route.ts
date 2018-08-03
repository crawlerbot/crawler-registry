import { Route } from '@angular/router';
import { SimConfigComponent } from './config.component';

export const configRoute: Route = {
    path: 'config',
    component: SimConfigComponent,
    data: {
        pageTitle: 'Configuration'
    }
};
