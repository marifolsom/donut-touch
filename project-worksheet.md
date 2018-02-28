# Project Overview

## Project Schedule
This schedule will be used to keep track of your progress throughout the week and align with our expectations.  

You are **responsible** for scheduling time with your squad to seek approval for each deliverable by the end of the corresponding day, excluding `Saturday` and `Sunday`.

|  Day | Deliverable |
|---|---|
|Day 1: Tuesday | Game Idea|
|Day 2: Wednesday | Completed wireframes and prioritized features|
|Day 3: Thursday| Pseudocode|
|Day 4: Friday| Basic Clickable Model|
|Day 5: Saturday| Working Prototype|
|Day 6: Sunday| Game Completed / Slides|
|Day 7: Monday| Project Presentations|

## Project Description
*Use this section to describe your final project and perhaps any links to relevant sites that help convey the concept and/or functionality.*


## Priority Matrix
*Include a full list of features that have been prioritized based on the `Time and Importance` Matrix.*


## MVP
*Include the full list of features that will be part of your MVP*


## POST MVP
*Include the full list of features that you are considering for POST MVP*


## Wireframes 
![](./img/cursorgame-wireframes.jpg) 


## Game Components
### Landing Page
*What will a player see when they start your game?*

On the landing page, there'll be the name of the game up at the top, with a form where the user can input their name, and a `Play!` button. There will also be a second landing page, where the user can then select the level they want to start playing at.

### Game Initialization
*What will a player see when the game is started?*

After inputting their name and selecting a level, the level will begin. Towards the top of the game screen, there will be a information bar with the current level being played, the user's name, the user's score, as well as an exit button. Each level will have a start and end zone, in which the cursor would have to enter and click to begin and end the game.

### Playing The Game
*What will be the flow of the game, what will the user be expected to do and what will the user expect from the game?*

To play the game, the user must make it across the game screen from the start zone to the end zone without hitting any of the obstacles. With each level, the number of obstacles, speed, etc. will make it more and more difficult for the user to get to the end zone. Each level will also have items (coins, gems, not sure exactly what yet) that the user can also choose to collect in order to get a higher score.

### Winning The Game
*What does it look like when the game ends, what determines winning or losing?*

The user wins the level when they make it from the start zone to the end zone without running into any of the level's obstacles. If the user hits any of the obstacles, they lose. To win the entire game, all levels must be cleared.

### Game Reset
*How will the user restart the game once it has been completed.*

On the `Level cleared!` or `GAME OVER` pop-up, there will also be an option to `play again`, go to the `next level`, or `return to the menu`. Playing again would reset the level, and the user can try again.


## Functional Components
Based on the initial logic defined in the previous game phases section try and breakdown the logic further into functional components, and by that we mean functions.  Does your logic indicate that code could be encapsulated for the purpose of reusablility.  Once a function has been defined it can then be incorporated into a class as a method. 

Time frames are also key in the development cycle.  You have limited time to code all phases of the game.  Your estimates can then be used to evalute game possibilities based on time needed and the actual time you have before game must be submitted. 

| Component | Priority | Estimated Time | Time Invetsted | Actual Time |
| --- | :---: |  :---: | :---: | :---: |
| Component 1 | H | 10hrs| 12hrs | 12hrs |

## Helper Functions
Helper functions should be generic enought that they can be reused in other applications. Use this section to document all helper functions that fall into this category.

| Function | Description | 
| --- | :---: |  
| Capitalize | This will capitalize the first letter in a string | 

## Additional Libraries
 Use this section to list all supporting libraries and thier role in the project. 

## jQuery Discoveries
 Use this section to list some, but not all, of the jQuery methods and\or functionality discovered while working on this project.

## Change Log
 Use this section to document what changes were made and the reasoning behind those changes.  

## Issues and Resolutions
 Use this section to list of all major issues encountered and their resolution.

#### SAMPLE.....
**ERROR**: app.js:34 Uncaught SyntaxError: Unexpected identifier                                
**RESOLUTION**: Missing comma after first object in sources {} object
