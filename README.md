[![npm version](https://badge.fury.io/js/ng-bubble.svg)](https://badge.fury.io/js/ng-bubble)

# ng-bubble
ng-bubble is a WebComponent that lives in your angular project (via index.html) and help you with debugging.

[![npm version](https://badge.fury.io/js/ng-bubble.svg)](https://badge.fury.io/js/ng-bubble)


## Motivation ([Medium link](https://medium.com/@sandeepkgupta007/introducing-ng-bubble-your-angular-companion-f25dda56492))
Motivations behind ng-bubble are two-fold:
  - **"Automating" trivial tasks** : When my junior joined our frontend team, he struggled to find right component code in IDE (among 1000+ files) for a section of website. I realized that there should be a better way to navigate from website to component code in IDE.
  - **Making ng-bubble single point of reference for debugging**: We love debugging with ```console.log```, `debugger` and `network tab` as well. But these tools are slow and have very strict behaviour. *What if you need to replay same ajax request with different params? How do you hook into change Angular change detection? How do you see state of a component?*

## Install
1. Install with npm: `npm install -g ng-bubble`
2. Open your angular project in *VScode* or *Webstorm* or any other IDE
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
 
 
 ## Usage
* To get menu: ```shift + hover``` on a component
* To open component in IDE: ```Double click```
* To reset configurations: ```ng-bubble --ask```
    
## Prerequisites
1. Please make sure you have respective cli tools install for your IDEs. For example:

   If you are using VS CODE: ```code <file path>``` should open that file path in VS CODE.
   
   If you are using Webstorm: ```webstorm <file path>``` should open that file path in Webstorm.
   
   If you are using any other IDE, enter your IDE's CLI/exe name when prompted.
2. Works on Angular cli project. Angular 1 is not supported.


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


