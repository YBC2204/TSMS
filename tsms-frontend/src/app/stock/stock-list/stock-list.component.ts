import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Stock } from '../../models/models';
import { StockService } from '../../services/stock.service';
import { StockFormComponent } from '../stock-form/stock-form.component';

@Component({
  selector: 'app-stock-list',
  templateUrl: './stock-list.component.html',
  styleUrls: ['./stock-list.component.scss']
})
export class StockListComponent implements OnInit {
  displayedColumns: string[] = [
    'id', 'stockItem', 'brand', 'siNumber', 'status', 'actions'
  ];
  dataSource = new MatTableDataSource<Stock>();
  searchText = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private stockService: StockService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadStock();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  loadStock(): void {
    this.stockService.getAll().subscribe({
      next: (data) => this.dataSource.data = data,
      error: () => this.snackBar.open('Error loading stock', 'Close', { duration: 3000 })
    });
  }

  applyFilter(): void {
    this.dataSource.filter = this.searchText.trim().toLowerCase();
  }

  openForm(stock?: Stock): void {
    const dialogRef = this.dialog.open(StockFormComponent, {
      width: '600px',
      data: stock || null
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) this.loadStock();
    });
  }

  deleteStock(id: number): void {
    if (confirm('Are you sure you want to delete this stock item?')) {
      this.stockService.delete(id).subscribe({
        next: () => {
          this.snackBar.open('Stock item deleted successfully', 'Close', { duration: 3000 });
          this.loadStock();
        },
        error: () => this.snackBar.open('Error deleting stock item', 'Close', { duration: 3000 })
      });
    }
  }
}
