import { Route } from '@angular/router';
import { SimSSHComponent } from './ssh.component';

export const sshRoute: Route = {
    path: 'ssh',
    component: SimSSHComponent,
    data: {
        pageTitle: 'SSH public key'
    }
};
