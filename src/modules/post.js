import { handleActions, createAction} from 'redux-actions';

import axios from 'axios';
import produce from 'immer';
import { pender } from 'redux-pender';

function getPostAPI(postId) {
    return axios.get(`https://jsonplaceholder.typicode.com/posts/${postId}`);
}

const GET_POST = 'GET_POST'/* 
const GET_POST_PENDING = 'GET_POST_PENDING';
const GET_POST_SUCCESS = 'GET_POST_SUCCESS';
const GET_POST_FAILURE = 'GET_POST_FAILURE'; */

export const getPost = createAction(GET_POST,getPostAPI);

/* const getPostPending = createAction(GET_POST_PENDING);
const getPostSuccess = createAction(GET_POST_SUCCESS);
const getPostFailure = createAction(GET_POST_FAILURE); */


/* export const getPost = (postId) => ({
    type: GET_POST,
    payload: getPostAPI(postId)
}); */

//redux-thunk 일 경우
/* export const getPost = (postId) => dispatch => {
    dispatch(getPostPending());

    return getPostAPI(postId).then((response) => {

        dispatch(getPostSuccess(response))

        return response;

    }).catch( error => {
        dispatch(getPostFailure(error));

        throw(error);
    })
} */

const initialState = {
    // 요청이 진행 중인지, 오륙 발생했는지 여부는 더 이상 직접 관리할 필요가 없다.
    // penderReducer가 담당
    /* pending: false,
    error: false, */
    data: {
        title: '',
        body: ''
    }
}

/* export default handleActions({
    [GET_POST_PENDING] : (state, action) => {
        produce(state, draft => {
            draft.pending = true;
        })
    },        
    [GET_POST_SUCCESS] : (state, action) => {
        const { title , body } = action.payload.data;
        return produce(state, draft => {
            draft.pending = false;
            draft.data = {
                title,
                body
            }
        })
    },
    [GET_POST_FAILURE] : (state, action) => 
        produce(state, draft => {
            draft.pending = false;
            draft.error = true;
        })
       
},initialState); */

export default handleActions({
    ...pender({
        type: GET_POST,

        onSuccess: (state, action) => {

            const { title , body } = action.payload.data;
            return produce(state, draft => {
                draft.data = {
                    title,
                    body
                }
            })
        },
        onCancel : (state, action) => {
            console.log('onCancel');
            return produce(state, draft => {
                draft.data = {
                    title : '취소됨',
                    body : '취소됨'
                }
            })
        }
    })
},initialState);