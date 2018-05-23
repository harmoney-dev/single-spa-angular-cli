declare const history: History;

export class Router {

    routes: string[];
    defaultRoute: string;

    constructor() {
        this.routes = [];
    }

    matchRoute(prefix: string, isDefaultPage?: boolean): (location: Location) => boolean {
        this.routes.push(prefix);
        if (isDefaultPage) {
            this.defaultRoute = prefix;
        }
        return (location: Location): boolean => {
            if (prefix === '/**') {
                return true;
            }
            const route = this.routes.find(r => this.pathMatch(location, r));
            if (route) {
                return this.pathMatch(location, prefix);
            } else if (this.defaultRoute) {
                this.navigate(this.defaultRoute);
                return false;
            } else {
                return false;
            }
        }
    }

    public navigate(path: string): void {
        history.pushState(null, null, path);
    }

    private pathMatch(location: Location, path: string): boolean {
        const loc = location.pathname + location.search;
        return loc.indexOf(path) !== -1;
    }

}
