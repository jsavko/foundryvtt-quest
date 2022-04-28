/**
 * Acts as the primary API class to register role compendiums
 * @class
 */

export class QuestAPI {
    static async init() {
        this.register(
            game.settings.get("foundryvtt-quest", "abilityCompendium")
        );
        let sources = game.settings.get("foundryvtt-quest", "abilitySources");
        sources.forEach((sources) => {
            this.register(sources);
        });

        console.log("Loading Additional Sources");
        console.log(sources);

        Hooks.callAll("quest-registerRoles");
    }

    static async register(pack) {
        // Prevent registering an already registered pack
        const index = game.quest.AbilitySources.indexOf(pack);
        if (index == -1) {
            game.quest.AbilitySources.push(pack);
            ui.compendium.render();
        }
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
        let sources = game.settings.get("foundryvtt-quest", "abilitySources");
        if (index == -1) {
            this.register(pack);
            sources.push(pack);
            game.settings.set("foundryvtt-quest", "abilitySources", sources);
        } else {
            const sourceIndex = sources.indexOf(pack);
            if (sourceIndex > -1) {
                sources.splice(sourceIndex, 1);
                game.settings.set(
                    "foundryvtt-quest",
                    "abilitySources",
                    sources
                );
                this.unregister(pack);
            } else {
                ui.notifications.error(
                    "This compendium was activated by a module. Please disable the module to remove the abilities."
                );
            }
        }
    }
}
