import { Component } from '@angular/core';
import { GridOptions } from 'ag-grid-community';
import { columnDefs } from './grid-columndef.config';
import { rowData } from './grid.mock-data';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  columnDefs = columnDefs;
  rowData = rowData;

  gridOptions: GridOptions = {
    rowClassRules: {
      'total-row': (params) => params.data?.name === 'Total',
    },
  };

  onCellValueChanged(params: any) {
    const data = params.data;

    // Helper: sum all month values in a row
    function sumRow(row: any) {
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

    // 1. Update edited row total
    data.total = sumRow(data);

    // 2. Update bottom summary total row
    const allRows = params.api
      .getModel()
      .rowsToDisplay.map((rowNode: any) => rowNode.data);
    const totalRow = allRows.find((r: any) => r.name === 'Total');

    if (totalRow) {
      // Reset all months to zero first
      [
        'jan',
        'feb',
        'mar',
        'apr',
        'may',
        'june',
        'july',
        'aug',
        'sep',
        'oct',
        'nov',
        'dec',
      ].forEach((month) => {
        if (month in totalRow.q1) totalRow.q1[month] = 0;
        if (month in totalRow.q2) totalRow.q2[month] = 0;
        if (month in totalRow.q3) totalRow.q3[month] = 0;
        if (month in totalRow.q4) totalRow.q4[month] = 0;
      });

      // Sum all rows except the total row
      allRows.forEach((r: any) => {
        if (r.name !== 'Total') {
          totalRow.q1.jan += r.q1?.jan || 0;
          totalRow.q1.feb += r.q1?.feb || 0;
          totalRow.q1.mar += r.q1?.mar || 0;
          totalRow.q2.apr += r.q2?.apr || 0;
          totalRow.q2.may += r.q2?.may || 0;
          totalRow.q2.june += r.q2?.june || 0;
          totalRow.q3.july += r.q3?.july || 0;
          totalRow.q3.aug += r.q3?.aug || 0;
          totalRow.q3.sep += r.q3?.sep || 0;
          totalRow.q4.oct += r.q4?.oct || 0;
          totalRow.q4.nov += r.q4?.nov || 0;
          totalRow.q4.dec += r.q4?.dec || 0;
        }
      });

      // Recalculate total for bottom row
      totalRow.total = sumRow(totalRow);

      // Refresh the entire grid (or you can refresh just the total row)
      params.api.refreshCells({ force: true });
    } else {
      // No total row, just refresh the edited row's total cell
      params.api.refreshCells({ rowNodes: [params.node], columns: ['total'] });
    }
  }
}
