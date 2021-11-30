# Todo
Todo is a full stack application that allows people to organize themselves better by allowing users to create to-do lists.

## Team Members & Roles
* Jessica   -   Front end (Design / Desktop with React)
* Nicolas   -   Front end (Design / Mobile app with React Native)
* Manahil   -   Front end (Design / Mobile app with React Native)
* Paul  -   Back end / Front End (Mobile app React Native, API, Debugging, CTO)
* Joel  -   Back end (API, Database, Debugging)
* Jerzy -   Project Manager (Product design / Version Control Administration / Small Changes)

## Initial Project Timeline

* <ins>Week 1 (10-4-21):</ins>     Idea generation, organization, planning.

* <ins>Week 2 (10-11-21):</ins>        Get front & back end running.

* <ins>Week 3 (10-18-21):</ins>        Touch up front & back end + debug.

* <ins>Week 4 (10-25-21):</ins>        Finish mobile version + debug.

* <ins>Week 5 (11-1-21):</ins>     Debug in general + team meeting before presentation.

## Important Takeaways For Project Sprints
- Finish all features and use case plans immediately during the planning period.
- Finish an MVP in entirety as fast as possible immediately following the planning period.
- Flesh out the MVP to the essential features during development period -- user experience, which includes functionality.
- If extra time permits, work on neglected product areas.
- Version control for small project:
    * maintain a 4 branch heirarchy - each individual commits onto their own branch -> testA (sloppy merges of individuals) -> testB (tester backup, which may not work) -> main holds latest working version (and last reliable backup)
    * add branch protection to prohibit issues from arising
    * add a reliable linter bot for code standardization (ontop of coding guidelines / expectations)
    * add dependency bot for automatic security updates.
- Debug and break stuff early.

## Desktop and Mobile Application Design
Desktop:
![image](https://raw.githubusercontent.com/jzry/todo/main/frontend/images/desktop.png)
Mobile:
![image](https://raw.githubusercontent.com/jzry/todo/main/frontend/images/mobile.png)
Logo by Manahil:
![image](https://raw.githubusercontent.com/jzry/todo/main/frontend/images/logo.png)


## Version Control Guidelines

Here are the rules to abide by to make sure our project is documented properly.

We will use a master branch to keep track of the latest working version of the project and "approval" branches to keep track of contributor edits. You will submit any edits that you wish to contribute to the project to an approval branch under your first name. To clarify, this means that when you push your code to the repo, you will checkout to a branch called <your name>. Example: git push -a -b jerzy. If you are unsure about how this works, read up on [git's branching features](https://git-scm.com/book/en/v2/Git-Branching-Basic-Branching-and-Merging). We are doing this because if all team members are uploading and editing directly off the master branch there could be issues if someone makes a mistake and deletes or edits something important. For now, I will check for any pull requests and merge any changes you make to the master branch.

* To upload changes to the code to our public repo follow the process:
    - 1. Git pull onto your local machine (to fetch from and integrate with our public repository onto your local machine)
    - 2. Make changes in the code that you see fit.
    - 3. Git checkout -b your_name (replace your_name with your actual name) - this creates a new branch and switches you to that branch.
    - 4. Git commit -m "meaningful detailed message about what you specifically edited and why". 
    - 5. The project manager will check through merge requests and do "git merge <your_name>" on master if the edit works properly.

## Coding Guidelines

Here are the rules to abide by to make sure our project maintains readability standards:

* Always include a space after the “//” in your comments: “// comment” instead of “//comment”
* Only in-line style comments are allowed.
    -   Example: "// This is a proper comment.", "/* This isnot */", and neither is "//this".
* Make a succint in-line comment above ANY abstract line of code so that others can understand what the code is doing.
* Add as many comments as possible when writing your code but don't overdo the comments. Don't comment on obvious code.
* Any time you open a curly brace, that curly brace should start on a new line.
* Please do not write excessively long lines of code. Lines must be no longer than 100 characters wide.
* Avoid excessive consecutive blank lines. In general, you should never have more than one or two
consecutive blank lines.
* Do leave a space before the opening parenthesis in an if statement or a loop. For example, use
use for (i = 0; i < n; i++) instead of for(i = 0; i < n; i++), and use if (condition) instead of if(condition) or if( condition ).
* Please leave a space on both sides of any binary operators you use in your code (i.e., operators that take two operands). For example, use (a + b) - c instead of (a+b)-c. (The only place you do not have to follow this restriction is within the square brackets used to access an array index, as in: array[i+j].)
* Use meaningful variable names that convey the purpose of your variables. (The exceptions here are when using variables like i, j, and k for looping variables or m and n for the sizes of some inputs.)
