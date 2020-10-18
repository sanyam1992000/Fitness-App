import axios from 'axios';

export const fetchAllTrainings = () => async dispatch => {
  const res = await axios.post(
    'http://e5fca0c265ac.ngrok.io/graphql',
    {
      query:
        `{
          allTrainings {
            edges {
              node {
                id
                title
                description
                date
              }
            }
          }
        }`
    }
  );

  const trainingData = res.data.data.allTrainings.edges;
  dispatch({ type: 'FETCH_ALL_SCHEDULE', payload: trainingData });
}

export const fetchOneTrainings = (tid) => async dispatch => {
  const res = await axios.post('http://e5fca0c265ac.ngrok.io/graphql', {
    query: `
            {
                allTrainings (id:"${tid}"){
                  edges {
                    node {
                      id
                      title
                      description
                      date
                      sections {
                        edges {
                          node {
                            id
                            time
                            subtopics {
                              edges {
                                node {
                                  id
                                  title
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }`
  });

  const trainingData = res.data.data.allTrainings.edges;
  dispatch({ type: 'FETCH_SINGLE_SCHEDULE', payload: trainingData });
}


export const addTraining = (newSchedule) => async (dispatch) => {

  const trainRes = await axios.post(
    'http://e5fca0c265ac.ngrok.io/graphql',
    {
      query: `
      mutation{
           createTraining(input: {title: "${newSchedule.title}", description: "${newSchedule.description}", date: "${newSchedule.date}"}){
             training {
               id
               title
               description
               date
             }
           }
         }`
    });

  newSchedule.sections.forEach(section => {

    let sectionRes = await axios.post(
      'http://e5fca0c265ac.ngrok.io/graphql',
      {
        query: `mutation{
               createSection(input: {training: "${trainRes.data.data.training.title}" ,title: "${section.title}", time: "${section.time}"}){
                 section {
                   id
                   time
                   title
                 }
               }
             }`

      });

    section.subtopics.forEach(subtopic => {
      let subtopicRes = await axios.post(
        'http://e5fca0c265ac.ngrok.io/graphql',
        {
          query: `
           mutation{
               createSubtopic (input: {training: "${trainRes.data.data.training.title}" , section: "${section.title}", title: "${subtopic}"}){
                 subtopic {
                   id
                   title
                 }
               }
             }
          `
        }
      )
    })

  });



  dispatch({ type: 'UPDATE_TRAINING_SCHEDULE');
}

// {
//     "data": {
//         "allTrainings": {
//             "edges": [
//                 {
//                     "node": {
//                         "id": "VHJhaW5pbmdUeXBlOjE=",
//                         "title": "Training 1",
//                         "description": "ackhsc",
//                         "date": "2020-10-16",
//                         "sections": {
//                             "edges": [
//                                 {
//                                     "node": {
//                                         "id": "U2VjdGlvblR5cGU6MQ==",
//                                         "time": "21:01:02",
//                                         "subtopics": {
//                                             "edges": [
//                                                 {
//                                                     "node": {
//                                                         "id": "U3VidG9waWNUeXBlOjE=",
//                                                         "title": "subtopic 1"
//                                                     }
//                                                 },
//                                                 {
//                                                     "node": {
//                                                         "id": "U3VidG9waWNUeXBlOjI=",
//                                                         "title": "Subtopic 2 of Section 1"
//                                                     }
//                                                 }
//                                             ]
//                                         }
//                                     }
//                                 },
//                                 {
//                                     "node": {
//                                         "id": "U2VjdGlvblR5cGU6Mg==",
//                                         "time": "00:43:56",
//                                         "subtopics": {
//                                             "edges": []
//                                         }
//                                     }
//                                 }
//                             ]
//                         }
//                     }
//                 }
//             ]
//         }
//     }
// }