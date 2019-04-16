import * as ownersOperation from '../operation/owners';
import request from '../util/request';

export default {

  namespace: 'owners',

  state: {
    ownersList: []
  },

  effects: {
    *queryList({ _ }, { call, put }) {
      //const rsp = yield call(ownersOperation.queryList);
      const rsp = yield call(request, '/api/owners');
      console.log(rsp);
      yield put({ type: 'saveList', payload: { ownersList: rsp } });
    },

    *queryOne({ _ }, { call, put }) {
      const rsp = yield call(ownersOperation.queryOne);
      console.log('queryOne');
      console.log(rsp);
      yield put({ type: 'saveList', payload: { ownersList: rsp } });
    },

    *editOne({ payload: { id, data } }, { call, put }) {
      const rsp = yield call(ownersOperation.editOne, id, data);
      // const rsp = yield call(request, `/api/owners/${id}`, {
      //   headers: {
      //     'content-type': 'application/json',
      //   },
      //   method: 'PATCH',
      //   body: JSON.stringify(data)
      // });
      console.log('editOne');
      console.log(rsp);
      yield put({ type: 'queryList' });
      return rsp;
    },

    *deleteOne({ payload: id }, { call, put }) {
      console.log(`model - deleteOne: payload id = ${id}`);
      console.log('request, get response:');
      const rsp = yield call(request, `/api/owners/${id}`, {
        method: 'DELETE'
      });
      console.log(rsp);
      console.log('succfully deleteOne, refresh page:');
      yield put({ type: 'queryList' });
      return rsp;
    },

    *addOne({ payload: data }, { call, put }) {
      console.log(`model - addOne: payload data = ${JSON.stringify(data)}`);
      console.log('request, get response:');
      const rsp = yield call(request, '/api/owners', {
        headers: {
          'content-type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify(data),
      });
      console.log(rsp);
      console.log('successfully addOne, refresh page:');
      yield put({ type: 'queryList' });
      return rsp;
    },
  },

  reducers: {
    saveList(state, { payload: { ownersList } }) {
      return {
        ...state,
        ownersList,
      }
    },
  },
};
