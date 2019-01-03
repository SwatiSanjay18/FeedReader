/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        //This test loops through each feed in the allFeeds object 
        //and ensures that the URL is defined and not empty.
        it('url defined and not empty',function(){
            for(feed of allFeeds){
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
            }
         }); 


        //This test loops through each feed in the allFeeds object 
        //and ensures that the URL is defined and not empty.     
         it('name defined and not empty',function(){
            for(feed of allFeeds){
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0);
            }
         });
    });

    //test suite "The Menu"
    describe('The Menu',function(){

        //This test ensures that the menu is hidden by default
        it('the menu is hidden by default',function(){
            var element = document.getElementsByTagName('body')[0];
            expect(element.classList.contains('menu-hidden')).toBe(true);
        });

        //this test ensures that the menu changes visibility on click
        it('the menu changes visibility on click',function(){
            const body = document.getElementsByTagName('body')[0];
            const menu = document.getElementsByClassName('menu-icon-link')[0];
            menu.click();
            expect(body.classList.contains('menu-hidden')).toBe(false);
            menu.click();
            expect(body.classList.contains('menu-hidden')).toBe(true);
         });       
    });

    //test suite "Initial Entries"
    describe('Initial Entries',function(){

        //loadFeed function is complete before the test
        beforeEach(function(done){
            loadFeed(0,done);
        });

        //the test ensures that the feed container has atleast one element
        it('the feed container has atleast one entry',function(done){            
            const feedChildren = document.querySelectorAll('.feed .entry-link .entry ');
            expect(feedChildren.length > 0).toBe(true);
            done();
        });
    });

    //test suite "New Feed Selection"
    describe('New Feed Selection',function(){
        const feed = document.querySelector('.feed');   
        const firstFeedArr = [];

        //loadFeed function called twice before test
        beforeEach(function(done){
            loadFeed(0,function(){

                Array.from(feed.children).forEach(function(entry){
                 firstFeedArr.push(entry.innerText);
                });

                loadFeed(1,function(){
                    done();
                });
            });
        });

        //the test ensures that the content changes when a feed is loaded
        it('the content changes when a new feed is loaded',function(done){ 
            Array.from(feed.children).forEach(function(entry,index){
                expect((firstFeedArr[index] === entry.innerText)).toBe(false);
            });            
            done();
        });
    });       
}());
