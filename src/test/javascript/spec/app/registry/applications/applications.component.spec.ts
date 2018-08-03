import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { Observable } from 'rxjs';

import { SimlifeRegistryTestModule } from '../../../test.module';
import { SimApplicationsComponent, SimApplicationsService } from '../../../../../../main/webapp/app/registry';

describe('Component Tests', () => {
    describe('ApplicationsComponent', () => {
        let comp: SimApplicationsComponent;
        let fixture: ComponentFixture<SimApplicationsComponent>;

        beforeEach(
            async(() => {
                TestBed.configureTestingModule({
                    imports: [SimlifeRegistryTestModule],
                    declarations: [SimApplicationsComponent],
                    providers: [SimApplicationsService]
                })
                    .overrideTemplate(SimApplicationsComponent, '')
                    .compileComponents();
            })
        );

        beforeEach(() => {
            fixture = TestBed.createComponent(SimApplicationsComponent);
            comp = fixture.componentInstance;
        });

        it(
            'refresh data',
            fakeAsync(
                inject([SimApplicationsService], (service: SimApplicationsService) => {
                    const response = {
                        applications: [
                            {
                                name: 'app1',
                                instances: [
                                    {
                                        instanceId: 1,
                                        status: 'UP',
                                        homePageUrl: 'home'
                                    }
                                ]
                            },
                            {
                                name: 'app2',
                                instances: [
                                    {
                                        instanceId: 2,
                                        status: 'UP',
                                        homePageUrl: 'home'
                                    },
                                    {
                                        instanceId: 3,
                                        status: 'UP',
                                        homePageUrl: 'home'
                                    }
                                ]
                            }
                        ]
                    };
                    spyOn(service, 'findAll').and.returnValue(Observable.of(response));

                    comp.ngOnInit();
                    tick();

                    expect(service.findAll).toHaveBeenCalled();
                    expect(comp.data).toEqual(response);
                })
            )
        );
    });
});
