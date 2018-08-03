import './vendor.ts';

import { NgModule, Injector } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { Ng2Webstorage, LocalStorageService, SessionStorageService } from 'ngx-webstorage';
import { SimEventManager } from 'ng-simlife';

import { AuthInterceptor } from './blocks/interceptor/auth.interceptor';
import { AuthExpiredInterceptor } from './blocks/interceptor/auth-expired.interceptor';
import { ErrorHandlerInterceptor } from './blocks/interceptor/errorhandler.interceptor';
import { NotificationInterceptor } from './blocks/interceptor/notification.interceptor';
import { SimlifeRegistrySharedModule, UserRouteAccessService } from './shared';
import { SimlifeRegistryAppRoutingModule } from './app-routing.module';
import { SimlifeRegistryHomeModule } from './home/home.module';
import { SimlifeRegistryAdminModule } from './admin/admin.module';
import { SimlifeRegistryModule } from './registry/registry.module';

import { PaginationConfig } from './blocks/config/uib-pagination.config';

import { SimMainComponent, NavbarComponent, FooterComponent, ProfileService, PageRibbonComponent, ErrorComponent } from './layouts';

@NgModule({
    imports: [
        BrowserModule,
        SimlifeRegistryAppRoutingModule,
        Ng2Webstorage.forRoot({ prefix: 'sim', separator: '-' }),
        SimlifeRegistrySharedModule,
        SimlifeRegistryHomeModule,
        SimlifeRegistryAdminModule,
        SimlifeRegistryModule
    ],
    declarations: [SimMainComponent, NavbarComponent, ErrorComponent, PageRibbonComponent, FooterComponent],
    providers: [
        ProfileService,
        PaginationConfig,
        UserRouteAccessService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true,
            deps: [LocalStorageService, SessionStorageService]
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthExpiredInterceptor,
            multi: true,
            deps: [Injector]
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: ErrorHandlerInterceptor,
            multi: true,
            deps: [SimEventManager]
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: NotificationInterceptor,
            multi: true,
            deps: [Injector]
        }
    ],
    bootstrap: [SimMainComponent]
})
export class SimlifeRegistryAppModule {}
