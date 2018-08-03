import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { Observable } from 'rxjs';

import { SimlifeRegistryTestModule } from '../../../test.module';
import { SimHistoryComponent, SimHistoryService } from '../../../../../../main/webapp/app/registry';

describe('Component Tests', () => {
    describe('HistoryComponent', () => {
        let comp: SimHistoryComponent;
        let fixture: ComponentFixture<SimHistoryComponent>;

        beforeEach(
            async(() => {
                TestBed.configureTestingModule({
                    imports: [SimlifeRegistryTestModule],
                    declarations: [SimHistoryComponent],
                    providers: [SimHistoryService]
                })
                    .overrideTemplate(SimHistoryComponent, '')
                    .compileComponents();
            })
        );

        beforeEach(() => {
            fixture = TestBed.createComponent(SimHistoryComponent);
            comp = fixture.componentInstance;
            fixture.detectChanges();
        });

        it(
            'refresh data',
            fakeAsync(
                inject([SimHistoryService], (service: SimHistoryService) => {
                    const response = {
                        canceled: {
                            '11052017': 'instance1'
                        },
                        registered: {
                            '11022017': 'instance2'
                        }
                    };
                    spyOn(service, 'findAll').and.returnValue(Observable.of(response));

                    comp.refresh();
                    tick();

                    expect(service.findAll).toHaveBeenCalled();
                    expect(comp.data).toEqual(response);
                })
            )
        );

        it(
            'activate registered tab',
            fakeAsync(
                inject([SimHistoryService], (service: SimHistoryService) => {
                    const response = {
                        canceled: {
                            '11052017': 'instance1'
                        },
                        registered: {
                            '11022017': 'instance2'
                        }
                    };
                    spyOn(service, 'findAll').and.returnValue(Observable.of(response));

                    comp.ngOnInit();
                    tick();
                    comp.activate('registered');

                    expect(comp.items[0]).toEqual({ key: '11022017', value: 'instance2' });
                })
            )
        );
    });
});
