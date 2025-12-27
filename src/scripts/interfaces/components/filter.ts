export const filter = {
    vars: {
        queries: {
            component: '*[data-component=filter]',
        },
    },

    init() {
        const $filter = document.querySelector(this.vars.queries.component)

        if (!$filter) {
            return
        }

        this.addEventTrigger()
    },

    addEventTrigger() {},
}
