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
    }
}
