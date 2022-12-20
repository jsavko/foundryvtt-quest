/**
 * Extend the base Item document to support attributes and groups with a custom template creation dialog.
 * @extends {Item}
 */
export class QuestItem extends Item {
    /** @inheritdoc */
    prepareDerivedData() {
        super.prepareDerivedData();
        this.system.groups = this.system.groups || {};
        this.system.attributes = this.system.attributes || {};
        if (this.type == "ability") {
            let tmp = String(this.system.description).toLowerCase();
            const rgx = new RegExp(
                `@(cost|Cost)\\[([^\\]]+)\\](?:{([^}]+)})?`,
                "g"
            );
            let CostArray = rgx.exec(tmp);
            this.system.cost = 0;
            if (!!CostArray) {
                this.system.cost = CostArray[2];
                var count = (tmp.match(/@cost/g) || []).length;
                if (count > 1) this.system.cost = CostArray[2] + "+";
            }
        }
    }

    /* -------------------------------------------- */
}
