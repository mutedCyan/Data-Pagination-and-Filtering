/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
Author: Sayon Angus
*/

/*
For assistance:
   Check out the "Project Resources" section of the Instructions tab: https://teamtreehouse.com/projects/data-pagination-and-filtering#instructions
   Reach out in your Slack community: https://treehouse-fsjs-102.slack.com/app_redirect?channel=unit-2
*/

/**
   `showPage` Function

 *  Creates and inserts DOM elements which display arrangement of nine students per page,
    with a start and end index value.
 
 *  A for loop will iterate over the data array with the stored student properties,
   checking the current value between the first and last pages and analyses the string
   text containing stored elements as HTML and inserted into the DOM tree.
 */

   const studentsPerPage = 9;

   function showPage (list, page) {
      // active calculations to index range containing students displayed per page 
      let startIndex = (page * studentsPerPage) - studentsPerPage;
      let endIndex = page * studentsPerPage;
      // selects a single class element from the UL element in the index.html
      let studentList = document.querySelector('.student-list');
      // student list class will remain an empty string to remove existing students on the page
      studentList.innerHTML = "";
      
      for (let i = 0; i < list.length; i++) {
         // checks current index within the values of the index range 
         if (i >= startIndex && i < endIndex) {
            // stores DOM elements needed to display student data into Student List class
            let studentItem = 
               `<li class="student-item cf">
                     <div class="student-details">
                     <img class="avatar" src="${list[i].picture.large}" alt="Profile Picture">
                     <h3>${list[i].name.first} ${list[i].name.last}</h3>
                     <span class="email">${list[i].email}</span>
                  </div>
                  
                  <div class="joined-details">
                     <span class="date">${list[i].registered.date}</span>
                  </div>
               </li>
               `;
   
            studentList.insertAdjacentHTML("beforeend", studentItem);
         }
      }
   }
   
   /**
    `addPagination` function
   
      Creates and appends interactive pagination buttons to the webpage,
      using an event listerner to activate when a user clicks a button,
      removing the existing button to make the current page button active
    */
   
   const addPagination = (list) => {
      // math ceil rounds up result to the nearest integar
      const totalOfPages = Math.ceil(list.length / studentsPerPage);
      const linkListHTML = document.querySelector('.link-list');
      linkListHTML.innerHTML = "";
   
      for (let j = 1; j <= totalOfPages; j++) {
         let buttonHTML = `
            <li>
               <button type="button">${j}</button>
            </li>
         `;
         linkListHTML.insertAdjacentHTML('beforeend', buttonHTML);
      }
      // get all of the children from `linkListHTML` element (button)
      const activeBtn = linkListHTML.firstElementChild.firstElementChild;
   let currentBtn = activeBtn;
   // button assigns class name to `active`
   currentBtn.className = 'active';

   linkListHTML.addEventListener('click', (event) => {
      // stores event.target property to `clicked` (easier to identify) 
      let clickedPageBtn = event.target;
      // checks if the event target tagname is a button element
      if (clickedPageBtn.tagName === 'BUTTON'){
         // clears class name to an empty string to remove exisiting button
         currentBtn.className = '';
         // assigns `active` class name to event target (where user clicks)  
         currentBtn = clickedPageBtn;
         // clicked button assigns class name to `active`
         currentBtn.className = 'active';
         // highlights the current page button in webpage
         showPage(list, clickedPageBtn.innerHTML);
      }
   });
   }
   // Call functions
   showPage(data, 1);
   addPagination(data);
   
   /**
    ==  EXTRA CREDIT SECTION  ==
    **/
   
   /**
    * Search Component feature
   
      Dynamically insert elements into Index.HTML
      to show a search bar header element on the webpage
      for users to input a string to generate the new list
      of students
    */
   const searchHeader = document.querySelector('.header');
   searchHTML = `
      <div>
         <label for="search" class="student-search">
            <span> Search by name</span>
            <input id="search" placeholder="Search by name...">
            <button type="button"><img src="img/icn-search.svg" alt="Search icon"></button>
         </label>
      </div>
   `;
   searchHeader.insertAdjacentHTML('beforeend', searchHTML);
   
   // Input and Button variables declared for search functionality
   const studentSearchField = document.querySelector('.student-search');
   const searchBox = document.getElementById('search');
   const searchIconBtn = studentSearchField.querySelector('button');
   
   /*
      Filter Student Search function 
   
      Create a new array to store a filtered list for students,
      when the value of text is typed into the searchbox
      for case insensitive reasons, the value will register upper case
      and lower case inputs.
   
      Iterates over the data array with an element's property (first and last),
      updating the string to an upper case, if the student's name value
      includes a string value that's also upper cased within the search box,
      then the student element found in student name is pushed into the new 
      filtered list. And if the length of the new filtered list is 0, 
      a "no results found" message will replace the exisiting HTML for 
      the student list instead.  
    */
            function filterStudentSearch () {
               let newStudentList = [];
               let inputValue = searchBox.value.toUpperCase();
   
               data.forEach((student) => {
                  let studentName = `${student.name.first} ${student.name.last}`.toUpperCase();
            
                  if (studentName.includes(inputValue)) {
            
                     newStudentList.push(student);
                  }
               });
            
               showPage(newStudentList, 1);
               addPagination(newStudentList);
   
               if (newStudentList.length === 0) {
                  const noResultMsg = document.querySelector('.student-list');
                  noResultMsg.innerHTML = `
                     <li>
                        <h3 style="font-size: 2rem">No Results Found</h3>
                     </li>
                  `;
               }
            }
   /**
    * Invoke search function using an event listener
    * using `click` to refer to the user pressing the
    * search button and another event listener to refer
    * to the user typing a value into the searchbar
    * in real-time using `keyup`
    */
    searchBox.addEventListener('keyup', () => filterStudentSearch());
   
    searchIconBtn.addEventListener('click', () => {
      filterStudentSearch();
      // // check if search button is functional
      // console.log('Search button is responsive!');
    })