export interface Options {
    name: string;
    selector: string;
    baseHref: string;
    styles?: string[];
    scripts?: string[];
    legacyModuleName?: string;
    legacy?: boolean;
}
