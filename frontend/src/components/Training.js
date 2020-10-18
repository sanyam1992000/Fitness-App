import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Timeline, TimelineItem } from 'vertical-timeline-component-for-react';
import * as actions from '../actions';
class Training extends Component {
    async componentDidMount() {
        this.props.fetchOneTrainings(this.props.match.params.training_id);
    }
    // render() { console.log(this.props.trainings); return <div>Hi</div> }

    render() {
        if (this.props.trainings) {
            let SectionTimelineContent = this.props.trainings.map((training, index) => {

                let sections = training.node.sections.edges.map((section, sectionIndex) => {



                    let subtopics = section.node.subtopics.edges.map((subtopic, subtopicIndex) => {

                        return (
                            <li key={subtopicIndex} >{subtopic.node.title}</li>
                        );
                    });


                    return (
                        <TimelineItem key={sectionIndex} dateText={training.node.date + " " + section.node.time} style={{ color: '#e86971' }}>

                            <h3>{/*secton title*/} </h3>
                            <h4>Subtopics</h4>
                            <ul>
                                {subtopics}
                            </ul>
                        </TimelineItem>

                    );
                });

                return (
                    <div>
                        <h1 style={{ display: 'flex', justifyContent: 'center' }}>{training.node.title}</h1>
                        <p style={{ display: 'flex', justifyContent: 'center' }}>{training.node.description}</p>

                        <Timeline lineColor="#004d40">
                            {sections}

                        </Timeline>
                    </div>
                )
            });

            return (
                <div>
                    {SectionTimelineContent}
                </div>
            );
        } else {
            return <div>Loading!!!</div>
        }
    }
}


const mapStateToProps = (state) => {
    return {
        trainings: state.rootReducer.singleTraining
    };
};

export default connect(mapStateToProps, actions)(Training);