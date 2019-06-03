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

  static init() {
    /*state initialization from localstorage*/
    const stateStr: any = localStorage.getItem('NG_BUBBLE_STATE');
    let state;
    if (stateStr) {
      try {
        state = this.state = stateStr && JSON.parse(stateStr);
        this.selectedElXpath = state && state.selectedElXpath;
        this.hoveredElXpath = state && state.hoveredElXpath;
      } catch (e) {
        state = this.state = {};
      }
    }

    if (!state || !state.selectedElXpath) {/*if no state is saved in local storage, open root components*/
      this.rootInitialization();
    } else {
      this.stateInitialization();
    }
  }

  static rootInitialization() {
    this.$selectedComponent = <HTMLElement>Helper.getRootEl(NgBubbleConstant.possibleRootTags);
    if (this.$selectedComponent) {
      this.$hoveredComponent = this.$selectedComponent;
      const componentData = Helper.getComponentDataInstanceFromNode(this.$selectedComponent);
      this.selectedComponent = componentData ? componentData.componentInstance : null;
    }
    // selectedElXpath = $selectedComponent && getXPathByElement($selectedComponent);
  }

  static stateInitialization() {
    const selectedElXpath = this.state.selectedElXpath;
    // let hoveredElXpath = state.hoveredElXpath;//
    // selectedElXpath = $selectedComponent && getXPathByElement($selectedComponent);
    this.$selectedComponent = <HTMLElement>Helper.getElementByXpath(selectedElXpath);
    // this.selectedComponent = Helper.getComponentDataInstanceFromNode(this.$selectedComponent).componentInstance;
    const componentData = Helper.getComponentDataInstanceFromNode(this.$selectedComponent);
    this.selectedComponent = componentData ? componentData.componentInstance : null;
    // $hoveredComponent = <HTMLElement>getElementByXpath(hoveredElXpath);
    // hoveredComponent = Helper.getComponentDataInstanceFromNode($hoveredComponent).componentInstance;
  }
}
