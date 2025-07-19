import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  GridOptions,
  GridApi,
  GridReadyEvent,
  ColDef,
} from 'ag-grid-community';
import { columnDefs } from '../gridConfig/grid-columndef.config';
import { rowData as initialRowData } from '../gridConfig/grid.mock-data';
import { debounceTime, distinctUntilChanged, Subject, takeUntil } from 'rxjs';
type QuarterKey = 'q1' | 'q2' | 'q3' | 'q4';

@Component({
  selector: 'app-ag-grid',
  templateUrl: './ag-grid.component.html',
  styleUrl: './ag-grid.component.css',
})
export class AgGridComponent implements OnInit, OnDestroy {
  isDrakMode = false;
  searchText = '';
  gridApi!: GridApi;
  searchChange = new Subject<any>();
  destroy = new Subject<void>();
  // rowSelectionOptions = { type: 'multiple' } as any;
  columnDefs = columnDefs;
  rowData = [...initialRowData];

  autoGroupColumnDef: ColDef = {
    minWidth: 130,
    headerName: 'Year',
    rowDrag: true,
  };
  groupDefaultExpanded = 1;

  gridOptions: GridOptions<any> = {
    rowClassRules: {
      'total-row': (params) => params.data?.name === 'Total',
    },
    theme: 'legacy',
    // deltaRowDataMode: true,
    // getRowNodeId: (data: any) => data.name,
    getRowId: (params) => params.data.name,
    // pagination: true,
    // paginationPageSize: 5,
  };

  constructor() {}

  ngOnInit(): void {
    this.searchChange
      .pipe(debounceTime(300), distinctUntilChanged(), takeUntil(this.destroy))
      .subscribe((value) => {
        if (this.gridApi) {
          (this.gridApi as any).setQuickFilter(value);
        }
      });
  }

  onGridReady(params: any) {
    params.api.sizeColumnsToFit();
    this.gridApi = params.api;
  }

  private months: Record<QuarterKey, string[]> = {
    q1: ['jan', 'feb', 'mar'],
    q2: ['apr', 'may', 'june'],
    q3: ['july', 'aug', 'sep'],
    q4: ['oct', 'nov', 'dec'],
  };

  private quarterKeys: QuarterKey[] = ['q1', 'q2', 'q3', 'q4'];

  private sumRow(row: any): number {
    let sum = 0;
    this.quarterKeys.forEach((quarter) => {
      this.months[quarter].forEach((month) => {
        sum += row[quarter]?.[month] || 0;
      });
    });
    return sum;
  }

  private addToTotalRow(totalRow: any, row: any) {
    this.quarterKeys.forEach((quarter) => {
      this.months[quarter].forEach((month) => {
        totalRow[quarter][month] =
          (totalRow[quarter][month] || 0) + (row[quarter]?.[month] || 0);
      });
    });
  }

  private buildTotalRow(data: any[]): any {
    const totalRow = {
      name: 'Total',
      q1: { jan: 0, feb: 0, mar: 0 },
      q2: { apr: 0, may: 0, june: 0 },
      q3: { july: 0, aug: 0, sep: 0 },
      q4: { oct: 0, nov: 0, dec: 0 },
      total: 0,
    };

    data.forEach((r) => {
      if (r.name !== 'Total') this.addToTotalRow(totalRow, r);
    });

    totalRow.total = this.sumRow(totalRow);
    return totalRow;
  }

  onCellValueChanged(params: any) {
    const edited = params.data;
    const updatedEditedRow = { ...edited, total: this.sumRow(edited) };

    const updatedRowData = this.rowData.map((row) =>
      row.name === updatedEditedRow.name ? updatedEditedRow : row
    );

    const filteredRows = updatedRowData.filter((r) => r.name !== 'Total');
    const newTotalRow = this.buildTotalRow(filteredRows);

    this.rowData = [...filteredRows, newTotalRow];
    this.gridApi.setGridOption('rowData', this.rowData);
  }

  onSearchChange(text: any) {
    this.searchChange.next(text);
  }

  exportToExcel() {
    this.gridApi.exportDataAsExcel();
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }

  changeHeaderName() {
    const updatedColumnDefs = this.gridOptions.columnDefs?.map((col: any) => {
      if (col.field === 'manger') {
        return { ...col, headerName: 'Supervisor' };
      }
      return col;
    });
    this.gridApi.setGridOption('columnDefs', updatedColumnDefs);
  }

  onRowDragMove(event: any) {
    console.log(event);
  }
}
