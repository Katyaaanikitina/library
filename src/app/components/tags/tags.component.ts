import { ChangeDetectorRef, Component, ElementRef, EventEmitter, OnInit, Output, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { DataStorageService } from '../../shared/services/data-storage.service';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.sass']
})
export class TagsComponent implements OnInit {
  @Output() onChooseTag: EventEmitter<number[]> = new EventEmitter<number[]>();

  tags = this.dataStorageService.tags;
  isTagsInMultiRow!: boolean;
  isTagsClosed = true;
  
  tagsWidth = 0;
  tagsContainerWidth!: number;
  chosenTagsArray!: number[];

  @ViewChild('tagsContainerTpl')
  _tagsContainerTpl!: ElementRef<any>;

  @ViewChildren('tags')
  _tags!: QueryList<ElementRef>;
  
  constructor(
    public readonly dataStorageService: DataStorageService,
    private readonly _changeDetectorRef: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.getAllTagsWidth();
    this.tagsContainerWidth = this._tagsContainerTpl.nativeElement.offsetWidth;
    this.isTagsInMultiRow = this.tagsContainerWidth < (this.tagsWidth);
    this._changeDetectorRef.detectChanges();
  }
 
  getAllTagsWidth(): void {
    this._tags.forEach((tag) => this.tagsWidth += tag.nativeElement.offsetWidth)
  }

  chooseOrUnchooseTag(event: any) {
    const clickedTagId = +event.target.id;
    this.changeActiveValues(clickedTagId);
    this.pushChosenTagsNameInArray();
    this.onChooseTag.emit(this.chosenTagsArray)
  }
  
  changeActiveValues(id: number) {
    this.tags.map(tag => {
      if (tag.id === id) tag.active = !tag.active
    })
  }

  pushChosenTagsNameInArray() {
    this.chosenTagsArray = this.tags.reduce((acc, curr) => {
      if (curr.active) acc.push(curr.id);
      return acc;
    }, [] as number[] )
  }
}