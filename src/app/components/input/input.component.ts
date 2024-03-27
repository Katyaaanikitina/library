import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Subject, Subscription, debounceTime } from 'rxjs';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.sass']
})
export class InputComponent implements OnInit {
  @Output() onInput = new EventEmitter<string>();
  searchValue: string = '';
  valueChanged: Subject<string> = new Subject<string>();
  subscribtion!: Subscription;

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterContentInit() {
    this.subscribtion = this.valueChanged
      .pipe(debounceTime(1000))
      .subscribe(value => {
        this.onInput.emit(value)
      });
  }

  onChangeInput(searchValue: string) {
    this.valueChanged.next(searchValue);
  }

  onDestroy() {
    this.subscribtion.unsubscribe();
  }
}
