import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZadatakListaComponent } from './zadatak-lista.component';

describe('ZadatakListaComponent', () => {
  let component: ZadatakListaComponent;
  let fixture: ComponentFixture<ZadatakListaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ZadatakListaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ZadatakListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
