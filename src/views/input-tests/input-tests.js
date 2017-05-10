import {inject, bindable} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import {DialogService} from 'aurelia-dialog';
import {DynamicDialog} from './../../dialogs/dynamic-dialog/dynamic-dialog';
import {DynamicSchemaItem, DynamicSchemaFieldItem, DynamicSchemaCollectionItem, DynamicSchemaReadonlyItem} from '../../lib/dynamic-schema';

@inject(EventAggregator, DialogService)
export class InputTests {
    @bindable testMenuItems;
    @bindable toolbarItems;

    constructor(eventAggregator, dialogService) {
        this.eventAggregator = eventAggregator;
        this.dialogService = dialogService;

        this.testMenuItems = [
            {
                iconName: "input",
                title: "input"
            },
            {
                iconName: "back",
                title: "back"
            },
            {
                iconName: "dropdown",
                title: "dropdown"
            }
        ];

        this.toolbarItems = [
            {
                iconName: "search",
                title: "search"
            },
            {
                iconName: "leftarrow",
                title: "left arrow"
            },
            {
                iconName: "printer",
                title: "printer"
            }
        ]
    }

    attached() {
        this.eventAggregator.publish("messages-setContextView", {
            view: '<button click.delegate="save()">Save</button>',
            viewModel: this
        })
    }

    save() {
        alert("save");
    }

    showErrors(){
        document.querySelector("pragma-messages").au["pragma-messages"].viewModel.isOpen = true;
    }

    showDialog() {
        const  schema = {
            title: "Test dynamic dialog",
            details: [
                new DynamicSchemaItem("Name", "name", new DynamicSchemaFieldItem("string", "50")),
                new DynamicSchemaItem("Age", "age", new DynamicSchemaFieldItem("number", "0-100")),
                new DynamicSchemaItem("Birth Date", "birthDate", new DynamicSchemaFieldItem("date")),
                new DynamicSchemaItem("Description", "description", new DynamicSchemaFieldItem("string", "500")),
                new DynamicSchemaItem("Duration", "duration", new DynamicSchemaFieldItem("duration")),
                new DynamicSchemaItem("Status", "status", new DynamicSchemaCollectionItem("statuses")),
                new DynamicSchemaItem("Status Value", "status", new DynamicSchemaReadonlyItem()),
            ],
            model: {
                name: "",
                age: 0,
                birthDate: Date.now(),
                description: "",
                duration: "10:11:12",
                status: 2,
                statuses: [
                    {
                        id: 0,
                        text: "In Progress"
                    },
                    {
                        id: 1,
                        text: "Approved"
                    },
                    {
                        id: 2,
                        text: "Awaiting Approval"
                    },
                    {
                        id: 3,
                        text: "Canceled"
                    },
                    {
                        id: 4,
                        text: "Closed"
                    }
                ]
            }
        };

        this.dialogService.open({viewModel: DynamicDialog, model: schema})
            .whenClosed(resposne => {
                if (!resposne.wasCancelled) {
                    console.log(schema);
                }
            });
    }
}
