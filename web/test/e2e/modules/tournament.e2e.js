'use strict';

var homeUrl = 'http://localhost:3000/';
var loginDlg = element(by.id('login'));
var loginLink = element(by.id('loginLink'));
var userMenu = element(by.id('userMenu'));
var logoutLink = element(by.id('logoutLink'));
var pageAdminLink = element(by.partialLinkText('pages'));
var feedbackAdminLink = element(by.partialLinkText('feedback'));
var announcementsAdminLink = element(by.partialLinkText('announcement'));
var competitionAdminLink = element(by.partialLinkText('competition'));

var logout = function() {
    userMenu.click();
    logoutLink.click();
    expect(loginLink.isDisplayed()).toBeTruthy();
};

var loginWith = function(name, passwd) {
    //ensure logged out
    userMenu.isDisplayed().then(function(present) {
        if (present) {
            logout(name);
        }
        loginLink.click();
        element(by.model('username')).sendKeys(name);
        element(by.model('password')).sendKeys(passwd);
        element(by.buttonText('Login')).click();
    });
};

var loginAndFail = function(name, passwd) {
    loginWith(name, passwd);
    expect(loginDlg.isDisplayed()).toBeTruthy();
    loginDlg.sendKeys(protractor.Key.ESCAPE);
};

var loginAndSucceed = function(name, passwd) {
    loginWith(name, passwd);
    // TODO ----- requires a fix for #30 -----
    //expect(loginDlg.isDisplayed()).toBeFalsy();
    loginDlg.sendKeys(protractor.Key.ESCAPE);
    // ----- end -----
    expect(userMenu.isDisplayed()).toBeTruthy();
};

var clickToAdmin = function(name) {
    element(by.linkText(name)).click();
    element(by.linkText('Admin')).click();
    expect(competitionAdminLink.isDisplayed()).toBeTruthy();
    expect(announcementsAdminLink.isDisplayed()).toBeTruthy();
    expect(pageAdminLink.isDisplayed()).toBeTruthy();
    expect(feedbackAdminLink.isDisplayed()).toBeTruthy();
};

var clickToCompetition = function(name, section) {
    browser.get(homeUrl);
    element(by.buttonText(name)).click();
    element(by.partialLinkText(section)).click();
    expect(element(by.binding('competition.name')).getText()).toEqual(name + '/' + section);
};

var noCreatePage = function(email) {
    clickToAdmin(email);
    pageAdminLink.click();
    element(by.model('page.title')).sendKeys('Ref Title');
    element(by.model('page.body')).sendKeys('Ref Content');
    element(by.buttonText('Save Page')).click();

    element(by.id('pageEditButton')).click();
    element.all(by.repeater('p in pages')).reduce(function(acc, elem) {
        return elem.getText().then(function(text) {
            expect(text).not.toContain('Ref Title');
        });
    });

};

var noCreateAnnouncement = function(email) {
    clickToAdmin(email);
    announcementsAdminLink.click();
    element(by.model('news.title')).sendKeys('Ref Title');
    element(by.model('news.body')).sendKeys('Ref Content');
    element(by.buttonText('Create Announcement')).click();

    //TODO expect announcement not saved
};

var noViewFeedback = function(email) {
    clickToAdmin(email);
    feedbackAdminLink.click();
    // TODO
};

var noCreateCompetition = function(email) {
    clickToAdmin(email);
    competitionAdminLink.click();
    // TODO
};

var noEditResult = function() {
    // TODO
};

describe('A tournament app user', function() {

    it('should see the correct title in the browser', function() {
        browser.get(homeUrl);
        expect(browser.getTitle()).toEqual('Tournament App');
    });

    it('should highlight a team\'s results when clicking in the table', function() {
        browser.get(homeUrl);
        clickToCompetition('U11', 'A');
        var topTeam;
        var table = element.all(by.repeater('entry in group.table'));
        table.first().click();
        table.first().getText().then(function(text) {
            topTeam = text.toLowerCase();
            var hilited = element.all(by.css('td.team-highlight')).reduce(function(acc, elem) {
                return elem.getText().then(function(text) {
                    expect(topTeam).toContain(text.toLowerCase());
                });
            });
        });

        // clear the highlighting and check
        table.first().click();
        element.all(by.css('td.team-highlight')).then(function(allGames) {
            expect(allGames.length).toBe(0);
        });
    });

    it('should open the announcements page and filter announcements', function() {
        element(by.linkText('News & Social')).click();
        var newsItems = element.all(by.repeater('item in newsItems'));
        expect(newsItems.count()).toBeGreaterThan(1);
        element(by.model('searchBy')).sendKeys('Another');
        expect(newsItems.count()).toBe(1);
    });

    it('should be allowed to enter feedback', function() {
        var emailField = element(by.model('feedback.email'));
        var feedbackSubmitted= element(by.binding('feedbackSubmitted'));
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

    it('should fail to login always', function() {
        loginAndFail('user@user.org', 'user');
    });

});

describe('A referee using the app', function() {
    var email = 'referee@referee.org';
    var pwd = 'referee';

    it('should fail to login when the ref uses the wrong password', function() {
        loginAndFail(email, 'xxx');
    });

    it('should be allowed to edit and update a result', function() {
        clickToCompetition('U11', 'A');
        loginAndSucceed(email, pwd);
        // TODO update result
    });

    it('should not be allowed to view feedback', function() {
        loginAndSucceed(email, pwd);
        noViewFeedback(email);
    });

    it('should not be allowed to create a competition', function() {
        loginAndSucceed(email, pwd);
        noCreateCompetition(email);
    });

    it('should not be allowed to create an announcement', function() {
        loginAndSucceed(email, pwd);
        noCreateAnnouncement(email);
    });

    it('should not be allowed to create a CMS page', function() {
        loginAndSucceed(email, pwd);
        noCreatePage(email);
    });

});

describe('An editor using the app', function() {
    var email = 'editor@editor.org';
    var pwd = 'editor';

    it('should be allowed to modify CMS pages', function() {
        loginAndSucceed(email, pwd);
        clickToAdmin(email);
        pageAdminLink.click();
        element(by.model('page.title')).sendKeys('Editor Title');
        element(by.model('page.body')).sendKeys('Editor Content');
        element(by.buttonText('Save Page')).click();
        element(by.id('pageEditButton')).click();
        element.all(by.repeater('p in pages')).reduce(function(acc, elem) {
            return elem.getText().then(function(text) {
                expect(text).toContain('Editor Title');
            });
        });
    });

    it('should be allowed to create an announcement', function() {
        // TODO
    });

    it('should not be allowed to view feedback', function() {
        loginAndSucceed(email, pwd);
        noViewFeedback(email);
    });

    it('should not be allowed to create a competition', function() {
        loginAndSucceed(email, pwd);
        noCreateCompetition(email);
    });

});
