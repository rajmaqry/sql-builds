import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

interface ITabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function TabPanel(props: ITabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `basic-tab-${index}`,
        'aria-controls': `basic-tabpanel-${index}`,
    };
}


export interface IBasicTabProps {
    numTabs: number;
    tabPanels: any[];
    labels:string[];
    key?: string;
}
export function BasicTabs(props: IBasicTabProps) {
    const [value, setValue] = React.useState(0);
    const { numTabs, tabPanels, labels, key, ...other } = props

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs">
                    {tabPanels && tabPanels.length > 0 &&
                        tabPanels.map((panel, index) => (
                            <Tab label={labels[index]} {...a11yProps(index)} />
                        ))}
                </Tabs>
            </Box>
            {tabPanels && tabPanels.length > 0 &&
                tabPanels.map((panel, index) => (
                    <TabPanel value={value} index={index}>
                        {tabPanels[index]}
                    </TabPanel>
                ))}
        </Box>
    );
}
