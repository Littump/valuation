import {Box, Slider} from "@mui/material";

export function GraphRange({values, setFieldValue, min, max, theme}) {

    const handleChange = (event, newValue) => {
        setFieldValue(newValue);
    };
    return (
        <Box sx={{
            width:'80%'
        }}>
            <Slider
                color={theme}
                getAriaLabel={() => 'Temperature range'}
                value={values}
                min={min}
                max={max}
                onChange={handleChange}
                valueLabelDisplay="auto"
            />
        </Box>

    )
}