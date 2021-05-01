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
  data taken from the 'studentData' parameter and appends it to the unordered 
  list with the class 'student-list' in index.html.

  - 'studentsPerPage' is a global constant.
  - 'studentData' is an array of objects with student data. See data.js for an 
  example as to what 'studentData' should look like.
  - The pages are numbered from 1. A value of 1 for the parameter 'pageNr' will 
  display the first set of 'studentsPerPage' nr of students from the 
  'studentData' array.
*/
function showPage(studentData, pageNr) {  

   // the parameter is 1 based so we subtract one to get the correct first index
   const startIndex = (pageNr - 1) * studentsPerPage;

   // maked sure we are not trying to show more students that there are in the dataset
   const endIndex = Math.min(pageNr * studentsPerPage - 1, studentData.length - 1);

   // select the unordered list to which we'll add the students
   const ul = document.querySelector('ul.student-list');

   // make sure we start with a empty page
   ul.innerHTML = '';

   // create the li elements with the students' data
   for(let i = startIndex; i <= endIndex; i++) {

      // <li class="student-item cf">
      let li = document.createElement('li');
      li.className = 'student-item cf';

      // <div class="student-details"></div>
      let div = document.createElement('div');
      div.className = 'student-details';    

      // <img class="avatar" src="https://randomuser.me/api/portraits/women/25.jpg" alt="Profile Picture">
      let img = document.createElement('img');
      img.className = 'avatar';
      img.src = studentData[i].picture.thumbnail;
      img.alt = 'Profile Picture';

      // <h3>Ethel Dean</h3>
      let h3 = document.createElement('h3');
      h3.innerText = `${studentData[i].name.first} ${studentData[i].name.last}`;

      // <span class="email">ethel.dean@example.com</span>
      let span = document.createElement('span');
      span.className = 'email';
      span.innerText = studentData[i].email;

      // <div class="joined-details"></div>
      let div2 = document.createElement('div');
      div2.className = 'joined-details';

      // <span class="date">Joined 12-15-2005</span>
      let span2 = document.createElement('span');
      span2.className = 'date';
      span2.innerText = `Joined ${studentData[i].registered.date}`;

      // assemble the first div
      div.appendChild(img);
      div.appendChild(h3);
      div.appendChild(span);

      // assemble the second div
      div2.appendChild(span2);

      // append both divs to the li
      li.appendChild(div);
      li.appendChild(div2);
     
      // append the li to the ul
      ul.appendChild(li);   
   }
}

/*
Create the `addPagination` function
This function will create and insert/append the elements needed for the pagination buttons
*/
function addPagination(studentData) {
   const nrPages = Math.ceil(studentData.length / studentsPerPage);

   let ul = document.querySelector('ul.link-list');
   ul.innerHTML = '';

   for(let i = 1; i <= nrPages; i++) {

      // <li>
      let li = document.createElement('li');

      // <button type="button" class="active">1</button>
      let button = document.createElement('button');
      button.type = 'button';
      if(i === activePage) {
         button.className = 'active';
      }     
      button.innerText = i;
      li.appendChild(button);
      ul.appendChild(li);
   } 
   
   ul.addEventListener('click', (event) => {
      const selectedPage = parseInt(event.target.innerText);
     
      if(selectedPage !== activePage) {
         let lis = ul.children;
         lis[activePage - 1].querySelector('button').className = '';
         lis[selectedPage - 1].querySelector('button').className = 'active';
         activePage = selectedPage;
      }     
      showPage(data, activePage);
   });

}

// Call functions
addPagination(data);
showPage(data, activePage);



