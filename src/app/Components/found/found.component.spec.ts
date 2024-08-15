/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FoundComponent } from './found.component';

describe('FoundComponent', () => {
  let component: FoundComponent;
  let fixture: ComponentFixture<FoundComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FoundComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
