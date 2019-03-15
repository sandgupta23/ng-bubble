import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {UtilityService} from '../../utility.service';
import {FormGroup} from '@angular/forms';
import {EventService} from '../../event.service';

export interface IFileData {
  'name': string,
  'type': string,
  'path': string,
  'size': number,
}

@Component({
  selector: 'app-file-search-panel',
  templateUrl: './file-search-panel.component.html',
  styleUrls: ['./file-search-panel.component.scss']
})
export class FileSearchPanelComponent implements OnInit {

  searchForm: FormGroup;
  @Output() searchEvent$ = new EventEmitter<string>();
  @Output() showSearchPanel$ = new EventEmitter<boolean>();
  // @Output() getFileEvent$ = new EventEmitter<boolean>();
  @Output() getFileTrigger$ = new EventEmitter<IFileData>();
  files: IFileData[];
  selectedRow = 0;

  constructor(private utilityService: UtilityService) {
  }

  ngOnInit() {
    this.searchForm = this.utilityService.getSearchForm();
    this.searchForm.valueChanges.subscribe((formData) => {

      this.searchEvent$.emit(formData.keyword);
    });
    EventService.searchResultsFinish$.subscribe((files: IFileData[]) => {
      //console.log(files);
      this.files = files;
    });
  }

  changeSelectedRow(event: KeyboardEvent) {
    if (event.key === 'ArrowDown') {
      if (this.selectedRow < this.files.length) {
        ++this.selectedRow;
      } else {
        this.selectedRow = 0;
      }
    }
    if (event.key === 'ArrowUp') {
      if (this.selectedRow > 0) {
        --this.selectedRow;
      } else {
        this.selectedRow = this.files.length-1;
      }
    }
    if (event.key === 'Enter') {
      this.getFileTrigger$.emit(this.files[this.selectedRow]);
      this.showSearchPanel$.emit(false);
    }
    //console.log(event);
  }

  inputClickHandler(){

  }


}
