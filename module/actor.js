import { EntitySheetHelper } from "./helper.js";

/**
 * Extend the base Actor document to support attributes and groups with a custom template creation dialog.
 * @extends {Actor}
 */
export class QuestActor extends Actor {
    /** @inheritdoc */
    prepareDerivedData() {
        super.prepareDerivedData();
        this.data.data.groups = this.data.data.groups || {};
        this.data.data.attributes = this.data.data.attributes || {};
    }

    prepareData() {
        super.prepareData();
        const actorData = this.data;

        if (actorData.type == "character") {
            this._prepareCharacterData(this.data);
        } else if (actorData.type == "npc") {
            this._prepareNPCData(this.data);
        }

        return this.data;
    }

    _prepareCharacterData(actorData) {
        actorData.data.itemTypes = this.itemTypes;

        // Set abilities into paths
        let abilities = this.itemTypes.ability;

        let paths = {};
        for (let ability of abilities) {
            //console.log(ability.data.data.path);
            if (!!paths[ability.data.data.path] == false)
                paths[ability.data.data.path] = [];
            paths[ability.data.data.path].push(ability);
        }
        actorData.data.abilityTypes = paths;
        //console.log(actorData);
        return actorData;
        //mergeObject(actorData.data, this.itemTypes)
    }

    _prepareNPCData(actorData) {
        actorData.data.itemTypes = this.itemTypes;
        return actorData;
        //mergeObject(actorData.data, this.itemTypes)
    }

    async _preCreate(data, options, user) {
        await super._preCreate(data, options, user);
        //this.data.update({name: "Some other name"});
        //Create Abilities using localization
        if (data.type === "npc" && this.itemTypes.detail.length <= 0) {
            //Setup Abilities
            const details = [];
            let create_detail = [
                "what do they look like? (body / face / vibe)",
                "occupation / organizations",
                "special features / ideal / flaw",
                "what's something that they want?",
                "what is a problem that they have?",
                "what's something useful that they know?",
                "who are their friends?",
                "who are their adversaries?",
                "what's their biggest secret?",
                "what valuable things do they own?"
            ];

            if (Object(create_detail).length > 0) {
                for (let i of create_detail) {
                    details.push({
                        name: i,
                        type: "detail"
                    });
                }
                this.data.update({ items: details });
            }
        }
    }

    /* -------------------------------------------- */

    /** @override */
    //static async createDialog(data={}, options={}) {
    //  return EntitySheetHelper.createDialog.call(this, data, options);
    // }

    /* -------------------------------------------- */
    /*  Roll Data Preparation                       */
    /* -------------------------------------------- */

    /** @inheritdoc */
    async getRollData() {
        // Copy the actor's system data
        const data = this.toObject(false).data;

        // Update the combat flags.
        if (game.combat && game.combat.combatants) {
            let combatant = game.combat.combatants.find(
                (c) => c.actor.id == this.id
            );
            if (combatant) {
                let actionCount = combatant.data.flags["foundryvtt-quest"]
                    ? combatant.data.flags["foundryvtt-quest"].actionCount
                    : 0;
                actionCount = actionCount ? Number(actionCount) + 1 : 1;
                console.log(actionCount);
                console.log("update action Count!");
                combatant.setFlag(
                    "foundryvtt-quest",
                    "actionCount",
                    actionCount
                );
            }
        }

        return data;
    }
}
