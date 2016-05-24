'use strict';

describe('In the tournament app,', function() {

    var homeUrl = 'http://localhost:3000/';
    var loginDlg = element(by.id('login'));
    var loginLink = element(by.id('loginLink'));
    var userMenu = element(by.id('userMenu'));
    var logoutLink = element(by.id('logoutLink'));
    var pageAdminLink = element(by.partialLinkText('pages'));
    var feedbackAdminLink = element(by.partialLinkText('feedback'));
    var announcementsAdminLink = element(by.partialLinkText('announcement'));
    var competitionAdminLink = element(by.partialLinkText('competition'));
    var confirmTablePositionsButton = element.all(by.partialButtonText('CONFIRM TABLE POSITIONS')).first();
    var newsAlert = element(by.id('newsalert'));
    //var noEntry = element(by.id('fourOhThree'));
    var addResultButton = element.all(by.partialButtonText('ADD MATCH')).first();
    var saveResultButton = element.all(by.partialButtonText('SAVE MATCH')).first();
    var deleteResultButton = element(by.partialButtonText('DELETE RESULT'));
    var firstResult = element.all(by.repeater('result in results')).first();
    var bottomOfGroup = element.all(by.repeater('entry in group.table').row(4));

    var logout = function () {
        userMenu.click();
        logoutLink.click();
        expect(loginLink.isDisplayed()).toBeTruthy();
    };

    var login = function(name, passwd) {
        loginLink.click();
        element(by.model('username')).sendKeys(name);
        element(by.model('password')).sendKeys(passwd);
        element(by.buttonText('Login')).click();
    };

    var checkLoggedInOrLogin = function (name, passwd) {
        // already logged in?
        userMenu.isDisplayed().then(function (present) {
            if (present) {
                userMenu.getText().then(function (text) {
                    if (text !== name) {
                        logout();
                        login(name, passwd);
                    }
                });
            }
            else {
                login(name, passwd);
            }
        });
    };

    var loginAndFail = function (name, passwd) {
        checkLoggedInOrLogin(name, passwd);
        expect(loginDlg.isDisplayed()).toBeTruthy();
        loginDlg.sendKeys(protractor.Key.ESCAPE);
    };

    var loginAndSucceed = function (name, passwd) {
        checkLoggedInOrLogin(name, passwd);
        expect(loginDlg.isPresent()).toBeFalsy();
        expect(userMenu.isDisplayed()).toBeTruthy();
    };

    /*
    var assertForbidden = function() {
        expect(noEntry.isDisplayed()).toBeTruthy();
        browser.wait(protractor.ExpectedConditions.invisibilityOf(noEntry), 5000);
        expect(noEntry.isDisplayed()).toBeFalsy();
    };
    */

    var clickToAdmin = function (name) {
        element(by.linkText(name)).click();
        element(by.linkText('Admin')).click();
        expect(announcementsAdminLink.isDisplayed()).toBeTruthy();
        expect(feedbackAdminLink.isDisplayed()).toBeTruthy();
    };

    var clickToCompetition = function (name, section) {
        browser.get(homeUrl);
        element(by.buttonText(name)).click();
        element(by.partialLinkText(section)).click();
        expect(element(by.binding('competition.name')).getText()).toEqual(name + '/' + section);
        expect(browser.getTitle()).toEqual(name + '/' + section + ' - Tournament App');
    };

    var confirmTablePositions = function() {
        clickToCompetition('U11', 'A');
        confirmTablePositionsButton.click().then(function() {
            // cannot get it to see the updates directly
            browser.get(homeUrl);
            clickToCompetition('U11', 'A');
            expect(element.all(by.repeater('result in results').row(20)).getText()).toContain('PO1 1 Chelsea 5th Group 2');
        });
    };

    var viewFeedback = function (email) {
        var items = element.all(by.repeater('item in feedbackItems'));
        clickToAdmin(email);
        feedbackAdminLink.click();
        expect(items.count()).toBeGreaterThan(1);
        element(by.model('searchBy')).sendKeys('Cool');
        expect(items.count()).toBe(1);
        element(by.model('searchBy')).sendKeys('ZWERtwetwerkjhweoitj');
        expect(items.count()).toBe(0);
    };

    var createAnnouncement = function(email) {
        clickToAdmin(email);
        announcementsAdminLink.click();
        element(by.model('news.title')).sendKeys('Allowed Announcement');
        element(by.model('news.body')).sendKeys('This is a new announcement by ' + email);
        element(by.buttonText('Create Announcement')).click();
        expect(newsAlert.isDisplayed()).toBeTruthy();
        element(by.buttonText('OK')).click();
        browser.wait(protractor.ExpectedConditions.invisibilityOf(newsAlert), 5000);
        expect(newsAlert.isDisplayed()).toBeFalsy();
        element(by.linkText('News & Social')).click();
        var newsItems = element.all(by.repeater('item in newsItems'));
        expect(newsItems.count()).toBeGreaterThan(1);
        element(by.model('searchBy')).sendKeys(email);
        expect(newsItems.count()).toBe(1);
    };

    var addGroupGame = function() {
        addResultButton.click();
        element.all(by.model('newResult.tag')).first().sendKeys('1');
        element.all(by.model('newResult.pitch')).first().sendKeys('5');
        element.all(by.model('newResult.homeTeam')).first().sendKeys('Home');
        element.all(by.model('newResult.awayTeam')).first().sendKeys('Away');
        saveResultButton.click();
    };

    describe('a normal user', function () {

        it('should see the correct title in the browser', function () {
            browser.get(homeUrl);
            expect(browser.getTitle()).toEqual('Sandhurst 2016 - Tournament App');
            clickToCompetition('U8', 'All');
        });

        it('should highlight a team\'s results when clicking a row in the table', function () {
            browser.get(homeUrl);
            clickToCompetition('U11', 'A');
            var topTeam;
            var table = element.all(by.repeater('entry in group.table'));
            table.first().click();
            table.first().getText().then(function (text) {
                topTeam = text.toLowerCase();
                var hilited = element.all(by.css('td.team-highlight')).reduce(function (acc, elem) {
                    return elem.getText().then(function (text) {
                        expect(topTeam).toContain(text.toLowerCase());
                    });
                });
            });

            // clear the highlighting and check
            table.first().click();
            element.all(by.css('td.team-highlight')).then(function (allGames) {
                expect(allGames.length).toBe(0);
            });
        });

        it('should open the announcements page and filter announcements', function () {
            element(by.linkText('News & Social')).click();
            expect(browser.getTitle()).toEqual('News - Tournament App');
            var newsItems = element.all(by.repeater('item in newsItems'));
            expect(newsItems.count()).toBeGreaterThan(1);
            element(by.model('searchBy')).sendKeys('Another');
            expect(newsItems.count()).toBe(1);
        });

        it('should be allowed to enter feedback', function () {
            var emailField = element(by.model('feedback.email'));
            var feedbackSubmitted = element(by.binding('feedbackSubmitted'));
            var submitButton = element(by.buttonText('Submit'));
            var body = 'Nice browser test framework!';

            // invalid email address - submit disabled
            element(by.linkText('Feedback')).click();
            expect(browser.getTitle()).toEqual('Feedback - Tournament App');
            emailField.sendKeys('not-valid-email-address');
            element(by.model('feedback.body')).sendKeys(body);
            expect(submitButton.isEnabled()).toBe(false);

            // fix it..
            emailField.clear();
            emailField.sendKeys('valid@example.org');
            submitButton.click();
            expect(feedbackSubmitted.getText()).toBe(body);
        });

        it('should fail to login always', function () {
            loginAndFail('user@user.org', 'user');
        });

    });

    describe('a referee', function () {
        var email = 'referee@referee.org';
        var pwd = 'referee';

        it('should fail to login when entering the wrong password', function () {
            browser.get(homeUrl);
            loginAndFail(email, 'xxx');
            browser.get(homeUrl);
        });

        describe('when logged in', function() {

            var score = element(by.binding('result.homeGoals')); // includes everything in the surrounding <span/>
            var homeTeamInput = element(by.model('result.homeTeam'));
            var awayTeamInput = element(by.model('result.awayTeam'));
            var addHomeGoalButton = element(by.id('addHomeGoal'));
            var subHomeGoalButton = element(by.id('subHomeGoal'));
            var addAwayGoalButton = element(by.id('addAwayGoal'));
            var subAwayGoalButton = element(by.id('subAwayGoal'));
            var saveResultButton = element(by.partialButtonText('SAVE RESULT'));
            var deleteResultButton = element(by.partialButtonText('DELETE RESULT'));

            beforeEach(function() {
                loginAndSucceed(email, pwd);
            });

            it('should not be allowed to delete a result', function () {
                clickToCompetition('U11', 'A');
                firstResult.$('a').click();
                expect(deleteResultButton.isDisplayed()).toBeFalsy();
            });

            it('should not be allowed to confirm table positions', function () {
                clickToCompetition('U11', 'A');
                expect(confirmTablePositionsButton.isDisplayed()).toBeFalsy();
            });

            it('should not be allowed to add a new fixture or result', function () {
                clickToCompetition('U11', 'A');
                expect(addResultButton.isDisplayed()).toBeFalsy();
            });

            it('should not be allowed to access admin screens', function () {
                expect(element(by.linkText('Admin')).isPresent()).toBeFalsy();
            });

            it('should be allowed to edit and update a group result', function () {
                clickToCompetition('U11', 'A');
                expect(bottomOfGroup.getText()).toContain('Liverpool 4 1 0 3 4 8 3');
                expect(firstResult.getText()).toContain('Arsenal 2 1 Liverpool');
                firstResult.$('a').click();
                expect(element(by.css('h5.text-center')).getText()).toEqual('Age U11 | Section A | Group 1 | Match 1 | Pitch 1');
                expect(homeTeamInput.getAttribute('value')).toEqual('Arsenal');
                expect(awayTeamInput.getAttribute('value')).toEqual('Liverpool');
                expect(score.getText()).toEqual('2 - 1');
                subHomeGoalButton.click();
                addAwayGoalButton.click();
                expect(score.getText()).toEqual('1 - 2');
                saveResultButton.click();
                clickToCompetition('U11', 'A');
                expect(bottomOfGroup.getText()).toContain('Arsenal 4 0 3 1 4 5 3');
            });

            /* something in this test is causing a memory leak on my machine.. */
            xit('should return to the same group in the competition after updating a result', function() {
                clickToCompetition('U11', 'A');
                element(by.linkText('2')).click();
                var lastGame = element.all(by.repeater('result in results').row(20));
                lastGame.first().$('a').click();
                expect(element(by.css('h4.text-center')).getText()).toEqual('Age U11 | Section A | Group 2 | Match 1 | Pitch 1');
                subHomeGoalButton.click();
                addAwayGoalButton.click();
                saveResultButton.click();
                expect(element(by.css('li.active'))).toBe(2);
            });

            it('should be allowed to edit and update a result including penalties', function () {
                clickToCompetition('U11', 'A');
                // SF1
                var sf1 = element.all(by.repeater('result in results').row(26));
                sf1.first().$('a').click();
                addHomeGoalButton.click();
                addAwayGoalButton.click();
                element(by.linkText('Pens')).click();
                addHomeGoalButton.click();
                addAwayGoalButton.click();
                subAwayGoalButton.click();
                expect(score.getText()).toEqual('1 (1) - (0) 1');
                saveResultButton.click();
            });

        });

    });

    describe('an editor', function () {
        var email = 'editor@editor.org';
        var pwd = 'editor';

        beforeEach(function() {
            browser.get(homeUrl);
            loginAndSucceed(email, pwd);
        });

        it('should not be allowed to delete a result', function () {
            clickToCompetition('U11', 'A');
            firstResult.$('a').click();
            expect(deleteResultButton.isDisplayed()).toBeFalsy();
        });

        it('should not be allowed to create a CMS page', function () {
            clickToAdmin(email);
            expect(pageAdminLink.isPresent()).toBeFalsy();
        });

        it('should not be allowed to create a competition', function () {
            clickToAdmin(email);
            expect(competitionAdminLink.isPresent()).toBeFalsy();
        });

        it('should be allowed to create an announcement', function () {
            createAnnouncement(email);
        });

        it('should be allowed to view and filter feedback', function () {
            viewFeedback(email);
        });

        it('should be allowed to confirm table positions', function () {
            confirmTablePositions();
        });

        it('should be allowed to add a new fixture or result', function () {
            clickToCompetition('U11', 'A');
            addGroupGame();
            expect(element.all(by.repeater('result in results')).count()).toBe(30); // includes 2 groups and KO section
            expect(element.all(by.repeater('result in results').row(10)).getText()).toContain('1 5 Home Away');
        });

    });

    describe('an administrator', function() {
        var email = 'admin@admin.org';
        var pwd = 'admin';

        beforeEach(function() {
            loginAndSucceed(email, pwd);
        });

        it('should be allowed to confirm table positions', function () {
            confirmTablePositions();
        });

        it('should be allowed to create an announcement', function () {
            createAnnouncement(email);
        });

        it('should be allowed to create a competition', function () {
            clickToAdmin(email);
            competitionAdminLink.click();
            element(by.model('competition.name')).sendKeys('U99');
            element(by.model('competition.section')).sendKeys('Groups');
            element(by.model('competition.groups')).sendKeys('2');
            element(by.buttonText('Add Competition')).click();
            browser.get(homeUrl);
            expect(element(by.partialButtonText('U99')).isPresent()).toBeTruthy();
        });

        it('should be allowed to view and filter feedback', function () {
            viewFeedback(email);
        });

        it('should be allowed to modify CMS pages', function () {
            clickToAdmin(email);
            pageAdminLink.click();
            element(by.model('page.title')).sendKeys('Allowed Title');
            element(by.model('page.body')).sendKeys('#Allowed Content');
            element(by.buttonText('Save Page')).click();
            element(by.id('pageEditButton')).click();
            element.all(by.repeater('p in pages')).reduce(function (acc, elem) {
                return elem.getText().then(function (text) {
                    expect(text).toBe('Allowed Title');
                });
            });
        });

        it('should be allowed to add a new fixture or result', function () {
            clickToCompetition('U11', 'A');
            addGroupGame();
            expect(element.all(by.repeater('result in results')).count()).toBe(31); // includes 2 groups and KO section
            expect(element.all(by.repeater('result in results').row(10)).getText()).toContain('1 5 Home Away');
        });

        it('should be allowed to delete a result', function () {
            clickToCompetition('U11', 'A');
            expect(firstResult.getText()).toContain('Arsenal 1 2 Liverpool');
            firstResult.$('a').click();
            deleteResultButton.click().then(function() {
                // cannot get it to see the updates directly
                browser.get(homeUrl);
                clickToCompetition('U11', 'A');
                var newFirstResult = element.all(by.repeater('result in results')).first();
                var newBottomOfGroup = element.all(by.repeater('entry in group.table').row(4));
                expect(newFirstResult.getText()).toContain('Chelsea 0 1 Man. Utd.');
                expect(newBottomOfGroup.getText()).toContain('Liverpool 3 1 0 2 3 6 3');
            });
        });

        it('should be allowed to delete feedback', function () {
            var items = element.all(by.repeater('item in feedbackItems'));
            clickToAdmin(email);
            feedbackAdminLink.click();
            // TODO
        });

    });

});
