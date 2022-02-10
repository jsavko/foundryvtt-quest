export class InlineTables {
    static async parseInlineTables(a) {
        let content = { ...a.data }.content;
        let finalId = a.data._id;
        let depth = 0;
        let newContent = await this.handleMatches(content, depth);
        let theMessage = game.messages.get(finalId);
        console.log(theMessage);
        if (theMessage.data.user === game.userId) {
            await theMessage.update({ content: newContent });
        }
    }

    static async handleMatches(content, depth) {
        if (depth > 10) {
            throw new Error(
                `Help I'm trapped in a loop! You're calling the same table in a lower table.`
            );
        }
        let matches = content.match(/\[\[\~(.*?)\]\]/g);
        const lf = new Intl.ListFormat("en", { style: "narrow", type: "unit" });

        if (matches != null) {
            for (let match of matches) {
                let table = match.replace(`[[~`, ``).replace(`]]`, ``);
                let roll = await game.tables.getName(table).roll();
                //game.dice3d.showForRoll(roll);
                let resArray = [];
                resArray.push(
                    `<a class="inline-roll inline-result" title="` +
                        roll.roll._formula +
                        `" data-roll="` +
                        escape(JSON.stringify(roll.roll)) +
                        `"><i class="fas fa-dice-d20"></i> ` +
                        roll.roll._total +
                        `</a>`
                );
                //escape(JSON.stringify(roll));
                for (let result of roll.results) {
                    resArray.push(result.getChatText());
                }
                content = content.replace(match, lf.format(resArray));
            }
            depth += 1;
            return this.handleMatches(content, depth);
        } else if (matches == null) {
            return content;
        }
    }
}
