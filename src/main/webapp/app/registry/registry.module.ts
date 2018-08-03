import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SimlifeRegistrySharedModule } from '../shared';

import {
    registryState,
    SimApplicationsComponent,
    SimConfigComponent,
    SimEncryptionComponent,
    SimHistoryComponent,
    SimReplicasComponent,
    SimSSHComponent,
    SimApplicationsService,
    SimConfigService,
    SimEncryptionService,
    SimHistoryService,
    SimReplicasService,
    SimSSHService
} from './';

@NgModule({
    imports: [SimlifeRegistrySharedModule, RouterModule.forRoot(registryState, { useHash: true })],
    declarations: [
        SimApplicationsComponent,
        SimConfigComponent,
        SimEncryptionComponent,
        SimHistoryComponent,
        SimReplicasComponent,
        SimSSHComponent
    ],
    entryComponents: [],
    providers: [SimApplicationsService, SimConfigService, SimEncryptionService, SimHistoryService, SimReplicasService, SimSSHService],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SimlifeRegistryModule {}
