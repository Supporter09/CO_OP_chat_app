"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const React = tslib_1.__importStar(require("react"));
const PREDEFINED_LAYOUTS = new Map([
    [1, ['"x0"', 1, 1]],
    [2, ['"x0 x1"', 1, 2]],
    [3, ['"x0 x1" "x0 x2"', 2, 2]]
]);
function getGridTemplateAreas(numberOfItems) {
    if (PREDEFINED_LAYOUTS.has(numberOfItems)) {
        return PREDEFINED_LAYOUTS.get(numberOfItems)[0];
    }
    const columns = getGridTemplateColumns(numberOfItems);
    const rows = getGridTemplateRows(numberOfItems);
    const gridTemplateRows = [];
    for (let i = 0; i < rows; i++) {
        const row = [];
        for (let j = 0; j < columns; j++) {
            row.push('x' + (i * columns + j).toString(16));
        }
        gridTemplateRows.push(`"${row.join(' ')}"`);
    }
    return gridTemplateRows.join(' ');
}
function getGridTemplateColumns(numberOfItems) {
    if (PREDEFINED_LAYOUTS.has(numberOfItems)) {
        return PREDEFINED_LAYOUTS.get(numberOfItems)[2];
    }
    return Math.ceil(Math.pow(numberOfItems, 0.5));
}
function getGridTemplateRows(numberOfItems) {
    if (PREDEFINED_LAYOUTS.has(numberOfItems)) {
        return PREDEFINED_LAYOUTS.get(numberOfItems)[1];
    }
    return Math.ceil(numberOfItems / Math.ceil(Math.pow(numberOfItems, 0.5)));
}
function getGridArea(index) {
    return 'x' + index.toString(16);
}
function CellContainer(props) {
    return (React.createElement("div", { style: {
            display: 'flex',
            gridArea: getGridArea(props.index),
            overflow: 'hidden'
        } }, props.content));
}
function GridContainer(props) {
    return (React.createElement("div", { id: props.id, className: props.className, style: {
            display: 'grid',
            gridTemplateAreas: getGridTemplateAreas(props.itemCount),
            gridTemplateColumns: `repeat(${getGridTemplateColumns(props.itemCount)}, 1fr)`,
            gridTemplateRows: `repeat(${getGridTemplateRows(props.itemCount)}, 1fr)`
        } }, props.content));
}
/**
 * @description
 *
 * @public
 *
 */
class GridLayout extends React.Component {
    render() {
        const items = this.props.items;
        const rendered = [];
        let index = 0;
        for (const item of items) {
            const renderedItem = this.props.renderCell(item);
            if (renderedItem) {
                rendered.push(React.createElement(CellContainer, { index: index, key: index, content: renderedItem }));
                index += 1;
            }
        }
        return (React.createElement(GridContainer, { id: this.props.id, className: this.props.className, itemCount: rendered.length, content: rendered }));
    }
}
exports.default = GridLayout;
