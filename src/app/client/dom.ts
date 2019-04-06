import {Helper} from './helper';
import {NgBubbleConstant} from './constant';

export class NgBubbleDom {
  /*
    * When the app starts for the first time, root component data will be shown
    * */
  static $selectedComponent: HTMLElement;
  static selectedElXpath: string | any;
  static hoveredElXpath: string | any;
  static selectedComponent: Object;
  static hoveredComponent: Object;
  static $hoveredComponent: HTMLElement;
  private static state;

  static init(){
    /*state initialization from localstorage*/
    let stateStr: any = localStorage.getItem('NG_BUBBLE_STATE');
    let state = this.state = stateStr && JSON.parse(stateStr);
    this.selectedElXpath = state && state.selectedElXpath;
    this.hoveredElXpath = state && state.hoveredElXpath;
    console.log(state.selectedElXpath);
    if (!state || !state.selectedElXpath) {/*if no state is saved in local storage, open root components*/
      this.rootInitialization();
    } else {
      this.stateInitialization();
    }
  }

  static rootInitialization() {
    this.$selectedComponent = <HTMLElement>Helper.getRootEl(NgBubbleConstant.possibleRootTags);
    this.$hoveredComponent = this.$selectedComponent;
    this.selectedComponent = Helper.getComponentDataInstanceFromNode(this.$selectedComponent).componentInstance;
    // selectedElXpath = $selectedComponent && getXPathByElement($selectedComponent);
  }

  static stateInitialization() {
    let selectedElXpath = this.state.selectedElXpath;
    // let hoveredElXpath = state.hoveredElXpath;//
    // selectedElXpath = $selectedComponent && getXPathByElement($selectedComponent);
    this.$selectedComponent = <HTMLElement>Helper.getElementByXpath(selectedElXpath);
    // $hoveredComponent = <HTMLElement>getElementByXpath(hoveredElXpath);
    this.selectedComponent = Helper.getComponentDataInstanceFromNode(this.$selectedComponent).componentInstance;
    // hoveredComponent = Helper.getComponentDataInstanceFromNode($hoveredComponent).componentInstance;
  }
}