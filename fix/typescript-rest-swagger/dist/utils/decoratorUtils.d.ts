import * as ts from 'typescript';
export declare function getDecorators(node: ts.Node, isMatching: (identifier: DecoratorData) => boolean): DecoratorData[];
export declare function getDecoratorName(node: ts.Node, isMatching: (identifier: DecoratorData) => boolean): string | undefined;
export declare function getDecoratorTextValue(node: ts.Node, isMatching: (identifier: DecoratorData) => boolean): string | undefined;
export declare function getDecoratorOptions(node: ts.Node, isMatching: (identifier: DecoratorData) => boolean): {
    [key: string]: any;
} | undefined;
export declare function isDecorator(node: ts.Node, isMatching: (identifier: DecoratorData) => boolean): boolean;
export interface DecoratorData {
    text: string;
    arguments: Array<any>;
    typeArguments: Array<any>;
}
