# ng-bubble v0.1

[![N|Solid](https://github.com/goodmite/ng-bubble/blob/master/final_5cb1a092030dcd0014ea1259_949617.gif?raw=true)](https://github.com/goodmite/ng-bubble/blob/master/final_5cb1a092030dcd0014ea1259_949617.gif?raw=true)

##  What is this?
ng-bubble is a webcomponent that lives in your angular project (via index.html) and help you with debugging and stuff.

## Motivation
Motivations behind ng-bubble are two-fold:
  - **"Automating" trivial tasks** : When my junior joined our frontend team, he struggled to find right component code in IDE (among 1000+ files) for a section of website. I realized that there should be a better way to navigate from website to component code in IDE.
  - **Making ng-bubble single point of reference for debugging**: We love debugging with ```console.log```, `debugger` and `network tab` as well. But these tools are slow and have very strict behaviour. *What if you need to replay same ajax request with different params? How do you hook into change Angular change detection? How do you see state of a component?*

## Usage
1. Install with npm: `npm install -g ng-bubble`
2. Open your angular project in *VScode* or *Webstorm*.
3. Run this command at the root of your project: `ng-bubble`
4. Above command will give you a script, copy and paste that in `<body>` your **index.html**
   ```
   //paste this in body tag your index.html 
   <js-bubble></js-bubble>
   <script src="http://localhost:11637/assets/js/js-bubble.js"></script>
    ```
5. Run your angular project in another terminal (ex: ng serve)

## Video introduction
  [Youtube link](https://www.youtube.com/watch?v=ir5sYS9PyLM&feature=youtu.b)
  
  
  ## Features (Current and Upcoming):
	1. Navigating from component view (in website) to component code (in IDE) (Done in v0.1): [Hotkeys: double click on component] 
	2. Display component files (for code review etc.) (Done in v0.1): [Hotkeys: shift + mousehover on component]
	3. Display component state (Done in v0.1): [Hotkeys: shift + mousehover on component] 
	4. Search project file (Done in v0.1)
	
	5. console layer (Planned for v0.2)
	6. Network layer (Planned for v0.2)
	7. Saving edits in component files (Planned for v0.3)
	8. Display component state (realtime) (Planned for v0.3)
	9. Component method hooks (Planned for v0.3)


