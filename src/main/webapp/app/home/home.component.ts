import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { SimEventManager } from 'ng-simlife';

import { Account, LoginModalService, Principal } from 'app/shared';
import { SimHealthService } from 'app/admin';
import { SimApplicationsService } from 'app/registry';
import { SimRefreshService } from '../shared/refresh/refresh.service';
import { Subscription } from 'rxjs/Subscription';

import { VERSION } from 'app/app.constants';
import { EurekaStatusService } from './eureka.status.service';
import { ProfileService } from 'app/layouts/profiles/profile.service';
import { LoginOAuth2Service } from 'app/shared/oauth2/login-oauth2.service';

@Component({
    selector: 'sim-home',
    templateUrl: './home.component.html',
    styleUrls: ['home.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
    account: Account;
    modalRef: NgbModalRef;
    updatingHealth: boolean;
    healthData: any;
    appInstances: any;
    status: any;
    version: string;

    refreshReloadSubscription: Subscription;

    constructor(
        private principal: Principal,
        private loginModalService: LoginModalService,
        private loginOAuth2Service: LoginOAuth2Service,
        private eventManager: SimEventManager,
        private eurekaStatusService: EurekaStatusService,
        private applicationsService: SimApplicationsService,
        private healthService: SimHealthService,
        private profileService: ProfileService,
        private refreshService: SimRefreshService
    ) {
        this.version = VERSION ? 'v' + VERSION : '';
        this.appInstances = [];
    }

    ngOnInit() {
        this.principal.identity().then((account) => {
            this.account = account;
            if (!account || !this.isAuthenticated()) {
                this.login();
            } else {
                this.refreshReloadSubscription = this.refreshService.refreshReload$.subscribe((empty) => this.populateDashboard());
                this.populateDashboard();
            }
        });

        this.registerAuthenticationSuccess();
    }

    ngOnDestroy() {
        if (this.refreshReloadSubscription) {
            this.refreshReloadSubscription.unsubscribe();
        }
    }

    registerAuthenticationSuccess() {
        this.eventManager.subscribe('authenticationSuccess', (message) => {
            this.principal.identity().then((account) => {
                this.account = account;
                this.populateDashboard();
            });
        });
    }

    isAuthenticated() {
        return this.principal.isAuthenticated();
    }

    login() {
        this.profileService.getProfileInfo().then((profileInfo) => {
            if (profileInfo.activeProfiles.indexOf('oauth2') > -1) {
                this.loginOAuth2Service.login();
            } else {
                this.modalRef = this.loginModalService.open();
            }
        });
    }

    populateDashboard() {
        this.eurekaStatusService.findAll().subscribe((data) => {
            this.status = data.status;
        });

        this.applicationsService.findAll().subscribe((data) => {
            this.appInstances = [];
            for (const app of data.applications) {
                for (const inst of app.instances) {
                    inst.name = app.name;
                    this.appInstances.push(inst);
                }
            }
        });

        this.healthService.checkHealth().subscribe(
            (response) => {
                this.healthData = this.healthService.transformHealthData(response);
                this.updatingHealth = false;
            },
            (response) => {
                this.healthData = this.healthService.transformHealthData(response.data);
                this.updatingHealth = false;
            }
        );
    }

    baseName(name: string) {
        return this.healthService.getBaseName(name);
    }

    subSystemName(name: string) {
        this.healthService.getSubSystemName(name);
    }

    getBadgeClass(statusState) {
        if (statusState === 'UP') {
            return 'badge-success';
        } else {
            return 'badge-danger';
        }
    }
}
