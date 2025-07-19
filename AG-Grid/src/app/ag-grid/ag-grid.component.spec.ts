import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgGridComponent } from './ag-grid.component';

describe('AgGridComponent', () => {
  let component: AgGridComponent;
  let fixture: ComponentFixture<AgGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgGridComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AgGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call sizeColumnsToFit on gridReady', () => {
    const sizeColumnsToFitSpy = jasmine.createSpy('sizeColumnsToFit');
    const mockParams = { api: { sizeColumnsToFit: sizeColumnsToFitSpy } };

    component.onGridReady(mockParams as any);

    expect(sizeColumnsToFitSpy).toHaveBeenCalled();
  });

  it('should correctly calculate sumRow', () => {
    const testRow = {
      q1: { jan: 10, feb: 20, mar: 30 },
      q2: { apr: 5, may: 5, june: 5 },
      q3: { july: 0, aug: 0, sep: 0 },
      q4: { oct: 1, nov: 1, dec: 1 },
    };

    // @ts-ignore (testing private method)
    const sum = component['sumRow'](testRow);

    expect(sum).toBe(73);
  });

  it('should add values to total row correctly', () => {
    const totalRow = {
      q1: { jan: 0, feb: 0, mar: 0 },
      q2: { apr: 0, may: 0, june: 0 },
      q3: { july: 0, aug: 0, sep: 0 },
      q4: { oct: 0, nov: 0, dec: 0 },
    };

    const row = {
      q1: { jan: 1, feb: 2, mar: 3 },
      q2: { apr: 4, may: 5, june: 6 },
      q3: { july: 7, aug: 8, sep: 9 },
      q4: { oct: 10, nov: 11, dec: 12 },
    };

    // @ts-ignore (testing private method)
    component['addToTotalRow'](totalRow, row);

    expect(totalRow.q1.jan).toBe(1);
    expect(totalRow.q4.dec).toBe(12);
    expect(totalRow.q3.july).toBe(7);
  });

  it('should build total row correctly', () => {
    const data = [
      {
        name: 'Row 1',
        q1: { jan: 1, feb: 1, mar: 1 },
        q2: { apr: 1, may: 1, june: 1 },
        q3: { july: 1, aug: 1, sep: 1 },
        q4: { oct: 1, nov: 1, dec: 1 },
        total: 12,
      },
    ];

    const result = component['buildTotalRow'](data);

    expect(result.name).toBe('Total');
    expect(result.q1.jan).toBe(1);
    expect(result.total).toBe(12);
  });

  it('should update rowData and total row on cell value changed', () => {
    component.rowData = [
      {
        name: 'Row 1',
        manger: 'Mark',
        q1: { jan: 1, feb: 2, mar: 3 },
        q2: { apr: 4, may: 5, june: 6 },
        q3: { july: 7, aug: 8, sep: 9 },
        q4: { oct: 10, nov: 11, dec: 12 },
        total: 78,
        year: 0,
      },
      {
        name: 'Total',
        manger: 'Eric',
        q1: { jan: 1, feb: 2, mar: 3 },
        q2: { apr: 4, may: 5, june: 6 },
        q3: { july: 7, aug: 8, sep: 9 },
        q4: { oct: 10, nov: 11, dec: 12 },
        total: 78,
        year: 0,
      },
    ];

    const updatedRow = {
      name: 'Row 1',
      q1: { jan: 2, feb: 2, mar: 2 },
      q2: { apr: 2, may: 2, june: 2 },
      q3: { july: 2, aug: 2, sep: 2 },
      q4: { oct: 2, nov: 2, dec: 2 },
    };

    component.onCellValueChanged({ data: updatedRow });

    const updated = component.rowData.find((r) => r.name === 'Row 1');
    const totalRow = component.rowData.find((r) => r.name === 'Total');

    expect(updated?.total).toBe(24);
    expect(totalRow?.total).toBe(24);
  });
});
