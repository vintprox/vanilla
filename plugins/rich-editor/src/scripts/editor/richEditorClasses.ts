/*
 * @author Stéphane LaFlèche <stephane.l@vanillaforums.com>
 * @copyright 2009-2019 Vanilla Forums Inc.
 * @license GPL-2.0-only
 */
import {
    absolutePosition,
    appearance,
    colorOut,
    singleLineEllipsis,
    srOnly,
    unit,
    userSelect,
} from "@library/styles/styleHelpers";
import { globalVariables } from "@library/styles/globalStyleVars";
import { styleFactory, useThemeCache } from "@library/styles/styleUtils";
import { important, percent } from "csx";
import { richEditorVariables } from "@rich-editor/editor/richEditorVariables";

export const richEditorClasses = useThemeCache((legacyMode: boolean = false) => {
    const globalVars = globalVariables();
    const style = styleFactory("richEditor");
    const vars = richEditorVariables();

    const root = style({
        position: "relative",
        display: "block",
        $nest: {
            "&.isDisabled": {
                $nest: {
                    "&, &.richEditor-button": {
                        cursor: important("progress"),
                    },
                },
            },
            "& .richEditor-text, & .richEditor-textWrap, & .richEditor-frame": {
                display: "flex",
                flexDirection: "column",
                flexGrow: 1,
            },
            ".ql-clipboard": {
                ...srOnly(),
                position: "fixed", // Fixed https://github.com/quilljs/quill/issues/1374#issuecomment-415333651
            },
            ".richEditor-nextInput, .iconButton, .richEditor-button": {
                ...singleLineEllipsis(),
                ...appearance(),
                position: "relative",
                border: 0,
                padding: 0,
                background: "none",
                textAlign: "left",
            },
            ".Close-x": {
                display: "block",
                opacity: globalVars.states.icon.opacity,
                cursor: "pointer",
            },
            ".content-wrapper": {
                height: percent(100),
            },
            ".embedDialogue": {
                position: "relative",
            },
            ".ReactVirtualized__Grid": {
                minWidth: unit(252),
            },
        },
    });

    const menu = style("menu", {
        display: "inline-block",
        position: "relative",
    });

    const paragraphMenuHandle = style("paragraphMenuHandle", {
        width: unit(vars.paragraphMenuHandle.size),
        maxWidth: unit(vars.paragraphMenuHandle.size),
        minWidth: unit(vars.paragraphMenuHandle.size),
        height: unit(vars.paragraphMenuHandle.size),
    });

    const text = style("text", {
        position: "relative",
        whiteSpace: important("pre-wrap"),
        outline: 0,
    });

    const menuItems = style("menuItems", {
        "-ms-overflow-style": "-ms-autohiding-scrollbar",
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        flexWrap: "nowrap",
        listStyle: "none",
        padding: 0,
        margin: 0,
        zIndex: 1,
        $nest: {
            ".richEditor-menuItem": {
                display: "block",
                padding: 0,
                margin: 0,
                $nest: {
                    ".richEditor-button, &.richEditor-button": {
                        width: unit(vars.menuButton.size),
                        fontSize: unit((vars.menuButton.size * 24) / 39),
                        lineHeight: unit(vars.menuButton.size),
                        $nest: {
                            "&.emojiChar-🇺🇳": {
                                fontSize: unit(10),
                            },
                        },
                    },
                    "&:first-child .richEditor-embedButton": {
                        borderBottomLeftRadius: unit(globalVars.border.radius),
                    },
                    "&.isRightAligned": {
                        marginLeft: "auto",
                    },
                },
            },
        },
    });

    const button = style("button", {
        display: "block",
        ...userSelect(),
        cursor: "pointer",
        $nest: {
            "&.richEditor-formatButton, &.richEditor-embedButton": {
                height: unit(vars.menuButton.size),
                color: "inherit",
            },
            "&.emojiGroup": {
                display: "block",
                width: unit(vars.menuButton.size),
                height: unit(vars.menuButton.size),
                textAlign: "center",
                $nest: {
                    "&.isSelected": {
                        opacity: 1,
                    },
                },
            },
            "&:not(:disabled)": {
                cursor: "pointer",
            },
            "&:hover": {
                opacity: 1,
                cursor: "pointer",
            },
            "&:hover .Close-X, &:hover .richEditorButton-icon": {
                opacity: 1,
            },
            "&:focus": {
                opacity: 1,
                zIndex: 2,
            },
            "&:focus .Close-X, &:focus .richEditorButton-icon": {
                opacity: 1,
            },
            "&.isActive": {
                opacity: 1,
            },
            "&.isActive .Close-X, .isActive .richEditorButton-icon": {
                opacity: 1,
            },
            "&.isOpen": {
                opacity: 1,
            },
            "&.richEditor-formatButton:focus": {
                opacity: 1,
            },
        },
    });

    const menuItem = style("menuItem", {
        display: "block",
        padding: 0,
        margin: 0,
        $nest: {
            "& .richEditor-button, &.richEditor-button": {
                width: unit(vars.menuButton.size),
                height: unit(vars.menuButton.size),
                maxWidth: unit(vars.menuButton.size),
                fontSize: unit((vars.menuButton.size * 24) / 39),
                lineHeight: unit(vars.menuButton.size),
                $nest: {
                    "&.emojiChar-🇺🇳": {
                        fontSize: unit(14),
                    },
                },
            },
            "&.isRightAligned": {
                marginLeft: "auto",
            },
        },
    });

    const upload = style("upload", {
        display: important("none"),
    });

    const embedBar = style("embedBar", {
        display: "block",
        width: percent(100),
        padding: unit(vars.embedMenu.padding),
    });

    const icon = style("icon", {
        display: "block",
        margin: "auto",
        height: unit(globalVars.icon.sizes.default),
        width: unit(globalVars.icon.sizes.default),
        opacity: globalVars.states.icon.opacity,
    });

    const close = style("close", {
        ...absolutePosition.middleRightOfParent(),
        ...userSelect(),
        width: unit(vars.menuButton.size),
        height: unit(vars.menuButton.size),
        lineHeight: unit(vars.menuButton.size),
        verticalAlign: "bottom",
        textAlign: "center",
        background: "transparent",
        cursor: "pointer",
        opacity: globalVars.states.icon.opacity,
        $nest: {
            "&:hover, &:focus, &.focus-visible, &:active": {
                opacity: 1,
                cursor: "pointer",
                color: colorOut(globalVars.mainColors.primary),
            },
        },
    });

    const flyoutDescription = style("flyoutDescription", {
        marginBottom: ".5em",
    });

    return {
        root,
        menu,
        paragraphMenuHandle,
        text,
        menuItems,
        upload,
        embedBar,
        menuItem,
        button,
        icon,
        close,
        flyoutDescription,
    };
});