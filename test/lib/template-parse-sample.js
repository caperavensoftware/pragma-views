export const templateSample =
{
    "type": "view",
    "fields": [
        {
            "field": "code",
            "map": "code"
        },
        {
            "field": "site-code",
            "map": "site_code"
        }
    ],
    "body": {
        "tabsheet": [
            {
                "id": "tabHeader",
                "title": "Header",
                "groups": [
                    {
                        "id": "group1",
                        "title": "Group 1",
                        "elements": [
                            {
                                "title": "Code",
                                "field": "code",
                                "element": "input",
                                "description": "max length of 50",
                                "attributes": {
                                    "type": "text",
                                    "data-lookup": "lookup"
                                }
                            },
                            {
                                "title": "Notes",
                                "field": "notes",
                                "element": "memo"
                            },
                            {
                                "title": "Site Code",
                                "field": "site-code",
                                "element": "container",
                                "styles": ["class1", "class2"]
                            }
                        ]
                    }
                ]
            },
            {
                "id": "tabDetails",
                "title": "Details",
                "groups": [
                    {
                        "id": "group2",
                        "title": "Details",
                        "elements": [
                            {
                                "element": "container",
                                "styles": ["layout-horizontal", "align-right"],
                                "attributes": {
                                  "data-model": "test"
                                },
                                "elements": [
                                    {
                                        "element": "button",
                                        "title": "click me",
                                        "action": "clickAction",
                                        "styles": "action-button",
                                        "attributes": {
                                            "data-id": "1"
                                        }
                                    },
                                    {
                                        "element": "button",
                                        "title": "click me 2",
                                        "action": "clickAction2"
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    }
};
