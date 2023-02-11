import { Section } from "./type";

export const PATH_URL = {
    contact: 'section/contacts',
    formalities: '/section/formalities',
    funeralService: '/section/funeral-service',
    home: '/',
    prestations: '/section/prestations',
    signIn: '/sign-in',
    transportation: '/section/transportation',
};
export enum SectionId {
    Home = 'Home',
}
export const sections: Section[] = [
    {
        description: 'section.caseDetail',
        title: 'section.caseDetail',
        to: `/section/${SectionId.Home}`,
    },

];