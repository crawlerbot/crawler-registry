import { Route } from '@angular/router';
import { SimReplicasComponent } from './replicas.component';

export const replicasRoute: Route = {
    path: 'replicas',
    component: SimReplicasComponent,
    data: {
        pageTitle: 'Replicas'
    }
};
