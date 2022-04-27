export class AbilityDialog extends Dialog {
    //static TEMPLATE = "systems/foundryvtt-quest/templates/role-ability.html";

    constructor(options) {
        super(options);
        this.data = {};
        this.data.title = options?.title ?? "Ability Browser";
        this.data.buttons = {
            close: { label: "Close", callback: () => {} }
        };
        this.data.default = "close";
    }

    /** @inheritdoc */
    static get defaultOptions() {
        return foundry.utils.mergeObject(super.defaultOptions, {
            template: `systems/foundryvtt-quest/templates/role-ability.html`,
            resizable: true,
            jQuery: true,
            width: "710",
            height: "760",
            close: () => {
                ui.notify;
            }
        });
    }

    static async getRollList() {
        let sourceCompendium = game.settings.get(
            "foundryvtt-quest",
            "abilityCompendium"
        );

        let AllAbilities = [];

        for (let i = 0; i < game.quest.AbilitySources.length; i++) {
            //console.log(game.quest.AbilitySources[i]);
            let QUESTAbilities = await game.packs.get(
                game.quest.AbilitySources[i]
            );
            let compendiumAbilities = await QUESTAbilities.getDocuments();
            AllAbilities = [].concat(AllAbilities, compendiumAbilities);
        }

        //const QUESTAbilities = await game.packs.get(sourceCompendium);
        //AllAbilities = await QUESTAbilities.getDocuments();
        const roleList = [
            ...new Set(AllAbilities.map((data) => data.data.data.role))
        ];
        return roleList;
    }

    async _getContent(role) {
        if (!role) role = "Spy";

        let AllAbilities = [];

        for (let i = 0; i < game.quest.AbilitySources.length; i++) {
            let QUESTAbilities = await game.packs.get(
                game.quest.AbilitySources[i]
            );
            let compendiumAbilities = await QUESTAbilities.getDocuments();
            AllAbilities = [].concat(AllAbilities, compendiumAbilities);
        }

        //const QUESTAbilities = await game.packs.get(sourceCompendium);
        //AllAbilities = await QUESTAbilities.getDocuments();
        const roleList = [
            ...new Set(AllAbilities.map((data) => data.data.data.role))
        ];

        let abilityList = AllAbilities.filter(
            (i) => i.data.type == "ability" && i.data.data.role === role
        );

        let quickStart = await abilityList.filter(
            (i) =>
                i.data.type == "ability" &&
                i.data.data.quickstart == true &&
                i.data.data.role === role
        );

        abilityList.sort((first, second) => {
            return (
                String(first.data.data.path).localeCompare(
                    second.data.data.path
                ) ||
                String(first.data.data.order).localeCompare(
                    second.data.data.order
                )
            );
        });

        let unGrouped = abilityList.reduce(function (r, a) {
            let keys = [];
            r[a.data.data.path] = r[a.data.data.path] || [];
            r[a.data.data.path].push(a);
            return r;
        }, Object.create(null));

        let groupedAbilitiies = [];
        for (let i = 0; i < Object.keys(unGrouped).length; i++) {
            let obj = {};
            obj.name = Object.keys(unGrouped)[i];
            obj.data = Object(unGrouped[Object.keys(unGrouped)[i]]);
            groupedAbilitiies.push(obj);
        }

        // Always put Legendary Last
        groupedAbilitiies.sort(function (a, b) {
            if (a.name == b.name) return 0;
            if (a.name == "Legendary") return 1;
            if (b.name == "Legendary") return -1;

            if (a.name < b.name) return -1;
            if (a.name > b.name) return 1;
            return 0;
        });

        let content = {
            role: role,
            abilities: groupedAbilitiies,
            quickStart: quickStart,
            roleList: roleList
        };

        return content;
    }

    static async showAbilityDialog(role) {
        let Dialog = new AbilityDialog();
        let content = await Dialog._getContent(role);
        Dialog.data.content = content;
        Dialog.Dialog = Dialog;
        Dialog.render(true);
    }

    async _updateContent(event) {
        let content = await this._getContent(event.currentTarget.value);
        this.Dialog.data.content = content;
        this.Dialog.render(true);
    }

    _scrollTo(event) {
        event.preventDefault();
        const header = event.currentTarget;
        // Get the target element.
        const target = header.dataset.target;
        $(".window-content").animate(
            {
                scrollTop:
                    $.find("#" + target)[0].offsetTop -
                    $.find("#" + target)[0].scrollHeight -
                    10
            },
            600
        );
    }
    activateListeners(html) {
        super.activateListeners(html);

        //html.find("#displayrole").on("change", this._updateContent.bind(this));
        html.find("#displayrole").change(this._updateContent.bind(this));
        html.find(".paths").click(this._scrollTo.bind(this));
    }
}
