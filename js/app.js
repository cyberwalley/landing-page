/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Define Global Variables
 * 
*/



let setTotalSection = 6;
/**
 * End Global Variables
 * Start Helper Functions
 * 
*/


createSection();
populateMenuItem();
smoothScrollToSelectedSection();
activeSectionOnView();


// run on DOM load
document.addEventListener('DOMContentLoaded', function() {
    firstMenuItemSelectedOnLoad();
    firstSectionSelectedOnLoad();
    

}, false);


// create section
    function createSection(){
        for (let sectionNumber = 1; sectionNumber  <= setTotalSection; sectionNumber++){
           
            const positionOnDom = document.querySelector('main');
                        let sectionBlock = `
                    <section id="section${sectionNumber}" data-nav="Section ${sectionNumber}">
                    <div class="landing__container">
                    <h2>Section ${sectionNumber}</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi fermentum metus faucibus lectus pharetra dapibus. Suspendisse potenti. Aenean aliquam elementum mi, ac euismod augue. Donec eget lacinia ex. Phasellus imperdiet porta orci eget mollis. Sed convallis sollicitudin mauris ac tincidunt. Donec bibendum, nulla eget bibendum consectetur, sem nisi aliquam leo, ut pulvinar quam nunc eu augue. Pellentesque maximus imperdiet elit a pharetra. Duis lectus mi, aliquam in mi quis, aliquam porttitor lacus. Morbi a tincidunt felis. Sed leo nunc, pharetra et elementum non, faucibus vitae elit. Integer nec libero venenatis libero ultricies molestie semper in tellus. Sed congue et odio sed euismod.</p>

                    <p>Aliquam a convallis justo. Vivamus venenatis, erat eget pulvinar gravida, ipsum lacus aliquet velit, vel luctus diam ipsum a diam. Cras eu tincidunt arcu, vitae rhoncus purus. Vestibulum fermentum consectetur porttitor. Suspendisse imperdiet porttitor tortor, eget elementum tortor mollis non.</p>
                    </div>
                    </section>

                `;
                
             positionOnDom.insertAdjacentHTML('beforeend', sectionBlock);
            
            
             
        }
      
    }
        


   // build the nav
function populateMenuItem (){
            const totalSections = document.querySelectorAll('section');
            const navBarLocation = document.querySelector('.navbar__menu #navbar__list');
            for (let i=1; i <= totalSections.length; i++){
                const menuListContent = `<li><a class="menu__link" href="#section${i}">Section ${i}</a></li>`;
                navBarLocation.insertAdjacentHTML('beforeend', menuListContent);
                
            }
          
        }

      
         // handles mouse events add your-active-class on section in view
         function handleMenuMouseHover(e){
            removeAllSelecteds()
            let actualSectionInView = e.currentTarget;
            actualSectionInView.classList.add('your-active-class');
        }

        // Handles click events and adds class 'your-active-class' and 'active' to section when near top of viewport
        // and selected menu item respectively
        function handleMenuClick(e){
                e.preventDefault();
                removeAllSelectedMenuItem()
                let selectedMenuItem = e.target;
                selectedMenuItem.classList.add('active');
                const getSectionId = selectedMenuItem.getAttribute('href');
                const sectionId = document.querySelector(getSectionId);

                // Scroll to anchor ID using scrollTO event
                sectionId.scrollIntoView({ 
                    block: 'end', 
                    behavior: 'smooth', 
                    inline: 'center',
                    class:'selected'
                });
                removeAllSelecteds()
                // Set sections as active
                sectionId.classList.add('your-active-class');
           
        }
            // add your-active-class on mouse events
            function activeSectionOnView() {
                const sections = document.querySelectorAll('section');
                for (let section of sections){
                   
                    section.addEventListener('mouseenter', handleMenuMouseHover);
                }
                
            }

            // select first section item on page load
            function firstSectionSelectedOnLoad() {
                const sections = document.querySelectorAll('section');
               
                sections[0].classList.add('your-active-class');
   
            }

           
    
        // Scroll to section on link click
        function smoothScrollToSelectedSection(){
            const selectedMenus = document.querySelectorAll('.menu__link');
            for ( let selectedMenu of selectedMenus){
               //selectedMenus[selectedMenus.length - 1].classList.add('active');
                selectedMenu.addEventListener('click', handleMenuClick);
   
            }

        }

        // select first menu item on page load
        function firstMenuItemSelectedOnLoad(){
            const selectedMenus = document.querySelectorAll('.menu__link');
            
               selectedMenus[0].classList.add('active');
       
        }


       
         // remove active class on all menu items
        function removeAllSelectedMenuItem(){
            const selectedMenus = document.querySelectorAll('.menu__link');
            for ( let selectedMenu of selectedMenus){
                selectedMenu.classList.remove('active');
            }
        }

        
    // remove active class on all sections
        function removeAllSelecteds() {
            const sectionsInView = document.querySelectorAll('section');
            for (let sectionInView of sectionsInView) {
                sectionInView.classList.remove('your-active-class');
            }
        }
        
        



