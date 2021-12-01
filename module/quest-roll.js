export class QuestRoll extends Roll {
    constructor(...args) {
        super(...args);
    }

    /**
     * Render a DropRoll instance to HTML
     * @param {object} [chatOptions]      An object configuring the behavior of the resulting chat message.
     * @return {Promise<string>}          The rendered HTML template as a string
     */
    async render(chatOptions = {}) {
        chatOptions = foundry.utils.mergeObject(
            {
                user: game.user.id,
                flavor: null,
                template: this.constructor.CHAT_TEMPLATE,
                blind: false
            },
            chatOptions
        );

        // Execute the roll, if needed
        if (!this._evaluated) this.evaluate();

        // Define chat data
        let chatData = await questChatData(this, chatOptions);

        // Render the roll display template
        return renderTemplate(chatOptions.template, chatData);
    }

    static CHAT_TEMPLATE = "systems/quest/templates/dice/roll.html";
}

const questChatData = async (roll, chatOptions) => {
    const isPrivate = chatOptions.isPrivate;
    let outcome;
    let css;
    // Do some calcs
    if (roll.result == "20") {
        outcome = "Triumph";
        css = "triumph";
    } else if (roll.result > 11) {
        outcome = "Success";
        css = "success";
    } else if (roll.result > 6) {
        outcome = "Tough Choice";
        css = "touch-choice";
    } else if (roll.result > 1) {
        outcome = "Failure";
        css = "catastrophe";
    } else {
        outcome = "Catastrophe";
        css = "catastrophe";
    }

    return {
        formula: isPrivate ? "???" : roll._formula,
        flavor: isPrivate ? null : chatOptions.flavor,
        user: chatOptions.user,
        tooltip: isPrivate ? "" : await roll.getTooltip(),
        result: isPrivate ? "?" : roll.result,
        total: isPrivate ? "?" : roll.total,
        outcome: isPrivate ? "?" : outcome,
        css: isPrivate ? "?" : css
    };
};
