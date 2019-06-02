/*TODO:
* 1. remove hoverd-parent class from component as a part of cleanup
* 2. use ng-probe to find parent component
* 3. use ng-probe to display component variables
* 4. use ng-probe to edit component variables
*
*
* 1. exclude dblclick from ng-bubble: this will automatically happen in shadow dom: DONE
* 2. cache images (for example at the time of file search
* 3. implement config.json (for options: IDE and framework)
* 5. compilation and zone.js
* 6. implement ctrl + click
* 7. implement refresh in side bar: not done for files
* 8. issues with clickoutside
* 9. make is editor search more flexible: done
* 10. up, down and enter in search panel: DONE
* 14. create ignore fields: DONE
*
* 4. code review and documentation
* 12. implement for react as well
* 13. Bug: Reloading on search
* 11. Sync two tabs
* 15. shouldFoldCode loading icon
* 16. row hover color should not be same as selected color
* 17. Upon reloading no data is fetched=> we need to wait for app to be initialized OR retry after 2 sec interval for 30 sec
* 18. IMPORTANT: REMOVE ZONE.JS: this maybe causing side effect of 17.
* 19. Put options icon in side base => 1. angular/react 2.whether to shouldFoldCode all components or just custom component
* 20. doubleclick is not working
* 21. HeaderComponent is matching analysis header component
* 22. find is not working
* 23. cant click on search
* 24. save keywork for search
* 25. make search more flexible
* 26. base href problem while running code in ngx-admin
*
*
* 1. Implement resizer
* 2. make font size 11px in both, make font family same as well
* 3. Make cursor on All normal
* 4. Implement save button
* 5. Implement loader
* 6. Make min width: 300px
* 7. make scrollbar size small
* 8. minimizing bug
*
*/


export enum EEditorInput {
  componentfiles = 'componentfiles',
  filecontent = 'filecontent',
  config = 'config',
  componentstr = 'componentstr',
  showTooltipAttr= 'showTooltipAttr',
  searchfiles = 'searchfiles',
  coords = 'coords',
  status = 'status',
  isLoading = 'isLoading',
};

/*TODO: this should not be needed*/
export interface IWSData {
  type: EWSTypes,
  error?: number,
  errorMessage?: string,
  payload?: ILineFinderData
}

//TODO: duplicate interfaces and enums

export interface INgProbeData {
  componentInstance: object,
  componentNode: HTMLElement,
  injector?: object
}

export enum EWSTypes {
  SEARCH = 'SEARCH',
  COMPONENT_FILE_SEARCH = 'COMPONENT_FILE_SEARCH',
  open = 'open',
  openByPath = 'openByPath',
  getFileByPath = 'getFileByPath',
  getConfig = 'getConfig',
  setFileByPath = 'setFileByPath',
  reIndex = 'reIndex',
  ack = 'ack',
  shutDown = 'shutDown',
}

export interface ILineFinderData {
  id?: string,
  tagName?: string,
  searchTerm?: string,
  targetTagName?: string,
  classList?: string[],
  innerText?: string,
  file?: string,
  pathToOpen?: string
  editor?: string,
  action?: string,
}
