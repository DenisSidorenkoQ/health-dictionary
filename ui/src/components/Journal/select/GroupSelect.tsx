import * as React from "react";
import {FormControl, InputLabel, MenuItem, Select, SelectChangeEvent} from "@mui/material";
import {Group} from "../../../model/GroupState";


const GroupSelect = (groupList: Array<Group>, selectedGroupId: number, setSelectedGroupId: any) => {
    const handleGroupChange = (event: SelectChangeEvent) => {
        const groupId = parseInt(event.target.value);

        setSelectedGroupId(groupId);
    };

    if(groupList.length === 0) return;
    return (
        <div>
            <FormControl sx={{m: 1, minWidth: 80}}>
                <InputLabel id="Groups">Groups</InputLabel>
                <Select
                    labelId="Groups"
                    id="Groups"
                    value={selectedGroupId.toString()}
                    onChange={handleGroupChange}
                    label="Groups"
                    sx={{width: 300}}
                >
                    {
                        groupList.map((group) => (
                            <MenuItem key={group.id} value={group.id}>{group.name}</MenuItem>
                        ))
                    }
                </Select>
            </FormControl>
        </div>
    )

};

export default GroupSelect;
