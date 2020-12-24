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
  public countries: string[] = countryList;
  public filteredCountries: Observable<string[]>;
  public countriesFormControl = new FormControl();
  constructor() { }

  ngOnInit(): void {
    this.personForm = this.initPersonForm();
    this.filteredCountries = this.getFilteredCountries();
    this.onFormChange();
  }

  private initPersonForm(): FormGroup {
    return new FormGroup({
      firstName: new FormControl(),
      lastName: new FormControl(),
      email: new FormControl(),
      phone: new FormControl(),
      address: new FormControl(),
      country: this.countriesFormControl,
      city: new FormControl(),
      postal: new FormControl(),
    });
  }

  private onFormChange(): any {
    this.personForm.valueChanges.pipe(distinctUntilChanged()).subscribe(data => {
      console.log(data);
    });
  }

  private getFilteredCountries(): Observable<string[]> {
    return this.countriesFormControl.valueChanges.pipe(
      startWith(''),
      map((value: string) => this.filterCountries(value))
    );
  }

  private filterCountries(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.countries.filter((country: string) => country.toLowerCase().includes(filterValue));
  }

}
