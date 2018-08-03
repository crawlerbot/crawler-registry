import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SimlifeRegistrySharedModule } from 'app/shared';

import { HOME_ROUTE, HomeComponent } from './';
import { EurekaStatusService } from './eureka.status.service';
import { SimLoginModalComponent } from 'app/core/login/login.component';

@NgModule({
    imports: [SimlifeRegistrySharedModule, RouterModule.forRoot([HOME_ROUTE], { useHash: true })],
    declarations: [HomeComponent],
    entryComponents: [SimLoginModalComponent],
    providers: [EurekaStatusService],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SimlifeRegistryHomeModule {}
