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
   showPage(data, 1);
   /**
    `addPagination` function
   
      Creates and appends interactive pagination buttons to the webpage,
      using an event listerner to activate when a user clicks a button,
      removing the existing button to make the current page button active
    */
   
   const addPagination = (list) => {
      // math ceil rounds up result to the nearest integar
      const totalOfPages = Math.ceil(list.length / studentsPerPage);
      const linkList = document.querySelector('.link-list');
      linkList.innerHTML = "";
   
      for (let i = 1; i <= totalOfPages; i++) {
         let pageButtonHTML = `
            <li>
               <button type="button">${i}</button>
            </li>
         `;
         linkListHTML.insertAdjacentHTML('beforeend', pageButtonHTML);
      }
      // get all of the children from `linkListHTML` element (button)
      const pageBtns = linkList.getElementsByTagName('button');
      let currentPageBtn = pageBtns;

      if (currentPageBtn.length > 0) {
         // button assigns `active` class name
          currentPageBtn[0].className = 'active';
      } else {
         const studentList = document.querySelector('.student-list');
         studentList.innerHTML = `
            <li>
               <h3> No Results Found </h3>
            </li>
         `;
      }

   linkListHTML.addEventListener('click', (event) => {
      // stores event target property to `clickedPageBtn` (easier to identify) 
      let clickedPageBtn = event.target;

      if (clickedPageBtn.tagName === 'BUTTON'){
         // clears `active` class name to an empty string from existing button
         let removeBtn = document.querySelector('.active').className = '';
         // clicked button assigns `active` class name to current button
         currentBtn.className = 'active';
         // calls up showPage function with list and page number displayed
         showPage(list, clickedPageBtn.innerHTML);
      }
   });
   }

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
      and lower case inputs

      Iterates over the data array for each array element (student name),
      converting the string value to an upper case if input within the search box.
      The data will be pushed into a new array for filtered names, if the length
      compares to the , a "no results found" message will replace the existing HTML
      for the student list.  
    */
            function filterSearch () {
               let newList = [];
               let searchInput = searchBox.value.toUpperCase();
               // console.log(searchInput);
   
               data.forEach((student) => {
                  let studentName = `${student.name.first} ${student.name.last}`.toUpperCase();
                  // checks if the first and last names of each student contains the same value as the search input
                  if (studentName.includes(inputValue)) {
                     newStudentList.push(student);
                  }
               });
            
               showPage(newList, 1);
               addPagination(newList);
   
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
      // console.log('Search button is responsive!');
    })