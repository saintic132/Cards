import React from 'react';
import SuperInputText from "../../../common/buttons/c1-SuperInputText/SuperInputText";
import SuperButton from "../../../common/buttons/c2-SuperButton/SuperButton";
import SuperCheckbox from "../../../common/buttons/c3-SuperCheckbox/SuperCheckbox";

export function Test() {
    return (
        <div>
            <SuperInputText/>
            <SuperButton>
                Hello
            </SuperButton>
            <SuperCheckbox/>
        </div>
    )
}