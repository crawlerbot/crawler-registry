import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSimlifeModule } from 'ng-simlife';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

@NgModule({
    imports: [NgbModule.forRoot(), NgSimlifeModule.forRoot({}), InfiniteScrollModule],
    exports: [FormsModule, HttpClientModule, CommonModule, NgbModule, NgSimlifeModule, InfiniteScrollModule]
})
export class SimlifeRegistrySharedLibsModule {}
