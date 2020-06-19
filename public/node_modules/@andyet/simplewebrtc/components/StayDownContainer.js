"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const React = tslib_1.__importStar(require("react"));
const staydown_1 = tslib_1.__importDefault(require("staydown"));
/**
 * @description
 *  The `<StayDownContainer/>` component forces its view to stay pinned to the bottom of its scrollable area, unless the user scrolls away from the bottom.
 *
 * It's especially suited for chat UIs so that new messages are displayed at the bottom but still kept visible unless the user has scrolled back to read past messages.
 *
 * @public
 *
 */
class StayDownContainer extends React.Component {
    render() {
        return (React.createElement("div", Object.assign({}, this.props, { ref: (el) => {
                if (!el) {
                    return;
                }
                const staydown = new staydown_1.default({ target: el, stickyHeight: 30 });
                if (this.staydown) {
                    staydown.intend_down = this.staydown.intend_down;
                    staydown.userScroll = this.staydown.userScroll;
                }
                this.staydown = staydown;
                this.staydown.checkdown();
            } })));
    }
}
exports.default = StayDownContainer;
