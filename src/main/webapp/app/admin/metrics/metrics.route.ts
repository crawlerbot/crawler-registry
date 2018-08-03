import { Route } from '@angular/router';

import { SimMetricsMonitoringComponent } from './metrics.component';

export const metricsRoute: Route = {
    path: 'sim-metrics',
    component: SimMetricsMonitoringComponent,
    data: {
        pageTitle: 'Application Metrics'
    }
};
