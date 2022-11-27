import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditaPedidoComponent } from './edita-pedido.component';

describe('EditaPedidoComponent', () => {
  let component: EditaPedidoComponent;
  let fixture: ComponentFixture<EditaPedidoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditaPedidoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditaPedidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
