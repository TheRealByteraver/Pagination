/*
   Treehouse Techdegree:
   FSJS Project 2 - Data Pagination and Filtering
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

/* 
  This function adds a maximum of 'studentsPerPage' li elements with students' 
  data taken from the 'list' parameter and appends it to the unordered 
  list with the class 'student-list' in index.html.

  - 'studentsPerPage' is a global constant.
  - 'list' is an array of objects with student data. See data.js for an 
  example as to what 'list' should look like.
  - The pages are numbered from 1. A value of 1 for 'page' will display 
  the first set of 'studentsPerPage' nr of students from the 'list' array.
*/
function showPage(list, page) { 

   // The createLI function creates an li containing the data of the 'student'
   // parameter and returns it as a string of html code
   function createLI(student) {
      return (
         `<li class="student-item cf">` +        
            `<div class="student-details">` + 
            `<img class="avatar" src="${student.picture.thumbnail}" alt="Profile Picture">` +
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

   // maked sure we are not trying to show more students than there are in the dataset
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
}

/*
   The addPagination function will create a list of buttons for each page 
   of students and add an event handler for these buttons that call the 
   showPage() function with the page nr the user selected as parameter.
*/
function addPagination(list) {

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

   // The last page might not contain 9 students, hence Match.ceil()
   const nrPages = Math.ceil(list.length / studentsPerPage);

   // select the correct unordered list to which we'll add the page nr buttons
   let ul = document.querySelector('ul.link-list');

   // start with 0 buttons
   ul.innerHTML = '';

   // add the buttons for each page to the unordered list
   for(let i = 1; i <= nrPages; i++) {      
      const button = createButtonLi(i, i === activePage);
      //ul.appendChild(button);
      ul.insertAdjacentHTML('beforeend', button);
   } 
   
   // The below event handler listens for page-button clicks
   ul.addEventListener('click', (event) => {

      // only proceed if the user clicked on an actual button
      if(event.target.tagName !== 'BUTTON') {
         return;
      }

      // extract the page/ button number from the event data
      const selectedPage = parseInt(event.target.innerText);
     
      // reload if the user selected a page that differs from the current one
      if(selectedPage !== activePage) {

         // get a list of buttons
         let lis = ul.children;

         // highlight the button of the currently active page
         lis[activePage - 1].querySelector('button').className = '';
         lis[selectedPage - 1].querySelector('button').className = 'active';

         // keep track of the currently active page
         activePage = selectedPage;
         
         // and finally show the new page
         showPage(data, activePage);
      }        
   });
}

// Call functions
showPage(data, activePage);
addPagination(data);



