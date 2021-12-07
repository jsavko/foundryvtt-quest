export class AbilityDialog extends Dialog {
    //static TEMPLATE = "systems/quest/templates/role-ability.html";

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
            template: `systems/quest/templates/role-ability.html`,
            resizable: true,
            jQuery: true,
            width: "710",
            height: "760",
            close: () => {
                ui.notify;
            }
        });
    }

    _getContent(role) {
        if (!role) role = "Spy";

        let AllAbilities = game.items.filter((i) => i.data.type == "ability");
        const roleList = [
            ...new Set(AllAbilities.map((data) => data.data.data.role))
        ];

        let abilityList = game.items.filter(
            (i) => i.data.type == "ability" && i.data.data.role === role
        );

        let quickStart = game.items.filter(
            (i) =>
                i.data.type == "ability" &&
                i.data.data.quickstart == true &&
                i.data.data.role === role
        );

        abilityList.sort((first, second) => {
            return (
                first.data.data.path.localeCompare(second.data.data.path) ||
                first.data.data.order.localeCompare(second.data.data.order)
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

    static showAbilityDialog(role) {
        let Dialog = new AbilityDialog();
        let content = Dialog._getContent(role);
        Dialog.data.content = content;
        Dialog.Dialog = Dialog;
        Dialog.render(true);
    }

    _updateContent(event) {
        console.log(event.currentTarget.value);
        let content = this._getContent(event.currentTarget.value);
        this.Dialog.data.content = content;
        this.Dialog.render(true);
    }

    _scrollTo(event) {
        event.preventDefault();
        console.log(event);
        const header = event.currentTarget;
        // Get the type of item to create.
        const target = header.dataset.target;
        //console.log(target);
        //console.log($.find("#" + target)[0].offsetTop);
        $(".window-content").animate(
            { scrollTop: $.find("#" + target)[0].offsetTop },
            600
        );
    }
    activateListeners(html) {
        super.activateListeners(html);

        //html.find("#displayrole").on("change", this._updateContent.bind(this));
        //console.log(html.find("#displayrole"));
        html.find("#displayrole").change(this._updateContent.bind(this));
        html.find(".paths").click(this._scrollTo.bind(this));
    }
}
