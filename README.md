# UCF Map
UCF Map is a full stack application that creates a better user experience for the UCF campus map. People who visit UCF and are unfamiliar with the campus may use UCF Map's website or app to find their way around campus. People can make a free account to enable various features such as building and parking fullness checker, productivity tools, and schedule linkage.

## Team Members & Roles
* Jessica   -   Front end
* Nicolas   -   Front end
* Manahil   -   Front end
* Paul (@LambdaPaul)  -   Back end
* Joel  -   Back end
* Jaeden    -   Back end
* Jerzy -   Project Manager (Front / Back)

## Project Plan

* <ins>Week 1 (10-4-21):</ins>     Idea, organization, planning, DB setup, remote hosting setup (digitalocean, heroku, linode?), BEGIN front end / pseudocode backend

* <ins>Week 2 (10-11-21):</ins>        Finish rough draft of both the front end (HTML / CSS / Javascript / Figma ) and backend (MERN stack??)

* <ins>Week 3 (10-18-21):</ins>        Finalize look and functionality of website, connect back end to front end to have a working website / BEGIN to make mobile application

* <ins>Week 4 (10-25-21):</ins>        Finish mobile application / Debug website to mobile interaction

* <ins>Week 5 (11-1-21):</ins>     Debugging general (website debug, mobile app debug, connection debug).

* <ins>Week 6 (11-8-21):</ins>     Debugging / Make a quick presentation / meet together before presenting (This will be around october 30? / december?)

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
