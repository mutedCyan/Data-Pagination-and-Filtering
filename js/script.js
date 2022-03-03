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



/*
Create the `showPage` function
This function will create and insert/append the elements needed to display a "page" of nine students
*/

// refers to shown students
const studentsPerPage = 9;
/**
 * function showPage
 *    pass in list - student data
 *    pass in page - page number
 *    
 *    set startIndex to page parameter multiplied by items per page
 *    and deduct by items per page
 *    set endIndex to page parameter multplied by items per page
 * 
 *    set student_list to ul element (query selector)
 *    set student_list to get innerHTML to contain an empty string
 *    
 *    for each current index[i] in list
 *       if current index is greater than or equal to startIndex &&
 *       less than endIndex
 *          `print createElement (data array needs to be accessed)` 
 *           print student_list to resolve the specific elements to HTML in
 *           a specific position, `beforeend` - inserted into element 
 *           after last child
 *    endFor
 * endFunction
 *       
 */

function showPage (list, page) {
   let startIndex = (page * studentsPerPage) - studentsPerPage;
   let endIndex = page * studentsPerPage;

   let studentList = document.querySelector('.student-list');
   studentList.innerHTML = "";
   
   for (let i = 0; i < list.length; i++) {
      if (i >= startIndex && i < endIndex) {
         // create DOM elements needed to display student data
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
         // insert above elements -  insertAdjacentHTML
         studentList.insertAdjacentHTML("beforeend", studentItem);
      }
   }
}



/*
Create the `addPagination` function
This function will create and insert/append the elements needed for the pagination buttons
*/



// Call functions
showPage(data, 1);