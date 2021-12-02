import { EntitySheetHelper } from "./helper.js";

/**
 * Extend the base Item document to support attributes and groups with a custom template creation dialog.
 * @extends {Item}
 */
export class QuestItem extends Item {
    /** @inheritdoc */
    prepareDerivedData() {
        super.prepareDerivedData();
        this.data.data.groups = this.data.data.groups || {};
        this.data.data.attributes = this.data.data.attributes || {};
        if (this.data.type == "ability") {
            let tmp = String(this.data.data.description).toLowerCase();
            const rgx = new RegExp(
                `@(cost|Cost)\\[([^\\]]+)\\](?:{([^}]+)})?`,
                "g"
            );
            let CostArray = rgx.exec(tmp);
            this.data.data.cost = 0;
            if (!!CostArray) {
                this.data.data.cost = CostArray[2];
                var count = (tmp.match(/@cost/g) || []).length;
                if (count > 1) this.data.data.cost = CostArray[2] + "+";
            }
        }
    }

    /* -------------------------------------------- */
}
