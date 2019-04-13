# ng-bubble

[![N|Solid](https://github.com/goodmite/ng-bubble/blob/master/final_5cb1a092030dcd0014ea1259_949617.gif?raw=true)](https://github.com/goodmite/ng-bubble/blob/master/final_5cb1a092030dcd0014ea1259_949617.gif?raw=true)

##  What is this?
ng-bubble is a webcomponent that lives in your angular project (via index.html) and help you with debugging and stuff.

## Motivation
Motivations behind ng-bubble are two-fold:
  - **"Automating" trivial tasks** : When my junior joined our frontend team, he struggled to find right component code in IDE (among 1000+ files) for a section of website. He said:
    >There should be a tool which takes me to component file when I double click on component in website.
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

# Video introduction
  [Youtube link](https://www.youtube.com/watch?v=ir5sYS9PyLM&feature=youtu.b)

