/**
 * Extend the basic ItemSheet with some very simple modifications
 * @extends {ItemSheet}
 */
export class QuestItemSheet extends ItemSheet {
    /** @inheritdoc */
    static get defaultOptions() {
        return foundry.utils.mergeObject(super.defaultOptions, {
            classes: ["quest", "sheet", "item"],
            template: "systems/foundryvtt-quest/templates/item-sheet.html",
            width: 520,
            height: 480,
            tabs: [
                {
                    navSelector: ".sheet-tabs",
                    contentSelector: ".sheet-body",
                    initial: "description"
                }
            ]
        });
    }

    /* -------------------------------------------- */

    /** @inheritdoc */
    getData() {
        const context = super.getData();
        console.log(context);
        return context;
    }

    /* -------------------------------------------- */

    /** @inheritdoc */
    activateListeners(html) {
        super.activateListeners(html);

        // Everything below here is only needed if the sheet is editable
        if (!this.isEditable) return;

        // Add draggable for Macro creation
        html.find(".attributes a.attribute-roll").each((i, a) => {
            a.setAttribute("draggable", true);
            a.addEventListener(
                "dragstart",
                (ev) => {
                    let dragData = ev.currentTarget.dataset;
                    ev.dataTransfer.setData(
                        "text/plain",
                        JSON.stringify(dragData)
                    );
                },
                false
            );
        });
    }

    /* -------------------------------------------- */

    /** @override */
    _getSubmitData(updateData) {
        let formData = super._getSubmitData(updateData);
        console.log(formData);
        return formData;
    }
}
