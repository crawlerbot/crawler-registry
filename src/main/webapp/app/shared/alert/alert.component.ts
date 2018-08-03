import { Component, OnDestroy, OnInit } from '@angular/core';
import { SimAlertService } from 'ng-simlife';

@Component({
    selector: 'sim-alert',
    template: `
        <div class="alerts" role="alert">
            <div *ngFor="let alert of alerts" [ngClass]="{\'alert.position\': true, \'toast\': alert.toast}">
                <ngb-alert [type]="alert.type" (close)="alert.close(alerts)"><pre [innerHTML]="alert.msg"></pre></ngb-alert>
            </div>
        </div>`
})
export class SimAlertComponent implements OnInit, OnDestroy {
    alerts: any[];

    constructor(private alertService: SimAlertService) {}

    ngOnInit() {
        this.alerts = this.alertService.get();
    }

    ngOnDestroy() {
        this.alerts = [];
    }
}
