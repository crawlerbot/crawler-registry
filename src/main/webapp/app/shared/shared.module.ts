import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { DatePipe } from '@angular/common';
import { CookieService } from 'ngx-cookie';

import {
    SimlifeRegistrySharedLibsModule,
    SimlifeRegistrySharedCommonModule,
    CSRFService,
    AuthServerProvider,
    AuthSessionServerProvider,
    AccountService,
    UserService,
    StateStorageService,
    LoginService,
    LoginModalService,
    LoginOAuth2Service,
    Principal,
    HasAnyAuthorityDirective,
    SimLoginModalComponent,
    SimRoutesService,
    SimRefreshService
} from './';

@NgModule({
    imports: [SimlifeRegistrySharedLibsModule, SimlifeRegistrySharedCommonModule],
    declarations: [SimLoginModalComponent, HasAnyAuthorityDirective],
    providers: [
        SimRoutesService,
        SimRefreshService,
        AuthServerProvider,
        AuthSessionServerProvider,
        CookieService,
        LoginService,
        LoginModalService,
        LoginOAuth2Service,
        AccountService,
        StateStorageService,
        Principal,
        CSRFService,
        AuthServerProvider,
        UserService,
        DatePipe
    ],
    entryComponents: [SimLoginModalComponent],
    exports: [SimlifeRegistrySharedCommonModule, SimLoginModalComponent, HasAnyAuthorityDirective, DatePipe],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SimlifeRegistrySharedModule {}
