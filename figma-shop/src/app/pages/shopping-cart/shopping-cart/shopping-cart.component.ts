import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { countryList } from './countries-list';
import { Observable } from 'rxjs';
import { distinctUntilChanged, map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {
  public personForm: FormGroup;
  public countries = countryList;
  public filteredCountries: Observable<string[]>;
  public countriesFormControl = new FormControl();
  constructor() { }

  ngOnInit(): void {
    this.createFormGroup();
    this.onFormChange();
  }

  private createFormGroup(): void {
    this.personForm = new FormGroup({
      firstName: new FormControl(),
      lastName: new FormControl(),
      email: new FormControl(),
      phone: new FormControl(),
      address: new FormControl(),
      country: new FormControl(),
      city: this.countriesFormControl,
      postal: new FormControl(),
    });
  }

  private onFormChange(): void {
    this.filteredCountries = this.countriesFormControl.valueChanges.pipe(
      startWith(''),
      map(value => this.filterCountries(value))
    );
    this.personForm.valueChanges.pipe(distinctUntilChanged()).subscribe(data => {
      console.log(data);
    });
  }

  private filterCountries(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.countries.filter(country => country.toLowerCase().includes(filterValue));
  }

}
