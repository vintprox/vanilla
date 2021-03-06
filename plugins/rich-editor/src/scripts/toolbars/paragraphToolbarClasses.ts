/*
 * @author Stéphane LaFlèche <stephane.l@vanillaforums.com>
 * @copyright 2009-2019 Vanilla Forums Inc.
 * @license GPL-2.0-only
 */
import { formElementsVariables } from "@library/forms/formElementStyles";
import { unit } from "@library/styles/styleHelpers";
import { useThemeCache, styleFactory } from "@library/styles/styleUtils";
import { calc } from "csx";
import { richEditorVariables } from "@rich-editor/editor/richEditorVariables";

export const paragraphToolbarContainerClasses = useThemeCache(() => {
    const vars = richEditorVariables();
    const formVars = formElementsVariables();
    const style = styleFactory("paragraphToolbarContainer");

    const root = style({
        position: "absolute",
        left: calc(`50% - ${unit(vars.spacing.paddingLeft / 2)}`),
        $nest: {
            "&.isUp": {
                bottom: calc(`50% + ${unit(vars.spacing.paddingRight / 2 - formVars.border.width)}`),
            },
            "&.isDown": {
                top: calc(`50% + ${unit(vars.spacing.paddingRight / 2 - formVars.border.width)}`),
            },
        },
    });
    return { root };
});
