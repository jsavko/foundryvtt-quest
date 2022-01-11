export class CompendiumImportHelper {
    static async findCompendium() {
        let QUESTAbilities = await game.packs.get("world.role-abilities");
        return !!QUESTAbilities;
    }

    static async getCompendium() {
        let QUESTAbilities = await game.packs.get("world.role-abilities");
        return QUESTAbilities;
    }

    static async getSystemCompendium() {
        return await game.packs.get("foundryvtt-quest.role-abilities");
    }

    static async createCompenium() {
        if ((await this.findCompendium()) == false) {
            ui.notifications.info(
                "Importing Role Abiltiies into an editable world compendium. This should only take a moment."
            );

            let systemCompendium = await this.getSystemCompendium();
            return systemCompendium.duplicateCompendium({
                label: "Role Abilities"
            });
        }
        return false;
    }
}
