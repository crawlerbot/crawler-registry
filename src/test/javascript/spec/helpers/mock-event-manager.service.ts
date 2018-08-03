import { SpyObject } from './spyobject';
import { SimEventManager } from 'ng-simlife';
import Spy = jasmine.Spy;

export class MockEventManager extends SpyObject {
    broadcastSpy: Spy;

    constructor() {
        super(SimEventManager);
        this.broadcastSpy = this.spy('broadcast').andReturn(this);
    }
}
