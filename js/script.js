/*
   Treehouse Techdegree:
   FSJS Project 2 - Data Pagination and Filtering
*/

/*
   Credit must go to the student success specialist Marie Ehrman who helped me 
   finding the origin of a problem with the search function which was related 
   to unexpected behaviour of the removeEventListener() function. Without her 
   help I would have been obliged to use an additional global variable to get 
   the search function to work as proscribed, which was less elegant.
*/

/*
For assistance:
   Check out the "Project Resources" section of the Instructions tab: https://teamtreehouse.com/projects/data-pagination-and-filtering#instructions
   Reach out in your Slack community: https://treehouse-fsjs-102.slack.com/app_redirect?channel=unit-2
*/

// How many students we want to see on a page at once:
const studentsPerPage = 9;

// We show page nr 1 by default
let activePage = 1;

/**
 * Shows a subset of 9 students among a set of students provided by the
 * 'list' parameter. The size of the subset (9) can be changed by modifying
 * the 'studentsPerPage' constant. Which subset is shown is defined by the
 * second 'page' parameter, which is 1 based. So a value of 1 for 'page'
 * will show the first 9 students (if the 'list' set contains 9 or more 
 * students of course).
 * 
 * @param {array of objects} list - the set of students 
 * @param {number} page - The page number that should be shown
 * @returns nothing
 */
function showPage(list, page) { 

   // The createLI function creates an li containing the data of the 'student'
   // parameter and returns it as a string of html code
   function createLI(student) {
      return (
         `<li class="student-item cf">` +        
            `<div class="student-details">` + 
            `<img class="avatar" src="${student.picture.large}" alt="Profile Picture">` +
            `<h3>${student.name.first} ${student.name.last}</h3>` +
            `<span class="email">${student.email}</span>` +
            `</div>` +
            `<div class="joined-details">` +
               `<span class="date">Joined ${student.registered.date}</span>` +
            `</div>` +
         `</li>`
      );
   }

   // the parameter is 1 based so we subtract one to get the correct first index
   const startIndex = (page - 1) * studentsPerPage;

   // maked sure we are not trying to show more students than there are in the dataset.
   // The last index is (endIndex - 1)!
   const endIndex = Math.min(page * studentsPerPage, list.length);

   // select the unordered list to which we'll add the students
   const ul = document.querySelector('ul.student-list');

   // we start with a empty page
   ul.innerHTML = '';

   // create the li elements with the students' data and add them to the list
   for(let i = startIndex; i < endIndex; i++) {     
      const student = createLI(list[i]);
      ul.insertAdjacentHTML('beforeend', student);
   }

   // If 'list' contains zero students, let the user know 
   if(ul.children.length === 0) {
      ul.insertAdjacentHTML('afterbegin', `<h2>Your search did not produce any result</h2>`);   
   }
}

/**
 * Shows a subset of 9 students among a set of students provided by the
 * 'list' parameter. The size of the subset (9) can be changed by modifying
 * the 'studentsPerPage' constant. Which subset is shown is defined by the
 * second 'page' parameter, which is 1 based. So a value of 1 for 'page'
 * will show the first 9 students (if the 'list' set contains 9 or more 
 * students of course).
 * 
 * @param {array of objects} list - the set of students 
 * @param {number} page - The page number that should be shown
 * @returns nothing
 */
