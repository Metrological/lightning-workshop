export default class Table extends lng.Component {

    static _template() {
        return {
            flex: {direction: 'column'},
            onUpdate: (view) => {
                if (view.core._hasUpdates) {
                    view._relayout()
                }
            },
            Head: {type: TableRow},
            Body: {flexItem: {alignSelf: 'stretch'}, flex: {direction: 'column'}},
            Top: {
                flexItem: false,
                rect: true,
                w: w=>w,
                h: 2,
                color: 0xFFAAAAAA
            }
        }
    }

    _construct() {
        this._verticalAlign = "center";
    }

    _relayout() {
        const columnWidths = this._getColumnWidths();
        this.tag("Body").children.forEach(row => {
            row.cells.forEach((cell, index) => {
                cell.w = columnWidths[index] - (cell.flex.paddingLeft + cell.flex.paddingRight);
            });
        });
    }

    _getColumnWidths() {
        const columnWidths = [];
        const head = this.tag("Head");
        head.cells.forEach((child, index) => {
            columnWidths[index] = child.finalW;
        });

        return columnWidths;
    }

    set head(v) {
        this.tag("Head").cells = v.map(v => v.v);
        this.tag("Head").cells.forEach((cell, index) => {
            cell.flexItem.grow = v[index].grow || 0;
        });
    }

    set rows(v) {
        this.tag("Body").children = v.map((row) => {
            return {type: TableRow, cells: row, verticalAlign: this._verticalAlign}
        });
    }

    set verticalAlign(v) {
        this._verticalAlign = v;
        this.tag("Head").verticalAlign = v;
        this.tag("Body").children.forEach(row => {
            row.verticalAlign = v;
        });
    }
}

class TableRow extends lng.Component {
    static _template() {
        return {
            flex: {direction: 'column'},
            flexItem: {alignSelf: 'stretch'},
            Cells: {flexItem: {alignItems: 'stretch'}, flex: {alignItems: 'center'}},
            BorderBottom: {flexItem: false, x: 0, w: w=>w, y: h=>h, h: 2, rect: true, color: 0xFFAAAAAA},
            BorderRight: {flexItem: false, x: w=>w, h: h=>h, y: 0, w: 2, rect: true, color: 0xFFAAAAAA}
        }
    }

    set verticalAlign(v) {
        this.tag("Cells").flex.alignItems = v;
    }

    set cells(v) {
        this.tag("Cells").children = v.map(cell => {
            return {type: TableCell, contents: cell}
        });
    }

    get cells() {
        return this.tag("Cells").children;
    }
}

class TableCell extends lng.Component {
    static _template() {
        return {
            flexItem: {grow: 1, alignSelf: 'stretch'},
            flex:{padding: 10, paddingLeft: 20},
            Contents: {y: 4},
            BorderLeft: {flexItem: false, w: 2, h: h=>h, y: 0, x: 0, rect: true, color: 0xFFAAAAAA}
        }
    }

    set label(v) {
        this.tag("Contents").text = {text: v};
    }

    set contents(v) {
        this.tag("Contents").patch(v);
    }

    get contents() {
        return this.tag("Contents");
    }

}