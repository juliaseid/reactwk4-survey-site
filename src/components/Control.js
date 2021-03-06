import React from 'react';
import { connect } from 'react-redux';
import { withFirestore } from 'react-redux-firebase';
import SurveyList from './SurveyList';
import AddSurvey from './AddSurvey';
import SurveyDetail from './SurveyDetail';
import * as a from './../actions/index';

function Control(props) {

  // handleAddingNewSurveyToList = () => {
  //   const { dispatch } = this.props;
  //   const action = a.toggleForm();
  //   dispatch(action);
  // }

  let detailsPage;

  if (props.selectedSurvey) {
    detailsPage = <SurveyDetail survey={props.selectedSurvey} />
  }

  function handleShowingDetailClick(id) {
    props.firestore.get({
      collection: 'surveys', doc: id
    }).then((survey) => {
      const firestoreSurvey = {
        name: survey.get('name'),
        title: survey.get('bookTitle'),
        author: survey.get('bookAuthor'),
        question1: survey.get('question1'),
        question2: survey.get('question2'),
        question3: survey.get('question3'),
        question4: survey.get('question4'),
        question5: survey.get('question5'),
        id: survey.get('id')
      }
      const { dispatch } = props;
      const action = a.selectSurvey(firestoreSurvey);
      dispatch(action)
    })
  }


  return (
    <React.Fragment>
      <SurveyList onShowDetailsClick={handleShowingDetailClick} />
      <AddSurvey />
      {detailsPage}
    </React.Fragment>
  )
}
const mapStateToProps = state => {
  return {
    selectedSurvey: state.selectedSurvey
  }
}

Control = connect(mapStateToProps)(Control);

export default withFirestore(Control);