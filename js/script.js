/*
   Treehouse Techdegree:
   FSJS Project 2 - Data Pagination and Filtering
*/



/*
For assistance:
   Check out the "Project Resources" section of the Instructions tab: https://teamtreehouse.com/projects/data-pagination-and-filtering#instructions
   Reach out in your Slack community: https://treehouse-fsjs-102.slack.com/app_redirect?channel=unit-2
*/

const studentsPerPage = 9;
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
   // parameter
   function createLI(student) {
      let li = document.createElement('li');
      li.className = 'student-item cf';
      li.innerHTML = 
         `<div class="student-details">` + 
           `<img class="avatar" src="${student.picture.thumbnail}" alt="Profile Picture">` +
           `<h3>${student.name.first} ${student.name.last}</h3>` +
           `<span class="email">${student.email}</span>` +
         `</div>` +
         `<div class="joined-details">` +
            `<span class="date">Joined ${student.registered.date}</span>` +
         `</div>`;
      return li;
   }

   // the parameter is 1 based so we subtract one to get the correct first index
   const startIndex = (page - 1) * studentsPerPage;

   // maked sure we are not trying to show more students that there are in the dataset
   const endIndex = Math.min(page * studentsPerPage, list.length);

   // select the unordered list to which we'll add the students
   const ul = document.querySelector('ul.student-list');

   // make sure we start with a empty page
   ul.innerHTML = '';

   // create the li elements with the students' data and add them to the list
   for(let i = startIndex; i < endIndex; i++) {     
      const li = createLI(list[i]);
      ul.appendChild(li);   
   }
}

/*
  The addPagination function will create a list of buttons for each page (set)
  of 'studentsPerPage' nr of students and add an event handler for these
  buttons that call the showPage() function with the page nr the user selected.
*/
function addPagination(list) {

   function createButtonLi(text, isActive) {
      let li = document.createElement('li');
      let className = '';
      if(isActive) {
         className = 'active';   
      }
      li.innerHTML = `<button type="button" class="${className}">${text}</button>`;
      return li;
   }

   // The last page might not contain 9 students, hence Match.ceil()
   const nrPages = Math.ceil(list.length / studentsPerPage);

   // select the correct unordered list to which we'll add the page nr buttons
   let ul = document.querySelector('ul.link-list');

   // start with 0 buttons
   ul.innerHTML = '';

   // add the buttons for each page to the unordered list
   for(let i = 1; i <= nrPages; i++) {      
      const li = createButtonLi(i, i === activePage);
      ul.appendChild(li);
   } 
   
   ul.addEventListener('click', (event) => {

      // only proceed if the user clicked on an actual button
      if(event.target.tagName !== "BUTTON") {
         return;
      }

      // extract the page/ button number from the event data
      const selectedPage = parseInt(event.target.innerText);
     
      // reload if the user selected a page that differs from the current one
      if(selectedPage !== activePage) {
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



