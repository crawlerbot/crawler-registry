import { NgModule, LOCALE_ID } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { GroupByPipe } from './pipe/group-by.pipe';
import { registerLocaleData } from '@angular/common';
import locale from '@angular/common/locales/en';
import {
    SimlifeRegistrySharedLibsModule,
    SimAlertComponent,
    SimAlertErrorComponent,
    SimRouteSelectorComponent,
    SimRefreshSelectorComponent
} from './';

@NgModule({
    imports: [SimlifeRegistrySharedLibsModule],
    declarations: [SimAlertComponent, SimAlertErrorComponent, SimRouteSelectorComponent, SimRefreshSelectorComponent, GroupByPipe],
    providers: [
        Title,
        {
            provide: LOCALE_ID,
            useValue: 'en'
        }
    ],
    exports: [
        SimlifeRegistrySharedLibsModule,
        SimAlertComponent,
        SimAlertErrorComponent,
        SimRouteSelectorComponent,
        SimRefreshSelectorComponent,
        GroupByPipe
    ]
})
export class SimlifeRegistrySharedCommonModule {
    constructor() {
        registerLocaleData(locale);
    }
}
