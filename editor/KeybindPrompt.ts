/* Basic Prompt Implementation, for easily getting started on prompts.*/
import { HTML } from "imperative-html/dist/esm/elements-strict";
import { Prompt } from "./Prompt";
import { SongDocument } from "./SongDocument";


const { button, div, h2 } = HTML;

export class ExamplePrompt implements Prompt {
    private readonly _cancelButton: HTMLButtonElement = button({ class: "cancelButton" });
    private readonly _okayButton: HTMLButtonElement = button({ class: "okayButton", style: "width: 32%; font-size: 15px;" }, "Confirm");

    public readonly container: HTMLDivElement = div({ class: "prompt noSelection", style: "width: 500px;" },
        h2("Hello world!"),
        div({ style: "display: flex; flex-direction: row-reverse; justify-content: space-between;" },
            this._okayButton,
        ),
        this._cancelButton,
    );

    constructor(private _doc: SongDocument) {
        this._okayButton.addEventListener("click", this._saveChanges);
        this._cancelButton.addEventListener("click", this._close);
    }

        private _close = (): void => { 
        this._doc.undo();
    }
        
    public cleanUp = (): void => { 
        this._okayButton.removeEventListener("click", this._saveChanges);
        this._cancelButton.removeEventListener("click", this._close);
    }
        
    private _saveChanges = (): void => {
        this._doc.prompt = null;
    }
}
