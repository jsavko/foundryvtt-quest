export class QuestTextEditor extends TextEditor {

    static async enrichHTML(content, options={}) {
        super.enrichHTML(content, options);


    }

    static _createCost (match) {
        const a = document.createElement("a");
        a.innerHTML = '<i class="cost">' + match[2] + "</i>";
        return a;
    };

    static _createDamage (match) {
        const a = document.createElement("a");
        a.innerHTML = '<i class="damage">' + match[2] + "</i>";
        return a;
    };

}
