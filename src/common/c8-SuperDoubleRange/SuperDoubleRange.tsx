import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';

type PropsType = {
    value: number[],
    handleChange: (num1: number, num2: number) => void
    onMouseFunc?: () => void
    width?: string
}

export default function SuperDoubleRange(props: PropsType) {

    const useStyles = makeStyles({
        root: {
            width: 300,
        },
    });

    const classes = useStyles();

    const handleChange = (event: any, newValue: number | number[]) => {
        if (Array.isArray(newValue))
            props.handleChange(newValue[0], newValue[1])
    };

    const onMouseUpHandler = () => {
        debugger
        props.onMouseFunc && props.onMouseFunc()
    }

    const style = {
        marginLeft: '10px',
        width: props.width
    }

    return (
        <div className={classes.root} style={style}>
            <Slider
                value={props.value}
                onChange={handleChange}
                valueLabelDisplay="auto"
                aria-labelledby="range-slider"
                onMouseUp={onMouseUpHandler}
                max={110}
            />
        </div>
    )

}