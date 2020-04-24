import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogModalExampleComponent } from './dialog-modal-example.component';

describe('DialogModalExampleComponent', () => {
  let component: DialogModalExampleComponent;
  let fixture: ComponentFixture<DialogModalExampleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogModalExampleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogModalExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
