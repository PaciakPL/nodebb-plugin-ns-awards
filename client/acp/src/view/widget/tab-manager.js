import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';

import {setSection} from '../../action/actions';
import AwardsListView from './awards-list-view';
import Rewarding from './rewarding';
import Management from './management';
import Rewards from './rewards';
import * as Sections from '../../model/sections';
import {getSection, getSections} from '../../model/selector/selectors';
import Settings from './settings';

class TabManager extends React.Component {
    createTabContent(section) {
        switch (section) {
            case Sections.SECTION_AWARDS:
                return <AwardsListView />;
            case Sections.SECTION_REWARDING:
                return <Rewarding/>;
            case Sections.SECTION_REWARDS:
                return <Rewards/>;
            case Sections.SECTION_MANAGEMENT:
                return <Management/>;
            case Sections.SECTION_SETTINGS:
                return <Settings/>;
        }
    }

    render() {
        return (
            <div>
                <ul className="nav nav-tabs">
                    {this.props.sections.map((section) => {
                        let {id, label} = section;
                        let icon, sectionClass = classNames({
                            'active': id === this.props.section
                        });
                        if (section.hasOwnProperty('icon')) {
                            icon = <i className={'fa ' + section.icon}></i>;
                        }
                        return (
                            <li key={id} className={sectionClass}>
                                <a href="#" onClick={() => this.props.updateSection(id)}>{icon} {label}</a>
                            </li>
                        );
                    })}
                </ul>

                <div className="tab-content">
                    <div className="tab-pane active">
                        {this.createTabContent(this.props.section)}
                    </div>
                </div>

            </div>
        );
    }
}

TabManager.propTypes = {
    section      : PropTypes.string,
    sections     : PropTypes.array,
    updateSection: PropTypes.func
};

export default connect(
    (state) => {
        return {
            section : getSection(state),
            sections: getSections(state)
        };
    },
    (dispatch) => {
        return {
            updateSection: (sectionName) => dispatch(setSection(sectionName))
        };
    }
)(TabManager);
