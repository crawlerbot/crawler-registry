import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { SimHealthService } from './health.service';
import { SimHealthModalComponent } from './health-modal.component';

import { SimRoutesService, Route } from 'app/shared';

@Component({
    selector: 'sim-health',
    templateUrl: './health.component.html'
})
export class SimHealthCheckComponent implements OnInit, OnDestroy {
    healthData: any;
    updatingHealth: boolean;
    activeRoute: Route;
    subscription: Subscription;

    constructor(private modalService: NgbModal, private healthService: SimHealthService, private routesService: SimRoutesService) {}

    ngOnInit() {
        this.subscription = this.routesService.routeChanged$.subscribe((route) => {
            this.activeRoute = route;
            this.displayActiveRouteHealth();
        });
    }

    displayActiveRouteHealth() {
        this.updatingHealth = true;
        if (this.activeRoute && this.activeRoute.status !== 'DOWN') {
            this.healthService.checkInstanceHealth(this.activeRoute).subscribe(
                (health) => {
                    this.healthData = this.healthService.transformHealthData(health);
                    this.updatingHealth = false;
                },
                (error) => {
                    if (error.status === 503 || error.status === 500 || error.status === 404) {
                        this.healthData = this.healthService.transformHealthData(error.json());
                        this.updatingHealth = false;
                        if (error.status === 500 || error.status === 404) {
                            this.routesService.routeDown(this.activeRoute);
                        }
                    }
                }
            );
        } else {
            this.routesService.routeDown(this.activeRoute);
        }
    }

    // user click
    showHealth(health: any) {
        const modalRef = this.modalService.open(SimHealthModalComponent);
        modalRef.componentInstance.currentHealth = health;
        modalRef.result.then(
            (result) => {
                // Left blank intentionally, nothing to do here
            },
            (reason) => {
                // Left blank intentionally, nothing to do here
            }
        );
    }

    baseName(name: string) {
        return this.healthService.getBaseName(name);
    }

    // user click
    getBadgeClass(statusState) {
        if (!statusState || statusState !== 'UP') {
            return 'badge-danger';
        } else {
            return 'badge-success';
        }
    }

    subSystemName(name: string) {
        return this.healthService.getSubSystemName(name);
    }

    ngOnDestroy() {
        // prevent memory leak when component destroyed
        this.subscription.unsubscribe();
    }
}
