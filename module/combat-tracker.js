/**
 * A specialized form used to pop out the editor.
 * @extends {CombatTracker}
 *
 * OPTIONS:
 *
 *
 */

export default class QuestCombatTracker extends CombatTracker {
    static get defaultOptions() {
        return foundry.utils.mergeObject(super.defaultOptions, {
            id: "combat",
            template:
                "systems/foundryvtt-quest/templates/sidebar/combat-tracker.html",
            title: "Combat Tracker",
            scrollY: [".directory-list"]
        });
    }

    activateListeners(html) {
        super.activateListeners(html);

        html.find(".ct-item-hp").change((ev) => this._updateActor(ev));
        html.find(".ct-item-ap").change((ev) => this._updateActor(ev));
    }

    async _updateActor(ev) {
        ev.preventDefault();
        console.log(ev);
        const dataset = ev.currentTarget.dataset;
        console.log(dataset.combatantId);
        const combatant = game.combat.combatants.find(
            (c) => c.id == dataset.combatantId
        );
        console.log(combatant);
        const actor = combatant.actor;
        let target = ev.currentTarget;
        let value = ev.currentTarget.value;
        if (dataset.dtype == "Number") {
            value = Number(value);
            if (Number.isNaN(value)) {
                if (target.name == "data.hp")
                    ev.currentTarget.value = actor.data.data.hp;
                else if (target.name == "data.ap")
                    ev.currentTarget.value = actor.data.data.ap;

                return false;
            }
        }
        // Prepare update data for the actor.
        let updateData = {};
        updateData[target.name] = value;

        // Update the actor.
        actor.update(updateData);
        return;
    }

    /**
     * Handle a Combatant control toggle
     * @private
     * @param {Event} event   The originating mousedown event
     */
    async _onCombatantControl(event) {
        event.preventDefault();
        event.stopPropagation();
        const btn = event.currentTarget;
        const li = btn.closest(".combatant");
        const combat = this.viewed;
        const c = combat.combatants.get(li.dataset.combatantId);

        // Switch control action
        switch (btn.dataset.control) {
            case "toggleHidden":
                return c.update({ hidden: !c.hidden });

            // Toggle combatant defeated flag
            case "toggleDefeated":
                return this._onToggleDefeatedStatus(c);

            // Roll combatant initiative
            case "rollInitiative":
                let roll = new game.quest.QuestRoll("1d20");
                await roll.evaluate({ async: true });
                roll.toMessage({
                    user: game.user.id,
                    speaker: ChatMessage.getSpeaker({ actor: c.actor })
                });
                return true;
        }
    }

    async getData(options) {
        let context = await super.getData(options);
        context.groups = { character: [], npc: [] };
        context.difficulty = {
            character: 0,
            npc: 0,
            score: null,
            rating: null
        };
        for (let [i, combatant] of context.combat.turns.entries()) {
            let group = combatant.actor.data.type;
            let turn = context.turns[i];
            turn.css = turn.css.replace("active", "");
            turn.combatant = combatant;
            context.groups[group].push(turn);
            context.difficulty[group] += combatant.actor.data.data.hp;
        }
        context.difficulty.score = parseInt(
            (context.difficulty.npc / context.difficulty.character) * 100
        );
        if (context.difficulty.score > 80) {
            context.difficulty.rating = "QUEST.Deadly";
        } else if (context.difficulty.score > 50) {
            context.difficulty.rating = "QUEST.DeadlyFair";
        } else if (context.difficulty.score > 30) {
            context.difficulty.rating = "QUEST.Fair";
        } else {
            context.difficulty.rating = "QUEST.Easy";
        }

        console.log(context);
        return context;
    }

    firstOwner(doc) {
        /* null docs could mean an empty lookup, null docs are not owned by anyone */
        if (!doc) return false;

        const gmOwners = Object.entries(doc.data.permission)
            .filter(
                ([id, level]) =>
                    game.users.get(id)?.isGM &&
                    game.users.get(id)?.active &&
                    level === 3
            )
            .map(([id, level]) => id);
        const otherOwners = Object.entries(doc.data.permission)
            .filter(
                ([id, level]) =>
                    !game.users.get(id)?.isGM &&
                    game.users.get(id)?.active &&
                    level === 3
            )
            .map(([id, level]) => id);

        if (otherOwners.length > 0) return game.users.get(otherOwners[0]);
        else return game.users.get(gmOwners[0]);
    }

    isFirstOwner(doc) {
        //console.log(this.firstOwner(doc).id)
        return game.user.id === this.firstOwner(doc).id;
    }

    hasPlayerOwner(doc) {
        if (!doc) return false;

        const gmOwners = Object.entries(doc.data.permission)
            .filter(
                ([id, level]) =>
                    game.users.get(id)?.isGM &&
                    game.users.get(id)?.active &&
                    level === 3
            )
            .map(([id, level]) => id);
        const otherOwners = Object.entries(doc.data.permission)
            .filter(
                ([id, level]) =>
                    !game.users.get(id)?.isGM &&
                    game.users.get(id)?.active &&
                    level === 3
            )
            .map(([id, level]) => id);

        if (otherOwners.length > 0) return true;
        else return false;
    }
}