function addPagination(list) {

   // returns a string containing a(n active) button inside an li
   function createButtonLi(text, isActive) {
      let className = '';
      if(isActive) {
         className = 'active';   
      }
      return (
         `<li>` +
            `<button type="button" class="${className}">${text}</button>` +
         `</li>`
      );
   }

   // The following event Listener checks for clicks on the button links
   // representing the different pages. It will not redraw if the user
   // clicks on the currently active page number.
   function paginationEventListener(event) {

      // only proceed if the user clicked on an actual button
      if(event.target.tagName === 'BUTTON') {

         // extract the page/ button number from the event data
         const selectedPage = parseInt(event.target.innerText);
      
         // reload if the user selected a page that differs from the current one
         if(selectedPage !== activePage) {

            // get a list of buttons
            let lis = ul.children;

            // remove the highlight from the previously active page...
            lis[activePage - 1].querySelector('button').className = '';

            // ...and highlight the button of the currently active page
            lis[selectedPage - 1].querySelector('button').className = 'active';

            // keep track of the currently active page
            activePage = selectedPage;
            
            // and finally show the new page
            showPage(list, activePage);  
         }    
      }
   }   

   // The last page might not contain 9 students, hence Match.ceil()
   const nrPages = Math.ceil(list.length / studentsPerPage);

   // select the correct unordered list to which we'll add the page nr buttons
   let ul = document.querySelector('ul.link-list');

   // start with 0 buttons
   ul.innerHTML = '';

   // add the buttons for each page to the unordered list
   for(let i = 1; i <= nrPages; i++) {      
      const buttonLi = createButtonLi(i, i === activePage);
      ul.insertAdjacentHTML('beforeend', buttonLi);
   } 
   
   // Install the event handler that listens for page-button clicks
   /*
      Each time the addPagination function is called, the event listener is added. The
      <element>.addEventListener() function does not overwrite the previous one, so we
      need to remove the previous event listener first. Logically we should then call 
      the <element>.removeEventListener() before we add it again. This however does not
      work as expected, for a yet unknown reason. 
      No matter how often you call removeEventListener(), it will never remove *all*
      event listeners, which causes a minimum of two event listeners to be active,
      which in turn causes a major dysfunction with the search functionality.
      So instead I used "ul.onclick = paginationEventListener;" as this DOES effectively
      remove all previous event listeners.
   */
   // Original code (removeEventListener never removes the originally added eventListener):
   //ul.removeEventListener('click', paginationEventListener, true);
   //ul.addEventListener('click', paginationEventListener, true); 

   // was replaced with (this *does* remove all previous eventListeners):
   ul.onclick = paginationEventListener;
}

/**
 * This function adds the student search functionality by adding the search 
 * dialog as well as adding an event listener to the search dialog. 
 * A new search will be done each time the user changes the query, and
 * the result of the search will be displayed immediately.
 * Any match will yield a result i.e. a student named "Valerie Woda" will show
 * up for the query "eri". The search is not case sensitive.
 * 
 * @param {array of objects} list - the set of students on which to run each query
 * @returns nothing
 */
function addSearch(list) {

   // return the search dialog html as a string
   function createSearchDialog() {
      return (
         `<label for="search" class="student-search">` +
            `<span>Search by name</span>` +
            `<input id="search" placeholder="Search by name...">` +
            `<button type="button">` +
               `<img src="img/icn-search.svg" alt="Search icon">` + 
            `</button>` +
         `</label>`
      );
   }

   // The event listener for the search dialog
   function searchEventListener(event) {

      // convert the user-entered query to uppercase
      const userInput = event.target.value.toUpperCase();

      // start with a set of 0 results
      const studentList = [];

      // loop through the base set and look for matches
      for(let i = 0; i < list.length; i++) {
         const student = list[i];

         // create a string with first and last name & convert to uppercase
         const studentName = `${student.name.first} ${student.name.last}`.toUpperCase();        

         // add the student to the subset if we found a match
         if(studentName.includes(userInput)) {
            studentList.push(student);
         }
      }
      // show the first page of the subset of students
      activePage = 1;
      showPage(studentList, activePage);

      // only add pagination if needed
      if(studentList.length > studentsPerPage) {
         addPagination(studentList);
      } 
      else {
         // hide pagination
         document.querySelector('ul.link-list').innerHTML = '';
      }
   }

   // Insert the search dialog & event listener into the DOM
   const studentsHeader = document.querySelector('header.header');
   studentsHeader.insertAdjacentHTML('beforeend', createSearchDialog());   
   studentsHeader.addEventListener('input', searchEventListener);
}

// *********************
// Start of main program
// *********************

// Call functions
showPage(data, activePage);
addPagination(data);
addSearch(data);