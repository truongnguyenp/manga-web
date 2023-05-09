import styled from "@emotion/styled";
import { Modal } from "antd";

export enum SectionId {
    Home = 'Home',
}
export const DEFAULT_LANG = "vi";
export const PATH_ROUTE = {
    home: '/',
    login: '/login',
    profile: 'profile',
    register: '/register',
    section: '/section',
    view: '/view',
    comic: '/comic',
};
export const Role = {
    Admin: 'Admin',
    Translator: 'Translator',
} as const;
export const PATH_URL = {
    home: PATH_ROUTE.home,
    login: PATH_ROUTE.login,
    profile: {
        index: PATH_ROUTE.profile,
        account: {
            index: `${PATH_ROUTE.profile}/account`,
            original: './account',
        },
        myList: {
            index: `${PATH_ROUTE.profile}/my-list`,
            original: './my-list'
        }
    },
    register: '/register',
    section: '/section',
    view: '/view',
    comic: '/comic',
} as const;
export const StyledModal = styled(Modal)`
    .ant-modal{
        &-content {
        background-color: var(--secondary-color);
        color: var(--primary-color);
        }
        &-title{
        background-color: var(--secondary-color);
        }
    }
`