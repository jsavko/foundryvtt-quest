import { EntitySheetHelper } from "./helper.js";

/**
 * Extend the base Actor document to support attributes and groups with a custom template creation dialog.
 * @extends {Actor}
 */
export class QuestActor extends Actor {
    /** @inheritdoc */
    prepareDerivedData() {
        super.prepareDerivedData();
        this.system.groups = this.system.groups || {};
        this.system.attributes = this.system.attributes || {};
    }

    prepareData() {
        super.prepareData();
        console.log("prep data");
        console.log(this);
        const actorData = this;

        if (this.type == "character") {
            this._prepareCharacterData(this);
        } else if (this.type == "npc") {
            this._prepareNPCData(this);
        }

        return this;
    }

    _prepareCharacterData(actorData) {
        console.log("prep char data");
        console.log(this);
        actorData.system.itemTypes = this.itemTypes;

        // Set abilities into paths
        let abilities = this.itemTypes.ability;

        let paths = {};
        for (let ability of abilities) {
            //console.log(ability.system.path);
            if (!!paths[ability.system.path] == false)
                paths[ability.system.path] = [];
            paths[ability.system.path].push(ability);
        }
        actorData.system.abilityTypes = paths;
        //console.log(actorData);
        return actorData;
        //mergeObject(actorData.system, this.itemTypes)
    }

    _prepareNPCData(actorData) {
        actorData.system.itemTypes = this.itemTypes;
        return actorData;
        //mergeObject(actorData.system, this.itemTypes)
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
                this.update({ items: details });
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
        const data = this.toObject(false);

        // Update the combat flags.
        if (game.combat && game.combat.combatants) {
            let combatant = game.combat.combatants.find(
                (c) => c.actor.id == this.id
            );
            if (combatant?.actor.isOwner) {
                let actionCount = combatant.flags["foundryvtt-quest"]
                    ? combatant.flags["foundryvtt-quest"].actionCount
                    : 0;
                actionCount = actionCount ? Number(actionCount) + 1 : 1;
                //console.log(actionCount);
                //console.log("update action Count!");
                await combatant.setFlag(
                    "foundryvtt-quest",
                    "actionCount",
                    actionCount
                );
            }
        }

        return data;
    }
}
