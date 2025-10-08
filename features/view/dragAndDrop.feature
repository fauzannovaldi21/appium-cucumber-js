Feature: Verify view

    Scenario: As a User, I can verify cancelled drag and drop  sub-menu Drag and Drop in menu Views
    Given I open menu Views in dashboard
    When I open sub-menu Drag and Drop
    And I cancelled drag element dot 1 to dot 1
    Then I verify text after cancelled drag element

    Scenario: As a User, I can verify successfully drag and drop sub-menu Drag and Drop in menu Views
    Given I open menu Views in dashboard
    When I open sub-menu Drag and Drop
    And I complete drag element dot 3 to dot 1
    Then I verify text after success drag element
    
    Scenario: As a User, I can verify holding drag and drop sub-menu Drag and Drop in menu Views
    Given I open menu Views in dashboard
    When I open sub-menu Drag and Drop
    And I hold drag element dot 1 to dot 1
    Then I verify text after holding drag element