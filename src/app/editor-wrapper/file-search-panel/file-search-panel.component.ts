import {ChangeDetectorRef, Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {UtilityService} from '../../utility.service';
import {FormGroup} from '@angular/forms';
import {EventService} from '../../event.service';
import {Subscription} from 'rxjs';

export interface IFileData {
  'name': string;
  'type': string;
  'path': string;
  'size': number;
}

@Component({
  selector: 'jsb-file-search-panel',
  templateUrl: './file-search-panel.component.html',
  styleUrls: ['./file-search-panel.component.scss']
})
export class FileSearchPanelComponent implements OnInit, OnDestroy {

  @Output() searchEvent$ = new EventEmitter<string>();
  @Output() showSearchPanel$ = new EventEmitter<boolean>();
  @Output() getFileTrigger$ = new EventEmitter<IFileData>();
  @Output() openInIde$ = new EventEmitter<IFileData>();
  files: IFileData[];
  searchForm: FormGroup;
  selectedRow = 0;
  searchResultsFinishSub: Subscription;
  BACKEND_IMG_ROOT = 'http://localhost:11637/assets/imgs/';
  constructor(private utilityService: UtilityService, private changeDetectorRef: ChangeDetectorRef) {}


  ngOnInit() {
    this.searchForm = this.utilityService.getSearchForm();
    this.searchForm.valueChanges.subscribe((formData) => {
      this.searchEvent$.emit(formData.keyword);
    });
    this.searchResultsFinishSub = EventService.searchResultsFinish$.subscribe((files: IFileData[]) => {
      this.files = files;
      this.changeDetectorRef.detectChanges();
    });
  }

  changeSelectedRow(event: KeyboardEvent) {
    if (event.key === 'ArrowDown') {
      if (this.selectedRow < Math.min(this.files.length, 10)) {
        ++this.selectedRow;
      } else {
        this.selectedRow = 0;
      }
    }
    if (event.key === 'ArrowUp') {
      if (this.selectedRow > 0) {
        --this.selectedRow;
      } else {
        this.selectedRow = Math.min(this.files.length, 10) - 1;
      }
    }
    if (event.key === 'Enter') {
      this.getFileTrigger$.emit(this.files[this.selectedRow]);
      this.showSearchPanel$.emit(false);
    }
    this.changeDetectorRef.detectChanges();
  }

  inputClickHandler() {

  }

  openInIde(file: IFileData) {
    this.openInIde$.emit(file);
  }

  ngOnDestroy(): void {
    try {
      this.searchResultsFinishSub.unsubscribe();
    } catch (e) {

    }
  }



}
