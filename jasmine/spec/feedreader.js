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

        /* Validates if a string is a valid URL.  This function was adapted from an answer by zhailulu on Stack Overflow:
         * https://stackoverflow.com/questions/1701898/how-to-detect-whether-a-string-is-in-url-format-using-javascript
         */
        function validateUrl(string) {
            var strRegex = "^((https|http|ftp|rtsp|mms)?://)" +
                "?(([0-9a-z_!~*'().&=+$%-]+: )?[0-9a-z_!~*'().&=+$%-]+@)?" +
                "(([0-9]{1,3}\.){3}[0-9]{1,3}" +
                "|" +
                "([0-9a-z_!~*'()-]+\.)*" +
                "([0-9a-z][0-9a-z-]{0,61})?[0-9a-z]\." +
                "[a-z]{2,6})" +
                "(:[0-9]{1,4})?" +
                "((/?)|" +
                "(/[0-9a-z_!~*'().;?:@&=+$,%#-]+)+/?)$";
            var re = new RegExp(strRegex);
            return re.test(string);
        }

        /* DONE: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('have a URL', function() {
            for (var i = 0; i < allFeeds.length; i++) {
                expect(allFeeds[i].url).toBeDefined();
                // expect(allFeeds[i].url).not.toBe(0)
                expect(validateUrl(allFeeds[i].url)).toBe(true);
            }
        });

        /* DONE: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('have a name', function() {
            for (var i = 0; i < allFeeds.length; i++) {
                expect(allFeeds[i].name).toBeDefined();
                expect(allFeeds[i].name.length).not.toBe(0);
            }
        });
    });

    /* DONE: Write a new test suite named "The menu" */
    describe('The Menu', function() {
        /* DONE: Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
        it('is hidden by default', function() {
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });
        /* DONE: Write a test that ensures the menu changes
         * visibility when the menu icon is clicked. This test
         * should have two expectations: does the menu display when
         * clicked and does it hide when clicked again.
         */
        it('is visible when the menu icon is clicked', function() {
            $('.icon-list').trigger('click');
            expect($('body').hasClass('menu-hidden')).toBe(false);
        });

        it('is dismissed when the menu icon is clicked while the menu is visible', function() {
            $('.icon-list').trigger('click');
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });
    });
    /* DONE: Write a new test suite named "Initial Entries" */
    describe('Initial Entries', function() {
        /* DONE: Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
        beforeEach(function(done) {
            loadFeed(0, done);
        });

        it('displays at least one entry after the feed loads', function() {
            expect($('.feed .entry').length).toBeGreaterThan(0);
        });
    });
    /* DONE: Write a new test suite named "New Feed Selection" */
    describe('New Feed Selection', function() {
        /* DONE: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
        var originalTimeout,
            feed0,
            feed1;

        beforeAll(function(done) {
            // Changes Jasmine's default timeout interval (5 sec) to 10 sec.
            originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
            jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;

            loadFeed(0, function() {
                feed0 = $('.feed').html();
                done();
            });
        });

        beforeEach(function(done) {
            loadFeed(2, function() {
                feed1 = $('.feed').html();
                done();
            });
        });

        afterEach(function() {
            // Set's Jasmine's default timeout interval to its original value (i.e. 5sec).
            jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
        });

        it("changes the feed's content", function() {
            expect(feed0).toBeDefined();
            expect(feed1).toBeDefined();
            expect(feed0).not.toBe(feed1);
        });
    });
}());