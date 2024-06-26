import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { ProductAddComponent } from './pages/product-add/product-add.component';
import { ProductEditComponent } from './pages/product-edit/product-edit.component';
import { ProductListComponent } from './pages/product-list/product-list.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { CurrencyPipe } from '@angular/common'; // Import CurrencyPipe
import {ReactiveFormsModule  } from '@angular/forms';
import {NgForm} from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    ProductAddComponent,
    ProductEditComponent,
    ProductListComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    NgForm,
    CurrencyPipe
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }