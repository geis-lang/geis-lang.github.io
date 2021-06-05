export interface Guide extends GuideReference {
    subsections: GuideSection[];
    content: string;
}
export interface GuideSection {
    name: string;
    slug: string;
}
export interface GuideReference {
    number: number;
    filename: string;
    section: string;
    slug: string;
    title: string;
}
export interface Section {
    name: string;
    guides: GuideReference[];
}
export interface BlogPost {
    slug: string;
    title: string;
    author: string;
    summary: string;
    category: string;
    date: Date;
}
export interface Release extends Pick<BlogPost, 'slug' | 'title' | 'date'> {
}
export interface Usecase extends Pick<BlogPost, 'slug' | 'title'> {
    tags: string[];
}
//# sourceMappingURL=types.d.ts.map