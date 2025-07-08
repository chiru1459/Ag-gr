import { Component } from '@angular/core';
import { GridOptions } from 'ag-grid-community';
import { columnDefs } from './grid-columndef.config';
import { rowData as initialRowData } from './grid.mock-data';

@Component({
  selector: 'app-root',
  standalone: false,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  columnDefs = columnDefs;
  rowData = [...initialRowData]; // Clone to ensure immutability

  gridOptions: GridOptions<any> = {
    // deltaRowDataMode: true,
    // getRowNodeId: (data: any) => data.name, // Use unique name as row ID
    rowClassRules: {
      'total-row': (params) => params.data?.name === 'Total',
    },
  };

  // Sum all month values for a row
  private sumRow(row: any): number {
    const months = [
      row.q1?.jan,
      row.q1?.feb,
      row.q1?.mar,
      row.q2?.apr,
      row.q2?.may,
      row.q2?.june,
      row.q3?.july,
      row.q3?.aug,
      row.q3?.sep,
      row.q4?.oct,
      row.q4?.nov,
      row.q4?.dec,
    ];
    return months.reduce((acc, val) => acc + (val || 0), 0);
  }

  // Add month values from one row into another
  private addToTotalRow(totalRow: any, row: any) {
    totalRow.q1.jan += row.q1?.jan || 0;
    totalRow.q1.feb += row.q1?.feb || 0;
    totalRow.q1.mar += row.q1?.mar || 0;
    totalRow.q2.apr += row.q2?.apr || 0;
    totalRow.q2.may += row.q2?.may || 0;
    totalRow.q2.june += row.q2?.june || 0;
    totalRow.q3.july += row.q3?.july || 0;
    totalRow.q3.aug += row.q3?.aug || 0;
    totalRow.q3.sep += row.q3?.sep || 0;
    totalRow.q4.oct += row.q4?.oct || 0;
    totalRow.q4.nov += row.q4?.nov || 0;
    totalRow.q4.dec += row.q4?.dec || 0;
  }

  // Build a fresh total row from all data
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

    //Update the edited rows total
    const updatedEditedRow = { ...edited, total: this.sumRow(edited) };

    //Build updated rowData array immutably
    const updatedRowData = this.rowData.map((row) =>
      row.name === updatedEditedRow.name ? updatedEditedRow : row
    );

    //Replace or add Total row
    const filteredRows = updatedRowData.filter((r) => r.name !== 'Total');
    const newTotalRow = this.buildTotalRow(filteredRows);

    this.rowData = [...filteredRows, newTotalRow];
  }
}
