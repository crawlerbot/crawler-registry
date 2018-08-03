import { Component, OnDestroy, OnInit } from '@angular/core';
import { SimReplicasService } from './replicas.service';
import { SimRefreshService } from 'app/shared/refresh/refresh.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
    selector: 'sim-replicas',
    templateUrl: './replicas.component.html',
    styleUrls: ['replicas.component.scss']
})
export class SimReplicasComponent implements OnInit, OnDestroy {
    showMore: boolean;
    replicas: any;

    refreshReloadSubscription: Subscription;

    constructor(private replicasService: SimReplicasService, private refreshService: SimRefreshService) {
        this.showMore = true;
    }

    ngOnInit() {
        this.refreshReloadSubscription = this.refreshService.refreshReload$.subscribe((empty) => this.refresh());
        this.refresh();
    }

    ngOnDestroy() {
        this.refreshReloadSubscription.unsubscribe();
    }

    refresh() {
        this.replicasService.findAll().subscribe((replicas) => {
            this.replicas = replicas;
        });
    }
}
