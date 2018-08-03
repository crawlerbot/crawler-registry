import { Component, OnInit } from '@angular/core';
import { SimSSHService } from './ssh.service';

@Component({
    selector: 'sim-applications',
    templateUrl: './ssh.component.html'
})
export class SimSSHComponent implements OnInit {
    data: any;
    showMore: boolean;

    constructor(private sshService: SimSSHService) {
        this.showMore = true;
    }

    ngOnInit() {
        this.sshService.getSshPublicKey().subscribe((response) => {
            this.data = response;
        });
    }
}
