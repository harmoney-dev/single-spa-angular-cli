import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';

declare const window: any;
window.singleSpaAngularCli = window.singleSpaAngularCli || {};

export class Platform {

    name: string;
    microRouter: any;

    mount(name: string, microRouter?: any): Observable<any> {
        this.name = name;
        this.microRouter = microRouter;
        return Observable.create((observer: Observer<any>) => {
            if (this.isSingleSpaApp()) {
                window.singleSpaAngularCli[this.name] = window.singleSpaAngularCli[this.name] || {};
                window.singleSpaAngularCli[this.name].mount = (props: any) => {
                    observer.next({ props, attachUnmount: this.unmount.bind(this) });
                    observer.complete();
                };
            } else {
                observer.next({ props: {}, attachUnmount: this.unmount.bind(this) });
                observer.complete();
            }
        });
    }

    unmount(module: any) {
        if (this.isSingleSpaApp()) {
            window.singleSpaAngularCli[this.name].router = module.injector.get(this.microRouter);
            window.singleSpaAngularCli[this.name].unmount = () => {
                if (module) {
                    const router = window.singleSpaAngularCli[this.name].router;
                    if (router) {
                        module.injector.get(router).dispose();
                    }
                    module.destroy();
                }
            };
        }
    }

    private isSingleSpaApp(): boolean {
        return window.singleSpaAngularCli.isSingleSpa;
    }
}
