"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomRenderer = void 0;
const marked_1 = require("marked");
class CustomRenderer extends marked_1.Renderer {
    constructor() {
        super(...arguments);
        this.subsections = [];
    }
    // @ts-expect-error
    heading(text, level, raw, slugger) {
        const slug = slugger.slug(text);
        this.subsections.push({ name: text, slug });
        return `<h${level} id=${slug} class="prose prose-2xl">${text}</h${level}>`;
    }
    // @ts-expect-error
    paragraph(text) {
        return `<p class="prose">${text}</p>`;
    }
    // codespan(text) {
    //     return `<code class="prose px-1 bg-primary-50 text-primary-900">${text}</code>`
    // }
    // codespan(text) {
    //     return `<code class="prose font-xs px-2 text-gray-400 bg-gray-800 py-0.5 rounded-sm">${text}</code>`
    // }
    // blockquote(text) {
    //     return `<blockquote class="px-1 bg-primary-50 text-primary-900">${text}</blockquote>`
    // }
    // @ts-expect-error
    list(body) {
        return `<ul class="prose">${body}</ul>`;
    }
    // @ts-expect-error
    listitem(text) {
        return `<li class="p-1 ml-10">${text}</li>`;
    }
}
exports.CustomRenderer = CustomRenderer;
//# sourceMappingURL=renderer.js.map