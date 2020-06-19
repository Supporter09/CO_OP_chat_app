"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const React = tslib_1.__importStar(require("react"));
const react_redux_1 = require("react-redux");
const Selectors_1 = require("../Selectors");
const StayDownContainer_1 = tslib_1.__importDefault(require("./StayDownContainer"));
class ChatListGroup extends React.Component {
    render() {
        let render = this.props.render;
        if (!render && typeof this.props.children === 'function') {
            render = this.props.children;
        }
        if (render) {
            return render(this.props);
        }
        if (this.props.children) {
            return this.props.children;
        }
        return (React.createElement("div", null,
            React.createElement("span", null, this.props.displayName),
            this.props.chats.map(chat => (React.createElement("div", null, chat.body)))));
    }
}
/**
 * @description
 *
 * @public
 *
 */
class ChatList extends React.Component {
    render() {
        const groups = this.props.groups || [];
        let render = this.props.render;
        if (!render && typeof this.props.children === 'function') {
            render = this.props.children;
        }
        if (render) {
            return render({ groups });
        }
        if (this.props.children) {
            return this.props.children;
        }
        return (React.createElement(StayDownContainer_1.default, { id: this.props.id, className: this.props.className }, groups.map(group => {
            if (this.props.renderGroup) {
                return this.props.renderGroup(group);
            }
            else {
                return React.createElement(ChatListGroup, Object.assign({}, group));
            }
        })));
    }
}
function mapStateToProps(state, props) {
    if (!props.room) {
        return {
            ...props,
            groups: []
        };
    }
    return {
        ...props,
        groups: Selectors_1.getGroupedChatsForRoom(state, props.room, props.maxGroupDuration) || []
    };
}
exports.default = react_redux_1.connect(mapStateToProps)(ChatList);
