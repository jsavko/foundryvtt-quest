/**
 * Acts as the primary API class to register role compendiums
 * @class
 */

export class QuestAPI {
    static async init() {
        this.register(
            game.settings.get("foundryvtt-quest", "abilityCompendium")
        );

        Hooks.callAll("quest-registerRoles");
    }

    static async register(pack) {
        game.quest.AbilitySources.push(pack);
        ui.compendium.render();
    }

    static async unregister(pack) {
        const index = game.quest.AbilitySources.indexOf(pack);
        if (index > -1) {
            game.quest.AbilitySources.splice(index, 1); // 2nd parameter means remove one item only
            ui.compendium.render();
        }
    }

    static async toggle(pack) {
        const index = game.quest.AbilitySources.indexOf(pack);
        if (index == -1) {
            this.register(pack);
        } else {
            this.unregister(pack);
        }
    }
}
