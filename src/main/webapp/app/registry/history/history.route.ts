import { Route } from '@angular/router';
import { SimHistoryComponent } from './history.component';

export const historyRoute: Route = {
    path: 'history',
    component: SimHistoryComponent,
    data: {
        pageTitle: 'History'
    }
};
