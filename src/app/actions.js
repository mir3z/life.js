export const CHANGE_VIEW = "app/change-view";
export const REGISTER_NAVIGATION_ITEM = "app/register-navigation-item";

export function changeView(...views) {
    return { type: CHANGE_VIEW, views };
}

export function registerNavigationItem({ label, path, data }) {
    return { type: REGISTER_NAVIGATION_ITEM, label, path, data };
}