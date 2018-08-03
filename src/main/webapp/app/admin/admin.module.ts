import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SimlifeRegistrySharedModule } from 'app/shared';

import {
    adminState,
    LogsComponent,
    SimMetricsMonitoringModalComponent,
    SimMetricsMonitoringComponent,
    SimHealthModalComponent,
    SimHealthCheckComponent,
    SimConfigurationComponent,
    SimDocsComponent,
    SimConfigurationService,
    SimLogfileComponent,
    SimHealthService,
    SimMetricsService,
    LogsService,
    SimLogfileService
} from './';

@NgModule({
    imports: [SimlifeRegistrySharedModule, RouterModule.forChild(adminState)],
    declarations: [
        LogsComponent,
        SimConfigurationComponent,
        SimDocsComponent,
        SimHealthCheckComponent,
        SimHealthModalComponent,
        SimMetricsMonitoringComponent,
        SimMetricsMonitoringModalComponent,
        SimLogfileComponent
    ],
    entryComponents: [SimHealthModalComponent, SimMetricsMonitoringModalComponent],
    providers: [SimConfigurationService, SimHealthService, SimMetricsService, LogsService, SimLogfileService],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SimlifeRegistryAdminModule {}
