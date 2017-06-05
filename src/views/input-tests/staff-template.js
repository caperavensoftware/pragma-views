export const staffTemplate =
{
    "type": "view",
    "fields": [
        {
            "field": "id",
            "map": "id"
        },
        {
            "field": "code",
            "map": "code"
        },
        {
            "field": "description",
            "map": "description"
        },
        {
            "field": "firstName",
            "map": "firstName"
        },
        {
            "field": "lastName",
            "map": "lastName"
        },
        {
            "field": "siteCode",
            "map": "siteCode"
        },
        {
            "field": "isActive",
            "map": "siteCode"
        },
        {
            "field": "siteCode",
            "map": "siteCode"
        },
        {
            "field": "siteDescription",
            "map": "siteDescription"
        },
        {
            "field": "initials",
            "map": "initials"
        },
        {
            "field": "firstName",
            "map": "firstName"
        },
        {
            "field": "lastName",
            "map": "lastName"
        },
        {
            "field": "jobTitle",
            "map": "jobTitle"
        },
        {
            "field": "postNumber",
            "map": "postNumber"
        },
        {
            "field": "personnelNumber",
            "map": "personnelNumber"
        },
        {
            "field": "phone",
            "map": "phone"
        },
        {
            "field": "mobile",
            "map": "mobile"
        },
        {
            "field": "email",
            "map": "email"
        },
        {
            "field": "address1",
            "map": "address1"
        },
        {
            "field": "address2",
            "map": "address2"
        },
        {
            "field": "address3",
            "map": "address3"
        },
        {
            "field": "sectionCode",
            "map": "sectionCode"
        },
        {
            "field": "sectionDescription",
            "map": "sectionDescription"
        },
        {
            "field": "tradeCode",
            "map": "tradeCode"
        },
        {
            "field": "tradeDescription",
            "map": "tradeDescription"
        },
        {
            "field": "costElementCode",
            "map": "costElementCode"
        },
        {
            "field": "costElementDescription",
            "map": "costElementDescription"
        },
        {
            "field": "calendarCode",
            "map": "calendarCode"
        },
        {
            "field": "calendarDescription",
            "map": "calendarDescription"
        },
        {
            "field": "currencyCode",
            "map": "currencyCode"
        },
        {
            "field": "currencyDescription",
            "map": "currencyDescription"
        },
        {
            "field": "normalTime",
            "map": "normalTime"
        },
        {
            "field": "overtime1",
            "map": "overtime1"
        },
        {
            "field": "overtime2",
            "map": "overtime2"
        },
        {
            "field": "overtime3",
            "map": "overtime3"
        },
        {
            "field": "emailOnApprovedWO",
            "map": "emailOnApprovedWO"
        },
        {
            "field": "smsOnApprovedWO",
            "map": "smsOnApprovedWO"
        },
        {
            "field": "smsForCriticalAsset",
            "map": "smsForCriticalAsset"
        },
    ],
    "body": {
        "elements": [
            {
                "element": "h1",
                "content": "Header",
                "styles": ["group-header"]
            },
            {
                "element": "group",
                "id": "headerGroup",
                "title": "Header Information",
                "elements": [
                    {
                        "title": "Code",
                        "field": "code",
                        "element": "input",
                        "attributes": {
                            "type": "text"
                        }
                    },
                    {
                        "title": "Description",
                        "field": "description",
                        "element": "input",
                        "attributes": {
                            "type": "text"
                        }
                    },
                    {
                        "element": "select",
                        "title": "Site",
                        "field": "siteId",
                        "datasource": "../sites",
                        "optionField": "code",
                        "required": true,
                        "attributes": {
                            "type": "text"
                        }
                    }
                ]
            },
            {
                "element": "h1",
                "content": "Personal Info",
                "styles": ["group-header"]
            },
            {
                "element": "group",
                "id": "personalGroup",
                "title": "Personal Information",
                "elements": [
                    {
                        "title": "Initials",
                        "field": "initials",
                        "element": "input",
                        "attributes": {
                            "type": "text"
                        }
                    },
                    {
                        "title": "First name",
                        "field": "firstName",
                        "required": true,
                        "element": "input",
                        "attributes": {
                            "type": "text"
                        }
                    },
                    {
                        "title": "Last name",
                        "field": "lastName",
                        "required": true,
                        "element": "input",
                        "attributes": {
                            "type": "text"
                        }
                    },
                    {
                        "title": "Job title",
                        "field": "jobTitle",
                        "element": "input",
                        "attributes": {
                            "type": "text"
                        }
                    },
                    {
                        "title": "Post number",
                        "field": "postNumber",
                        "element": "input",
                        "attributes": {
                            "type": "number"
                        }
                    },
                    {
                        "title": "Personnel number",
                        "field": "personnelNumber",
                        "element": "input",
                        "attributes": {
                            "type": "number"
                        }
                    }
                ]
            },
            {
                "element": "group",
                "id": "contactGroup",
                "title": "Contact Information",
                "elements": [
                    {
                        "title": "Phone",
                        "field": "phone",
                        "element": "input",
                        "attributes": {
                            "type": "number"
                        }
                    },
                    {
                        "title": "Mobile",
                        "field": "mobile",
                        "element": "input",
                        "attributes": {
                            "type": "number"
                        }
                    },
                    {
                        "title": "Email",
                        "field": "email",
                        "element": "input",
                        "attributes": {
                            "type": "email"
                        }
                    },
                    {
                        "title": "Address 1",
                        "field": "address1",
                        "element": "input",
                        "attributes": {
                            "type": "text"
                        }
                    },
                    {
                        "title": "Address 2",
                        "field": "address2",
                        "element": "input",
                        "attributes": {
                            "type": "text"
                        }
                    },
                    {
                        "title": "Address 3",
                        "field": "address3",
                        "element": "input",
                        "attributes": {
                            "type": "text"
                        }
                    }
                ]
            },
            {
                "element": "h1",
                "content": "Maintenance Manager",
                "styles": ["group-header"]
            },
            {
                "element": "group",
                "id": "maintenanceGroup",
                "title": "Maintenance",
                "elements": [
                    {
                        "title": "Section",
                        "field": "sectionCode",
                        "description": "${sectionDescription}",
                        "element": "input",
                        "attributes": {
                            "type": "text"
                        }
                    },
                    {
                        "title": "Trade",
                        "field": "tradeCode",
                        "description": "${tradeDescription}",
                        "element": "input",
                        "attributes": {
                            "type": "text"
                        }
                    },
                    {
                        "title": "Cost element",
                        "field": "costElementCode",
                        "description": "${costElementDescription}",
                        "element": "input",
                        "attributes": {
                            "type": "text"
                        }
                    },
                    {
                        "title": "Calendar",
                        "field": "calendarCode",
                        "description": "${calendarDescription}",
                        "element": "input",
                        "attributes": {
                            "type": "text"
                        }
                    }
                ]
            },
            {
                "element": "group",
                "id": "ratesGroup",
                "title": "Rates per hour",
                "elements": [
                    {
                        "title": "Site currency",
                        "field": "currencyCode",
                        "description": "${currencyDescription}",
                        "element": "input",
                        "attributes": {
                            "type": "text"
                        }
                    },
                    {
                        "title": "Normal time",
                        "field": "normalTime",
                        "element": "input",
                        "attributes": {
                            "type": "number"
                        }
                    },
                    {
                        "title": "Overtime 1",
                        "field": "overtime1",
                        "element": "input",
                        "attributes": {
                            "type": "number"
                        }
                    },
                    {
                        "title": "Overtime 2",
                        "field": "overtime2",
                        "element": "input",
                        "attributes": {
                            "type": "number"
                        }
                    },
                    {
                        "title": "Overtime 3",
                        "field": "overtime3",
                        "element": "input",
                        "attributes": {
                            "type": "number"
                        }
                    }
                ]
            },
            {
                "element": "group",
                "id": "notificationsGroup",
                "title": "Notifications",
                "elements": [
                    {
                        "element": "checkbox",
                        "title": "Email on Work Order Approval",
                        "field": "emailOnApprovedWO",
                    },
                    {
                        "element": "checkbox",
                        "title": "SMS on Work Order Approval",
                        "field": "smsOnApprovedWO"
                    },
                    {
                        "element": "checkbox",
                        "title": "SMS for Critical Assets only",
                        "field": "smsForCriticalAsset"
                    }
                ]
            }
        ]
    }
};