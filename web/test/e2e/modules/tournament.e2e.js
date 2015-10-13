'use strict';

var homeUrl = 'http://localhost:3000/';

var loginWith = function(name, passwd) {
    var loginLink = element(by.linkText('Login'));
    loginLink.click();
    element(by.model('username')).sendKeys(name);
    element(by.model('password')).sendKeys(passwd);
    element(by.buttonText('Login')).click();
};

var loginAndFail = function(name, passwd) {
    loginWith(name, passwd);
    expect(element(by.css('#login')).isDisplayed()).toBeTruthy();
};

var loginAndSucceed = function(name, passwd) {
    loginWith(name, passwd);
    //TODO: requires a fix for #30
    //expect(element(by.css('#login')).isDisplayed()).toBeFalsy();
    expect(element(by.linkText(name)).isDisplayed()).toBeTruthy();
};

var clickToCompetition = function(name, section) {
    element(by.buttonText(name)).click();
    element(by.partialLinkText(section)).click();
    expect(element(by.binding('competition.name')).getText()).toEqual(name + '/' + section);
};

describe('A tournament app user', function() {

    beforeEach(function() {
        browser.get(homeUrl);
    });

    it('should highlight a team\'s results when clicking in the table', function() {
        expect(browser.getTitle()).toEqual('Tournament App');
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


/*
 * Referee login and update results
 */
describe('A referee updating results', function() {
    var refEmail = 'referee@referee.org';

    beforeEach(function () {
        browser.get(homeUrl);
    });

    it('should fail to login when the ref uses the wrong password', function() {
        loginAndFail(refEmail, 'xxx');
    });

    it('should login when the ref uses the right password', function() {
        loginAndSucceed(refEmail, 'referee');
    });

});
