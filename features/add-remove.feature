@test
Feature: I browse heroku app

  Background: 
    I am on the add/remove page

  @unstable
  Scenario: I can delete Delete Buttons
    When I click Add Button 3 times
    And I click Delete 3 times
    Then I have no Delete Buttons

  Scenario: I can click Add Button
    When I click Add Button 3 times
    Then I have 3 Delete Buttons
