import { ColDef, ColGroupDef } from 'ag-grid-community';

export const cellColorRed = (params: any) => {
  if (params.data?.name === 'Total') return '';
  if (params.value === 100) return 'cell-red';
  if (params.value != 100) {
    if (['Jan', 'Feb', 'Mar'].includes(params.colDef.headerName)) {
      return 'cell-color-q1';
    }
    if (['Apr', 'May', 'June'].includes(params.colDef.headerName)) {
      return 'cell-color-q2';
    }
    if (['July', 'Aug', 'Sep'].includes(params.colDef.headerName)) {
      return 'cell-color-q3';
    }
    if (['Oct', 'Nov', 'Dec'].includes(params.colDef.headerName)) {
      return 'cell-color-q4';
    }
  }

  return '';
};

export const cellColorClass = (params: any) => {
  if (params.data?.name === 'Total') return '';
  return 'cell-color';
};

export const columnDefs: (ColDef | ColGroupDef)[] = [
  {
    headerName: 'Year',
    field: 'year',
    rowGroup: true,
    hide: true,
    rowDrag: true,
  },
  { headerName: 'Name', field: 'name' },
  { headerName: 'Manager', field: 'manger' },
  {
    headerName: 'Q1',
    headerClass: 'q1-group',
    children: [
      {
        headerName: 'Jan',
        field: 'q1.jan',
        editable: true,
        headerClass: 'monthA',
        cellClass: cellColorRed,
      },
      {
        headerName: 'Feb',
        field: 'q1.feb',
        editable: true,
        headerClass: 'monthA',
        cellClass: cellColorRed,
      },
      {
        headerName: 'Mar',
        field: 'q1.mar',
        editable: true,
        headerClass: 'monthA',
        cellClass: cellColorRed,
      },
    ],
  },
  {
    headerName: 'Q2',
    headerClass: 'q2-group',
    children: [
      {
        headerName: 'Apr',
        field: 'q2.apr',
        editable: true,
        headerClass: 'monthB',
        cellClass: cellColorRed,
        // cellClassRules: {
        //   'highlight-cell': (params) => params.value > 50,
        // },
        // cellStyle: (params) => {
        //   return params.value < 0 ? { color: 'red' } : {};
        // },
      },
      {
        headerName: 'May',
        field: 'q2.may',
        editable: true,
        headerClass: 'monthB',
        cellClass: cellColorRed,
      },
      {
        headerName: 'June',
        field: 'q2.june',
        editable: true,
        headerClass: 'monthB',
        cellClass: cellColorRed,
      },
    ],
  },
  {
    headerName: 'Q3',
    headerClass: 'q3-group',
    children: [
      {
        headerName: 'July',
        field: 'q3.july',
        editable: true,
        headerClass: 'monthC',
        cellClass: cellColorRed,
      },
      {
        headerName: 'Aug',
        field: 'q3.aug',
        editable: true,
        headerClass: 'monthC',
        cellClass: cellColorRed,
      },
      {
        headerName: 'Sep',
        field: 'q3.sep',
        editable: true,
        headerClass: 'monthC',
        cellClass: cellColorRed,
      },
    ],
  },
  {
    headerName: 'Q4',
    headerClass: 'q4-group',
    children: [
      {
        headerName: 'Oct',
        field: 'q4.oct',
        editable: true,
        headerClass: 'monthD',
        cellClass: cellColorRed,
      },
      {
        headerName: 'Nov',
        field: 'q4.nov',
        editable: true,
        headerClass: 'monthD',
        cellClass: cellColorRed,
      },
      {
        headerName: 'Dec',
        field: 'q4.dec',
        editable: true,
        headerClass: 'monthD',
        cellClass: cellColorRed,
      },
    ],
  },
  { headerName: 'Total', field: 'total' },
];
