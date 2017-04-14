import {applyMiddleware, createStore} from 'redux';
import ReduxThunk from 'redux-thunk';

import {
    awards,
    creationActive,
    editAt,
    editAwards,
    newAwardName,
    newAwardDescription,
    newAwardPreview,
    section,
    userHighlight,
    username,
    users,
    uploadPath
} from './reducers';
import * as Sections from './sections';

export function createReduxStore(state) {
    return createStore((state, action) => {
        return {
            awards             : awards(state.awards, action),
            creationActive     : creationActive(state.creationActive, action),
            editAt             : editAt(state.editAt, action),
            editAwards         : editAwards(state.editAwards, action),
            newAwardName       : newAwardName(state.newAwardName, action),
            newAwardDescription: newAwardDescription(state.newAwardDescription, action),
            newAwardPreview    : newAwardPreview(state.newAwardPreview, action),
            section            : section(state.section, action),
            sections           : state.sections,
            userHighlight      : userHighlight(state.userHighlight, action),
            username           : username(state.username, action),
            users              : users(state.users, action),
            uploadPath         : uploadPath(state.uploadPath, action)
        };
    }, state, applyMiddleware(ReduxThunk));
}

export function getInitialState() {
    return {
        awards: [],

        creationActive: false,
        editAt        : null,
        editAwards    : {},

        newAwardDescription: null,
        newAwardName       : null,
        newAwardPreview    : null,

        section: Sections.SECTION_AWARDS,

        sections: [
            {label: 'Awards', icon: 'fa-trophy', id: Sections.SECTION_AWARDS},
            {label: 'Granting', id: Sections.SECTION_GRANTING},
            {label: 'Management', id: Sections.SECTION_MANAGEMENT},
            {label: 'Activity', id: Sections.SECTION_ACTIVITY},
            {label: 'Settings', id: Sections.SECTION_SETTINGS}
        ],

        userHighlight: null,
        username     : null,
        users        : [],

        uploadPath: null
    };
}
