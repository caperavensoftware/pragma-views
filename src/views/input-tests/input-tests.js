import {inject, bindable} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import {DialogService} from 'aurelia-dialog';
import {DynamicDialog} from './../../dialogs/dynamic-dialog/dynamic-dialog';
import {DynamicDialogSchemaItem, DynamicDialogStaticItemType, DynamicDialogCollectionItem} from './../../dialogs/dynamic-dialog/dynamic-dialog-schema';

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
                new DynamicDialogSchemaItem("Name", "name", new DynamicDialogStaticItemType("string", "50")),
                new DynamicDialogSchemaItem("Age", "age", new DynamicDialogStaticItemType("number", "0-100")),
                new DynamicDialogSchemaItem("Birth Date", "birthDate", new DynamicDialogStaticItemType("date")),
                new DynamicDialogSchemaItem("Description", "description", new DynamicDialogStaticItemType("string", "500")),
                new DynamicDialogSchemaItem("Duration", "duration", new DynamicDialogStaticItemType("duration")),
                new DynamicDialogSchemaItem("Status", "status", new DynamicDialogCollectionItem("statuses")),
            ],
            model: {
                name: "",
                age: 0,
                birthDate: Date.now(),
                description: "",
                duration: "10:11:12",
                status: "Awaiting Approval",
                statuses: [
                    "In Progress",
                    "Approved",
                    "Awaiting Approval",
                    "Canceled",
                    "Closed"
                ]
            }
        };

        this.dialogService.open({viewModel: DynamicDialog, model: schema})
            .whenClosed(resposne => {
                if (!resposne.wasCancelled) {

                }
            });
    }
}
