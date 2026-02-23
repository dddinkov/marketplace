export const cartEvent = new Event("cartUpdated");

export function triggerCartUpdate() {
    window.dispatchEvent(cartEvent);
}