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



let setTotalSection = 4;
/**
 * End Global Variables
 * Start Helper Functions
 * 
*/


createSection();
populateMenuItem();
smoothScrollToSelectedSection();
openMobileMenu();
closeMobileMenu();




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
                    <section id="section${sectionNumber}" data-nav="Section ${sectionNumber}" data-section="#section${sectionNumber}">
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
                const menuListContent = `<li><a class="menu__link" data-link="section ${i}" href="#section${i}">Section ${i}</a></li>`;
                navBarLocation.insertAdjacentHTML('beforeend', menuListContent);
                
            }
          
        }


          //Determine if an element is in the viewport
        var isInViewport = function (elem) {
            var distance = elem.getBoundingClientRect();
            return (
                distance.top >= 0 &&
                distance.left >= 0 &&
                distance.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
                distance.right <= (window.innerWidth || document.documentElement.clientWidth)
            );
        };

               
        //add your-active-class on section in view port
                window.addEventListener('scroll', function (event) {
                    const sections = document.querySelectorAll('[data-section]');
            for (let section of sections ){
                section.classList.remove('your-active-class')
                if (isInViewport(section)) {
                    section.classList.add('your-active-class')
                    const sectionId = section.getAttribute('data-section')
                    
                    deactivateNavLinks();
                    
                    activateNavLinks(sectionId);
                    
                }
            }
                }, false);

                

                //add active class to menu item
                function activateNavLinks(sectionId){
                        const navLinks = document.querySelectorAll('[data-link]');
                        for(let navLink of navLinks){
                            if (sectionId === navLink.getAttribute('href')){
                                
                                navLink.classList.add('active');
                                
                            }

                        }
                }

                //remove active class to menu item
                function deactivateNavLinks(){
                    const navLinks = document.querySelectorAll('[data-link]');
                    for(let navLink of navLinks){
                            navLink.classList.remove('active');
                
                    }
            }

      

        // Handles click events and adds class 'your-active-class' and 'active' to section when near top of viewport
        // and selected menu item respectively
        function handleMenuClick(e){
                e.preventDefault();
                slideUpMenuOnMenuItemClick();
                removeAllSelectedMenuItem();
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
          
            // select first section item on page load
            function firstSectionSelectedOnLoad() {
                const sections = document.querySelectorAll('section');
               
                sections[0].classList.add('your-active-class');
   
            }

       
        // Scroll to section on link click
        function smoothScrollToSelectedSection(){
            const selectedMenus = document.querySelectorAll('.menu__link');
            for ( let selectedMenu of selectedMenus){
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
        
        
        function handleOpenMenuClick(e){
            const slideDowmMenu = document.querySelector('.mobile--menu');
            const closeMenu = document.querySelector('.nav-icon-opened');
            e.currentTarget.classList.add('hide');
            closeMenu.classList.remove('hide');
            slideDowmMenu.classList.remove('small--hide')
            
            
        
        }

        function handleCloseMenuClick(e){
            
            const slideUpMenu = document.querySelector('.mobile--menu');
            e.currentTarget.classList.add('hide');
            const openMenu = document.querySelector('.nav-icon-closed');
            openMenu.classList.remove('hide');
            slideUpMenu.classList.add('small--hide')
            
        }

        // open mobile menu
        function openMobileMenu(){
            const openMenu = document.querySelector('.nav-icon-closed');
            openMenu.addEventListener('click', handleOpenMenuClick, false);
           
        }

         //close mobile menu
         function closeMobileMenu(){
            const closeMenu = document.querySelector('.nav-icon-opened');
            closeMenu.addEventListener('click', handleCloseMenuClick, false);
           
        }
        //close mobile menu when a menu item is clicked
        function slideUpMenuOnMenuItemClick(){
            const openMenu = document.querySelector('.nav-icon-closed');
            const menuItems= document.querySelector('.mobile--menu');
            const closeMenu = document.querySelector('.nav-icon-opened');
            menuItems.classList.add('small--hide');
            closeMenu.classList.add('hide')
            openMenu.classList.remove('hide')
        }



