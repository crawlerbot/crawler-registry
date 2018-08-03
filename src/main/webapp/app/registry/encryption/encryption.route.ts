import { Route } from '@angular/router';
import { SimEncryptionComponent } from './encryption.component';

export const encryptionRoute: Route = {
    path: 'encryption',
    component: SimEncryptionComponent,
    data: {
        pageTitle: 'Encryption'
    }
};
