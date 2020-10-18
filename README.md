#react-iframe - Does a React App in an iframe leak memory?

I created this example code to determine the answer to a question:

**(Q) When I run a React App in an iframe do I need to do anything special to free memory used within the iframe app?**

Through my own experimentation I determined that React can run within an iframe and does not need to do anything in 
order to free memory.  As long as the React App does not add anything to the global namespace (and by default nothing
is added to the global namespace), then all of the memory used by the React App (in the iframe) is freed when the
iframe is deleted/removed from the DOM.

# How this app was created

This app was created using create-react-app and then adding a parent html file `public/parent.html`.
The parent.html file allows you to open one or more iframes and close them.   I played around with the
Chrome Devtools performance monitor and memory snapshot tools to look for memory leaks.

Next the create-react-app was modified so that it had an input field to specify the memory in KiloBytes (1000 bytes
) in order to experiment or simulate the application allocating memory (and storing it in the state) and then
removing it.  Two buttons facilitate this  **Grow Memory** and **Reduce Memory**.

The memory is stored in the React state [using the State Hook](https://reactjs.org/docs/hooks-state.html) `useState()`.

# Getting Started
The following one time steps are needed to run the program.

- Download the code

   ```git clone git@github.com:steranka/react-iframe.git```
  
- Install the http server `serve` globally if you don't already have it installed.

    ```npm install -g serve```
    
That's it... continue with how to run the program.
   
# How to run this program

You can run this program in two ways:

## Running the React Application (using Hot Module Reloading)
To see how the application works you can run this as a normal React application.
```
    npm install
    npm start
    # open https://localhost:3000
```
See the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started) for
    details about how to run a create-react-app.
    
My experience was when using HMR (Hot module reloading) memory was not freed (period).  Even when using Ctrl+F5 force a reload of the page, the memory used just kept growing.  


## Running from a production build

The suggested way is to build for a production deployment (with minimized code) and use an http server to serve the
 code.  You then open the  `parent.html` file and use it to launch the React app.

To run the parent.html file you must first compile the React app into production mode, and then serve up the
 directory that holds that results.  The parent.html will be included in that build, so that is the file to open.
 The `serve` npm package implements an web server to host the application (and was installed earlier).
 
 The following lines to run the parent wrapper for the React Application and launch iframes.  

    npm run build
    serve -p 3000 build
    # open https://localhost:3000/parent.html
    
Next navigate to https://localhost:3000/parent.html and click the Open IFRAME button and allocate some memory and
 then close the IFRAME.


## Examining Memory
After understanding how the app works, I did the following (everything here focuses on Chrome DevTools).  Similar but
 different steps are needed to do this in Firefox.

### Establish a baseline for memory use
1. Build and run the application in production mode (serve files from `build` directory).
2. Open Chrome to https://localhost:3000/parent.html and  get a baseline for memory use by using the following steps.
3. Next select **Chrome Settings  | More Tools | Task Manager**  NOTE: This is NOT in the Chrome DevTools window.  I used the **JavaScript memory (live)** value. The initial values I got were **3,112K (2,462K live)**.  The **live** value is the value to watch as it represents objects that are still _in use_.
4. Next open the Chrome DevTools Window (Press F12), and
5. Open the Memory tab and click on **Heap snapshot**.   

Now you have a baseline of what memory the web page is using.  

### See how much memory is used when iframe is open and allocates memory

1. Next open one iframe (**live value jumped to 3,872**) and
2. click on **Grow Memory**.  Just allocating 500K in this app uses around 10Meg on the heap 
(**live value jumped to 100,231K**). Don't ask me why.
3. Again create a snapshot.  Memory tab and click on **Heap snapshot**.
4. Record how much memory is being used in the Task Manager.

### Next close the iframe and see if all memory is released

1. Open a snapshot and type in Detached in the filter to see if anything is "leaked". [See Detached DOM tree leaks memory](https://developers.google.com/web/tools/chrome-devtools/memory-problems#discover_detached_dom_tree_memory_leaks_with_heap_snapshots)
 
**Important Note: When Reducing memory, the `Chrome Task Manager` often did not immediately change.  To get it to change, I could type values into the text field and then garbage collection would run and the memory would drop.**

### My findings/results

The value at the end of this test was **4,628K (2,848K live)**.  Given that memory went to over 100Meg in my test I feel pretty confident that there is not any significant (if any) memory leak with a React application running in an iFrame.

Interestingly enough.  When opening another Tab in the same Chrome browser being used for this test and then closing it
caused garbage collection to run and resulted in a smaller memory size **4,116K (1,889K live)** than the inital page load.  
Which further supports my claim that memory is not being leaked.
 

# References
Below are links to things I found useful.

- Chrome DevTools | Fix Memory Problems - https://developers.google.com/web/tools/chrome-devtools/memory-problems

