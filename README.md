# ng-bubble
ng-bubble is a WebComponent that lives in your angular project (via index.html) and help you with debugging.

![NG-BUBBLE PREVIEW GIF](public/assets/imgs/ngbubbleIntroductionvideo.gif)


## Motivation ([Medium link](https://medium.com/@sandeepkgupta007/introducing-ng-bubble-your-angular-companion-f25dda56492))
Motivations behind ng-bubble are two-fold:
  - **"Automating" trivial tasks** : When my junior joined our frontend team, he struggled to find right component code in IDE (among 1000+ files) for a section of website. I realized that there should be a better way to navigate from website to component code in IDE.
  - **Making ng-bubble single point of reference for debugging**: We love debugging with ```console.log```, `debugger` and `network tab` as well. But these tools are slow and have very strict behaviour. *What if you need to replay same ajax request with different params? How do you hook into change Angular change detection? How do you see state of a component?*

## Usage
1. Install with npm: `npm install -g ng-bubble`
2. Open your angular project in *VScode* or *Webstorm*.
3. Run this command at the root of your project: `ng-bubble`
4. Above command will give you a script, copy and paste that **right after** `<body>` your **index.html**
   ```
   <body>
       <js-bubble></js-bubble>
       <script src="http://localhost:11637/assets/js/js-bubble.js"></script>
   ...
   </body>
    ```
5. Run your angular project in another terminal (ex: ng serve)
6. After ng-bubble is started, you can use following hot keys:
    1. To get menu: ```shift + hover``` on a component
    2. To open component in IDE: ```Double click```
    
## Prerequisites
1. Please make sure you have respective cli tools install for your IDEs
   If you are using vscode: ```code --version``` should work.
   If you are using webstorm: ```webstorm <file path>``` should open that file path in webstorm.
2. Works on Angular cli  project. Angular 1 is not supported.


## Video introduction
  [Youtube link](https://www.youtube.com/watch?v=-HyZ1aOV46k)
  
  
## Features (Current and Upcoming):
  
	1. Navigating from component view (in website) to component code (in IDE) (Done in v0.1): [Hotkeys: double click on component] 
	2. Display component files (for code review etc.) (Done in v0.1): [Hotkeys: shift + mousehover on component]
	3. Display component state (Done in v0.1): [Hotkeys: shift + mousehover on component] 
	4. Search project file (Done in v0.1)
	
	Upcoming features:
	5. console layer (Planned for v0.2)
	6. Network layer (Planned for v0.2)
	7. Saving edits in component files (Planned for v0.3)
	8. Display component state (realtime) (Planned for v0.3)
	9. Component method hooks (Planned for v0.3)


