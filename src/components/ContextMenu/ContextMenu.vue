<template>
    <div class="context-menu" ref="popper" v-show="opened" tabindex="-1" @contextmenu.capture.prevent>
        <ul class="menu-container">
            <slot :contextData="contextData" />
        </ul>
    </div>
</template>

<script>
    import Popper from 'popper.js';
    // @vue/component
    export default {
        props: {
            boundariesElement: {
                type: String,
                default: 'body',
            },
        },
        data() {
            return {
                opened: false,
                contextData: {},
            };
        },
        methods: {
            open(evt, contextData) {
                this.opened = true;
                this.contextData = contextData;

                if (this.popper) {
                    this.popper.destroy();
                }

                this.popper = new Popper(this.referenceObject(evt), this.$refs.popper, {
                    placement: 'right-start',
                    modifiers: {
                        preventOverflow: {
                            boundariesElement: document.querySelector(this.boundariesElement),
                        },
                    },
                });

                // Recalculate position
                this.$nextTick(() => {
                    this.popper.scheduleUpdate();
                });
            },
            close() {
                this.opened = false;
                this.contextData = null;
            },
            referenceObject(evt) {
                const left = evt.clientX;
                const top = evt.clientY;
                const right = left + 1;
                const bottom = top + 1;
                const clientWidth = 1;
                const clientHeight = 1;

                function getBoundingClientRect() {
                    return {
                        left,
                        top,
                        right,
                        bottom,
                    };
                }

                const obj = {
                    getBoundingClientRect,
                    clientWidth,
                    clientHeight,
                };
                return obj;
            },
        },
        beforeUnmount() {
            if (this.popper !== undefined) {
                this.popper.destroy();
            }
        },
    };
</script>

<style lang="scss" scoped>
    .context-menu {
        position: fixed;
        z-index: 999;
        overflow: hidden;
        background: #fff;
        border-radius: 4px;
        box-shadow: 0 1px 4px 0 #eee;
        min-width: 200px;

        &:focus {
            outline: none;
        }

        ul {
            padding: 0px;
            margin: 0px;
        }
        .overlay {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            z-index: 998;
        }
    }
</style>
