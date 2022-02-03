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
            ui.notifications.info(game.i18n.localize("QUEST.ImportMessage"));

            let systemCompendium = await this.getSystemCompendium();
            return systemCompendium.duplicateCompendium({
                label: game.i18n.localize("QUEST.RoleAbilities")
            });
        }
        return false;
    }
}
