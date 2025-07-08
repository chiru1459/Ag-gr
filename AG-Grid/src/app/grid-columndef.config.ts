import { ColDef, ColGroupDef } from 'ag-grid-community';

export const cellColorClass = (params: any) => {
  if (params.data?.name === 'Total') return '';
  return 'cell-color';
};

export const columnDefs: (ColDef | ColGroupDef)[] = [
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
        headerClass: 'month',
        cellClass: cellColorClass,
      },
      {
        headerName: 'Feb',
        field: 'q1.feb',
        editable: true,
        headerClass: 'month',
        cellClass: cellColorClass,
      },
      {
        headerName: 'Mar',
        field: 'q1.mar',
        editable: true,
        headerClass: 'month',
        cellClass: cellColorClass,
      },
    ],
  },
  {
    headerName: 'Q2',
    headerClass: 'q1-group',
    children: [
      {
        headerName: 'Apr',
        field: 'q2.apr',
        editable: true,
        headerClass: 'month',
        cellClass: cellColorClass,
      },
      {
        headerName: 'May',
        field: 'q2.may',
        editable: true,
        headerClass: 'month',
        cellClass: cellColorClass,
      },
      {
        headerName: 'June',
        field: 'q2.june',
        editable: true,
        headerClass: 'month',
        cellClass: cellColorClass,
      },
    ],
  },
  {
    headerName: 'Q3',
    headerClass: 'q1-group',
    children: [
      {
        headerName: 'July',
        field: 'q3.july',
        editable: true,
        headerClass: 'month',
        cellClass: cellColorClass,
      },
      {
        headerName: 'Aug',
        field: 'q3.aug',
        editable: true,
        headerClass: 'month',
        cellClass: cellColorClass,
      },
      {
        headerName: 'Sep',
        field: 'q3.sep',
        editable: true,
        headerClass: 'month',
        cellClass: cellColorClass,
      },
    ],
  },
  {
    headerName: 'Q4',
    headerClass: 'q1-group',
    children: [
      {
        headerName: 'Oct',
        field: 'q4.oct',
        editable: true,
        headerClass: 'month',
        cellClass: cellColorClass,
      },
      {
        headerName: 'Nov',
        field: 'q4.nov',
        editable: true,
        headerClass: 'month',
        cellClass: cellColorClass,
      },
      {
        headerName: 'Dec',
        field: 'q4.dec',
        editable: true,
        headerClass: 'month',
        cellClass: cellColorClass,
      },
    ],
  },
  { headerName: 'Total', field: 'total' },
];
