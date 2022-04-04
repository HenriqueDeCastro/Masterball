import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-search-field',
  templateUrl: './search-field.component.html',
  styleUrls: ['./search-field.component.scss']
})
export class SearchFieldComponent implements OnInit {

  searchForm!: FormGroup;
  @Input() placeholder!: string;
  @Output() search!: EventEmitter<string>;

  constructor(private fb: FormBuilder) {
    this.search = new EventEmitter();
  }

  ngOnInit(): void {
    this.searchForm = this.fb.group({
      search: ['', Validators.required]
    })

    this.searchForm.get('search')?.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged())
      .subscribe((value: string) => this.search.emit(value.toLowerCase()));
  }

}
