import { TranslationKeys } from "@/generated/translationKeys";

export declare type Primitive = null | undefined | string | number | boolean | symbol | bigint;
export declare type DeepPartial<T> = T extends Primitive ? T : {
    [P in keyof T]?: DeepPartial<T[P]>;
};
export declare type Dictionary<T> = Record<string, T>;
export interface Section {
    to?: string;
    icon?: JSX.Element;
    title?: TranslationKeys;
    description?: TranslationKeys;
}
export enum ErrorCode {
    ERR_BAD_REQUEST = 'ERR_BAD_REQUEST',
    ERR_NETWORK = 'ERR_NETWORK',
    ECONNABORTED = 'ECONNABORTED',
}
export interface Chapter {
    title: string;
    chapterNumber: number;
    dateUpdated: string;
    price: string;
    link: string;
}
export interface ComicHeading {
    recentRead: string;
    title: string;
    image: string;
    viewerCount: number;
    likesCount: number;
    numberOfChapter: number;
    author: string;
    genres: string;
    rated: string;
    description: string;
}
export interface Comic {
    heading: ComicHeading;
    chapters: Chapter[];
}