export const members = [
    { Id: 1, Name: 'Tom Cook', Type: "P", AccessType: "No Access" },
    { Id: 2, Name: 'Pradeep', Type: "P", AccessType: "No Access" },
    { Id: 3, Name: 'SheHulk', Type: "P", AccessType: "No Access" },
    { Id: 4, Name: 'Engineering', Type: "G", AccessType: "No Access" },
    { Id: 5, Name: 'Product', Type: "G", AccessType: "No Access"},
    { Id: 6, Name: 'HR', Type: "G", AccessType: "No Access" }]

export interface IListItem {
    Id: number,
    Name: string,
    Type: string,
    AccessType: string
}
export const store = {
    items: []
}
export interface Istate {
    Item: IListItem,
    state: any,
    dispatch: React.Dispatch<any>
}

export interface Idispatch {
    state: any,
    dispatch: React.Dispatch<any>
}


export function reducer(state: any, action: any) {
    switch (action.type) {
        case 'Add':
            const updateState = [...state.items];
            const updatedItemIndex = updateState.findIndex(item => item.Id === action.payload.Id);

            if (updatedItemIndex < 0) {
                updateState.push({ ...action.payload });
            }
            else {
                const updatedItem = {
                    ...updateState[updatedItemIndex]
                };
                updatedItem.AccessType = action.payload.AccessType;
                updateState[updatedItemIndex] = updatedItem;
            }
            return { ...state, items: updateState };
        default:
            return state;
    }
}


function stringToColor(string: string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string?.length; i += 1) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';

    for (i = 0; i < 3; i += 1) {
        const value = (hash >> (i * 8)) & 0xff;
        color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
}

export function stringAvatar(name: string) {
    return {
        sx: {
            bgcolor: stringToColor(name),
        },
        children: `${name?.split(' ')[0][0]}`,
    };
}
