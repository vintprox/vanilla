/*
 * @author Stéphane LaFlèche <stephane.l@vanillaforums.com>
 * @copyright 2009-2019 Vanilla Forums Inc.
 * @license GPL-2.0-only
 */

import React from "react";
import Quill from "quill/core";
import Formatter from "@rich-editor/quill/Formatter";
import DropDown from "@library/flyouts/DropDown";
import * as editorIcons from "@library/icons/editorIcons";
import ActiveFormatIcon from "@rich-editor/toolbars/pieces/ActiveFormatIcon";
import { ButtonTypes } from "@library/forms/buttonStyles";
import MenuItems from "@rich-editor/toolbars/pieces/MenuItems";
import ParagraphToolbarMenuItems from "@rich-editor/toolbars/pieces/ParagraphToolbarMenuItems";
import { IWithEditorProps, withEditor } from "@rich-editor/editor/context";

interface IProps extends IWithEditorProps {
    disabled?: boolean;
    renderAbove?: boolean;
    renderLeft?: boolean;
}

interface IState {
    hasFocus: boolean;
}

/**
 * Implemented ParagraphDropDown component, this is for mobile
 */
export class ParagraphDropDown extends React.PureComponent<IProps, IState> {
    private quill: Quill;
    private ID: string;
    private menuRef: React.RefObject<MenuItems> = React.createRef();
    private formatter: Formatter;

    constructor(props: IProps) {
        super(props);

        // Quill can directly on the class as it won't ever change in a single instance.
        this.quill = props.quill;
        this.formatter = new Formatter(this.quill);
        this.ID = this.props.editorID + "paragraphMenu";
        this.state = {
            hasFocus: false,
        };
    }

    public render() {
        return (
            <DropDown
                id={this.ID}
                className="mobileParagraphMenu-dropDown"
                buttonContents={editorIcons.pilcrow()}
                buttonBaseClass={ButtonTypes.ICON}
                disabled={this.props.disabled}
                renderAbove={this.props.renderAbove}
                renderLeft={this.props.renderLeft}
                contentsClassName="noMinWidth"
            >
                <ParagraphToolbarMenuItems
                    menuRef={this.menuRef}
                    formatter={this.formatter}
                    activeFormats={<ActiveFormatIcon activeFormats={this.props.activeFormats} />}
                    lastGoodSelection={this.props.lastGoodSelection}
                    onKeyDown={this.handlePilcrowKeyDown}
                />
            </DropDown>
        );
    }

    /**
     * Implement opening/closing keyboard shortcuts in accordance with the WAI-ARIA best practices for menuitems.
     *
     * @see https://www.w3.org/TR/wai-aria-practices/examples/menubar/menubar-2/menubar-2.html
     */
    private handlePilcrowKeyDown = (event: React.KeyboardEvent<any>) => {
        switch (event.key) {
            case "ArrowUp":
                event.preventDefault();
                this.setState({ hasFocus: true }, () => {
                    this.menuRef.current!.focusFirstItem();
                });
                break;
            case "ArrowDown":
                event.preventDefault();
                this.setState({ hasFocus: true }, () => {
                    this.menuRef.current!.focusLastItem();
                });
                break;
        }
    };
}

export default withEditor<IProps>(ParagraphDropDown);
