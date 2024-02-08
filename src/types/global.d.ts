declare module '*.module.scss' {
    interface IClassNames {
        [className: string]: string
    }
    const classNames: IClassNames;
    export = classNames;
}

declare const pdfjsLib: {
    getDocument: (url: string | ArrayBuffer | Uint8Array) => {
        promise: Promise<{
            numPages: number;
            getPage: (pageNumber: number) => Promise<{
                getTextContent: () => Promise<{
                    items: { str: string }[];
                }>;
            }>;
        }>;
    };
};


declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module "*.svg";
declare module "*.scss";

declare const __PLATFORM__: 'mobile' | 'desktop';
declare const __ENV__: 'production' | 'development';