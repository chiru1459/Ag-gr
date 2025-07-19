import { Component } from '@angular/core';
import {
  ColDef,
  GridOptions,
  IServerSideDatasource,
  IServerSideGetRowsParams,
  IServerSideGetRowsRequest,
  FilterModel,
  GridApi,
} from 'ag-grid-community';
import { HttpParams } from '@angular/common/http';
import { GridService, User } from './grid.service';
import { ImageCellRendererComponent } from './imageCellRender.component';

@Component({
  selector: 'app-server-side-grid',
  templateUrl: './serverSideGrid.component.html',
  styleUrls: ['./serverSideGrid.component.css'],
})
export class ServerSideGrid {
  gridApi!: GridApi;
  isDrakMode = true;
  columnDefs: ColDef[] = [
    { field: 'id', headerName: 'ID' },
    {
      field: 'firstName',
      headerName: 'First Name',
      editable: true,
      filter: 'agTextColumnFilter',
    },
    {
      field: 'lastName',
      headerName: 'Last Name',
      editable: true,
      filter: 'agTextColumnFilter',
    },
    {
      field: 'email',
      headerName: 'Email',
      editable: true,
    },
    {
      field: 'phone',
      headerName: 'Phone',
      editable: true,
    },
    {
      field: 'image',
      headerName: 'Image',
      editable: true,
      cellRenderer: ImageCellRendererComponent,
      // cellRenderer: (param: any) => {
      //   const value = param.value;
      //   return `<img src= ${value} style="width: 40px; height: 40px; border-radius: 4px;"/>`;
      // },
    },
  ];

  // columnDefs: ColDef[] = [
  //   { field: 'id', headerName: 'ID', filter: 'agNumberColumnFilter' },
  //   {
  //     field: 'name',
  //     headerName: 'Name',
  //     filter: 'agTextColumnFilter',
  //     editable: true,
  //   },
  //   {
  //     field: 'email',
  //     headerName: 'Email',
  //     filter: 'agTextColumnFilter',
  //     editable: true,
  //   },
  //   {
  //     field: 'phone',
  //     headerName: 'Phone',
  //     filter: 'agTextColumnFilter',
  //     editable: true,
  //   },
  // ];
  gridOptions: GridOptions = {
    rowModelType: 'serverSide',
    pagination: true,
    paginationPageSize: 10,
    paginationPageSizeSelector: [10, 20, 50, 100],
    cacheBlockSize: 10,
    maxBlocksInCache: 2,
    getRowId: (params) => params.data.id.toString(),
    defaultColDef: {
      flex: 1,
      resizable: true,
      sortable: true,
      filter: true,
      editable: true,
    },
    onCellValueChanged: this.onCellValueChanged.bind(this),
    theme: 'legacy',
  };
  constructor(private gridService: GridService) {}

  onGridReady(params: any) {
    params.api.sizeColumnsToFit();

    this.gridApi = params.api;
    const datasource = this.getData();
    this.gridApi.setGridOption('serverSideDatasource', datasource);
    // params.api.setServerSideDatasource(datasource);
  }

  // getData(): IServerSideDatasource {
  //   return {
  //     getRows: (params: IServerSideGetRowsParams) => {
  //       const request: IServerSideGetRowsRequest = params.request;
  //       const startRow = request.startRow ?? 0;
  //       const endRow =
  //         request.endRow ?? startRow + (this.gridOptions.cacheBlockSize ?? 10);
  //       const limit = endRow - startRow;

  //       let queryParams = new HttpParams()
  //         .set('_start', startRow.toString())
  //         .set('_limit', limit.toString());

  //       // Sorting
  //       if (request.sortModel?.length) {
  //         const sort = request.sortModel[0];
  //         queryParams = queryParams
  //           .set('_sort', sort.colId!)
  //           .set('_order', sort.sort!);
  //       }

  //       // Filtering
  //       if (request.filterModel && 'name' in request.filterModel) {
  //         const nameFilter = request.filterModel['name'];
  //         if (nameFilter && 'filter' in nameFilter) {
  //           queryParams = queryParams.set('name_like', nameFilter.filter);
  //         }
  //       }

  //       this.gridService.getUsers(queryParams).subscribe({
  //         next: (data: User[]) => {
  //           const totalRows = 100; // fallback or you can calculate another way
  //           params.success({ rowData: data, rowCount: totalRows });
  //         },
  //         error: () => params.fail(),
  //       });
  //     },
  //   };
  // }

  getData(): IServerSideDatasource {
    return {
      getRows: (params: IServerSideGetRowsParams) => {
        const request = params.request;
        const startRow = request.startRow ?? 0;
        const endRow = request.endRow ?? 10;
        const limit = endRow - startRow;
        const skip = startRow;

        const httpParams = new HttpParams()
          .set('limit', limit.toString())
          .set('skip', skip.toString());

        this.gridService.getUsers(httpParams).subscribe({
          next: (res: any) => {
            const users = res.users;
            const total = res.total;

            if (Array.isArray(users)) {
              params.success({ rowData: users, rowCount: total });
            }
          },
          error: (err) => {
            console.error('Failed to fetch data:', err);
            params.fail();
          },
        });
      },
    };
  }

  onCellValueChanged(event: any) {
    const updated: User = event.data;
    this.gridService.updateUser(updated).subscribe({
      next: () => {
        const rowNode = event.api.getRowNode(updated.id.toString());
        if (rowNode) {
          rowNode.setData(updated);
        }
      },
      error: () => {
        alert('Update failed. Reverting.');
        event.node.setDataValue(event.column.getColId(), event.oldValue);
      },
    });
  }
}
