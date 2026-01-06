import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PosComponent } from './components/pos/pos.component';
import { ProductListComponent } from './components/products/product-list/product-list.component';
import { ProductFormComponent } from './components/products/product-form/product-form.component';
import { CategoryListComponent } from './components/categories/category-list/category-list.component';
import { CategoryFormComponent } from './components/categories/category-form/category-form.component';
import { UnitListComponent } from './components/units/unit-list/unit-list.component';
import { UnitFormComponent } from './components/units/unit-form/unit-form.component';
import { SupplierListComponent } from './components/suppliers/supplier-list/supplier-list.component';
import { SupplierFormComponent } from './components/suppliers/supplier-form/supplier-form.component';
import { StockInListComponent } from './components/stock/stock-in-list/stock-in-list.component';
import { StockInFormComponent } from './components/stock/stock-in-form/stock-in-form.component';
import { StockOutListComponent } from './components/stock/stock-out-list/stock-out-list.component';
import { StockOutFormComponent } from './components/stock/stock-out-form/stock-out-form.component';
import { StockTakingListComponent } from './components/stock/stock-taking-list/stock-taking-list.component';
import { StockTakingFormComponent } from './components/stock/stock-taking-form/stock-taking-form.component';
import { SalesListComponent } from './components/sales/sales-list/sales-list.component';
import { ReportsComponent } from './components/reports/reports.component';
import { UserListComponent } from './components/users/user-list/user-list.component';
import { UserFormComponent } from './components/users/user-form/user-form.component';
import { AuthGuard } from './guards/auth.guard';
import { RoleGuard } from './guards/role.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: '',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'pos', pathMatch: 'full' },
      { path: 'pos', component: PosComponent },
      { path: 'products', component: ProductListComponent },
      { path: 'products/new', component: ProductFormComponent },
      { path: 'products/edit/:id', component: ProductFormComponent },
      { path: 'categories', component: CategoryListComponent },
      { path: 'categories/new', component: CategoryFormComponent },
      { path: 'categories/edit/:id', component: CategoryFormComponent },
      { path: 'units', component: UnitListComponent },
      { path: 'units/new', component: UnitFormComponent },
      { path: 'units/edit/:id', component: UnitFormComponent },
      { path: 'suppliers', component: SupplierListComponent },
      { path: 'suppliers/new', component: SupplierFormComponent },
      { path: 'suppliers/edit/:id', component: SupplierFormComponent },
      { path: 'stock-in', component: StockInListComponent },
      { path: 'stock-in/new', component: StockInFormComponent },
      { path: 'stock-out', component: StockOutListComponent },
      { path: 'stock-out/new', component: StockOutFormComponent },
      { path: 'stock-taking', component: StockTakingListComponent },
      { path: 'stock-taking/new', component: StockTakingFormComponent },
      { path: 'sales', component: SalesListComponent },
      { path: 'reports', component: ReportsComponent },
      {
        path: 'users',
        component: UserListComponent,
        canActivate: [RoleGuard],
        data: { roles: ['ADMIN'] },
      },
      {
        path: 'users/new',
        component: UserFormComponent,
        canActivate: [RoleGuard],
        data: { roles: ['ADMIN'] },
      },
      {
        path: 'users/edit/:id',
        component: UserFormComponent,
        canActivate: [RoleGuard],
        data: { roles: ['ADMIN'] },
      },
    ],
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

