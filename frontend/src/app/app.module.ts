import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
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
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { AuthGuard } from './guards/auth.guard';
import { RoleGuard } from './guards/role.guard';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    PosComponent,
    ProductListComponent,
    ProductFormComponent,
    CategoryListComponent,
    CategoryFormComponent,
    UnitListComponent,
    UnitFormComponent,
    SupplierListComponent,
    SupplierFormComponent,
    StockInListComponent,
    StockInFormComponent,
    StockOutListComponent,
    StockOutFormComponent,
    StockTakingListComponent,
    StockTakingFormComponent,
    SalesListComponent,
    ReportsComponent,
    UserListComponent,
    UserFormComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    AuthGuard,
    RoleGuard,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

