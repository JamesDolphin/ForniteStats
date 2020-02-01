/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from "@angular/core/testing";
import { PlayerDataService } from "./playerdata.service";

describe("Service: Playerdata", () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PlayerDataService]
    });
  });

  it("should ...", inject([PlayerDataService], (service: PlayerDataService) => {
    expect(service).toBeTruthy();
  }));
});
