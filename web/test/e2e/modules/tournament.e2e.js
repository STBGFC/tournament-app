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
    var confirmTablePositionsButton = element(by.partialButtonText('CONFIRM TABLE POSITIONS'));
    var saveResultButton = element(by.partialButtonText('SAVE RESULT'));
    var deleteResultButton = element(by.partialButtonText('DELETE RESULT'));
    var newsAlert = element(by.id('newsalert'));
    var noEntry = element(by.id('fourOhThree'));

    var logout = function () {
        userMenu.click();
        logoutLink.click();
        expect(loginLink.isDisplayed()).toBeTruthy();
    };

    var loginWith = function (name, passwd) {
        //ensure logged out
        userMenu.isDisplayed().then(function (present) {
            if (present) {
                logout(name);
            }
            loginLink.click();
            element(by.model('username')).sendKeys(name);
            element(by.model('password')).sendKeys(passwd);
            element(by.buttonText('Login')).click();
        });
    };

    var loginAndFail = function (name, passwd) {
        loginWith(name, passwd);
        expect(loginDlg.isDisplayed()).toBeTruthy();
        loginDlg.sendKeys(protractor.Key.ESCAPE);
    };

    var loginAndSucceed = function (name, passwd) {
        loginWith(name, passwd);
        expect(loginDlg.isPresent()).toBeFalsy();
        expect(userMenu.isDisplayed()).toBeTruthy();
    };

    var assertForbidden = function() {
        expect(noEntry.isDisplayed()).toBeTruthy();
        browser.wait(protractor.ExpectedConditions.invisibilityOf(noEntry), 5000);
        expect(noEntry.isDisplayed()).toBeFalsy();
    };

    var clickToAdmin = function (name) {
        element(by.linkText(name)).click();
        element(by.linkText('Admin')).click();
        expect(competitionAdminLink.isDisplayed()).toBeTruthy();
        expect(announcementsAdminLink.isDisplayed()).toBeTruthy();
        expect(pageAdminLink.isDisplayed()).toBeTruthy();
        expect(feedbackAdminLink.isDisplayed()).toBeTruthy();
    };

    var clickToCompetition = function (name, section) {
        browser.get(homeUrl);
        element(by.buttonText(name)).click();
        element(by.partialLinkText(section)).click();
        expect(element(by.binding('competition.name')).getText()).toEqual(name + '/' + section);
    };

    var noCreatePage = function (email) {
        clickToAdmin(email);
        pageAdminLink.click();
        element(by.model('page.title')).sendKeys('Ref Title');
        element(by.model('page.body')).sendKeys('Ref Content');
        element(by.buttonText('Save Page')).click();
        assertForbidden();

        element(by.id('pageEditButton')).click();
        element.all(by.repeater('p in pages')).reduce(function (acc, elem) {
            return elem.getText().then(function (text) {
                expect(text).not.toContain('Ref Title');
            });
        });

    };

    var noCreateAnnouncement = function (email) {
        clickToAdmin(email);
        announcementsAdminLink.click();
        element(by.model('news.title')).sendKeys('Ref Title');
        element(by.model('news.body')).sendKeys('Ref Content');
        element(by.buttonText('Create Announcement')).click();
        assertForbidden();
        expect(newsAlert.isDisplayed()).toBeFalsy();
    };

    var noViewFeedback = function (email) {
        clickToAdmin(email);
        feedbackAdminLink.click();
        assertForbidden();
    };

    var noCreateCompetition = function (email) {
        clickToAdmin(email);
        competitionAdminLink.click();
        element(by.model('competition.name')).sendKeys('U99');
        element(by.model('competition.section')).sendKeys('Groups');
        element(by.model('competition.groups')).sendKeys('2');
        element(by.buttonText('Add Competition')).click();
        assertForbidden();
    };

    var noDeleteResult = function () {
        deleteResultButton.click();
        assertForbidden();
    };

    var noEditResult = function () {
        saveResultButton.click();
        assertForbidden();
    };

    var noConfirmTable = function () {
        confirmTablePositionsButton.click();
        assertForbidden();
    };

    describe('a normal user', function () {

        it('should see the correct title in the browser', function () {
            browser.get(homeUrl);
            expect(browser.getTitle()).toEqual('Tournament App');
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
        });

        describe('when logged in', function() {

            beforeEach(function() {
                loginAndSucceed(email, pwd);
            });

            it('should be allowed to edit and update a group result', function () {
                clickToCompetition('U11', 'A');
                // TODO update result
            });

            it('should be allowed to edit and update a result including penalties', function () {
                clickToCompetition('U11', 'A');
                // TODO update result
            });

            it('should not be allowed to delete a result', function () {
                clickToCompetition('U11', 'A');
                // TODO
                //noDeleteResult();
            });

            it('should not be allowed to confirm table positions', function () {
                clickToCompetition('U11', 'A');
                noConfirmTable();
            });

            it('should not be allowed to add a new fixture or result', function () {
                clickToCompetition('U11', 'A');
                // TODO
            });

            it('should not be allowed to view feedback', function () {
                noViewFeedback(email);
            });

            it('should not be allowed to create a competition', function () {
                noCreateCompetition(email);
            });

            it('should not be allowed to create an announcement', function () {
                noCreateAnnouncement(email);
            });

            it('should not be allowed to create a CMS page', function () {
                noCreatePage(email);
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

        it('should be allowed to modify CMS pages', function () {
            clickToAdmin(email);
            pageAdminLink.click();
            element(by.model('page.title')).sendKeys('Editor Title');
            element(by.model('page.body')).sendKeys('Editor Content');
            element(by.buttonText('Save Page')).click();
            element(by.id('pageEditButton')).click();
            element.all(by.repeater('p in pages')).reduce(function (acc, elem) {
                return elem.getText().then(function (text) {
                    expect(text).toBe('Editor Title');
                });
            });
        });

        it('should be allowed to create an announcement', function () {
            clickToAdmin(email);
            announcementsAdminLink.click();
            element(by.model('news.title')).sendKeys('Editor Announcement');
            element(by.model('news.body')).sendKeys('This is a new announcement');
            element(by.buttonText('Create Announcement')).click();
            expect(newsAlert.isDisplayed()).toBeTruthy();
            element(by.buttonText('OK')).click();
            browser.wait(protractor.ExpectedConditions.invisibilityOf(newsAlert), 5000);
            expect(newsAlert.isDisplayed()).toBeFalsy();
            element(by.linkText('News & Social')).click();
            var newsItems = element.all(by.repeater('item in newsItems'));
            expect(newsItems.count()).toBeGreaterThan(1);
            element(by.model('searchBy')).sendKeys('Editor Announcement');
            expect(newsItems.count()).toBeGreaterThan(0);
        });

        it('should be allowed to delete a result', function () {
            clickToCompetition('U11', 'A');
            // TODO
        });

        it('should be allowed to add a new fixture or result', function () {
            clickToCompetition('U11', 'A');
            // TODO
        });

        it('should not be allowed to view feedback', function () {
            noViewFeedback(email);
        });

        it('should not be allowed to create a competition', function () {
            noCreateCompetition(email);
        });

    });

    describe('an administrator', function() {
        var email = 'admin@admin.org';
        var pwd = 'admin';

        beforeEach(function() {
            loginAndSucceed(email, pwd);
        });

        it('should be allowed to confirm table positions', function () {
            clickToCompetition('U11', 'A');
            // TODO
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
            var items = element.all(by.repeater('item in feedbackItems'));
            clickToAdmin(email);
            feedbackAdminLink.click();
            expect(items.count()).toBeGreaterThan(1);
            element(by.model('searchBy')).sendKeys('Cool');
            expect(items.count()).toBe(1);
            element(by.model('searchBy')).sendKeys('ZWERtwetwerkjhweoitj');
            expect(items.count()).toBe(0);
        });

        it('should be allowed to delete feedback', function () {
            var items = element.all(by.repeater('item in feedbackItems'));
            clickToAdmin(email);
            feedbackAdminLink.click();
            // TODO
        });

    });

});
