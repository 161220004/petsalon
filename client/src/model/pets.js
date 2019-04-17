import request from '../util/request';

export default {

  namespace: 'pets',

  state: {
    petsList: []
  },

  effects: {
    *queryList({ _ }, { call, put }) {
      const rsp = yield call(request, '/api/pets');
      console.log('get/refresh page:');
      console.log(rsp);
      yield put({ type: 'saveList', payload: { petsList: rsp } });
    },

    *queryOne({ _ }, { call, put }) {
      const rsp = yield call(request, `/api/pets/${id}`);
      console.log('get/refresh page:');
      console.log(rsp);
      yield put({ type: 'saveList', payload: { petsList: rsp } });
    },

    *editOne({ payload: { id, data } }, { call, put }) {
      console.log(`model - editOne: payload id = ${id}, data = ${JSON.stringify(data)}`);
      console.log('request, get response:');
      const rsp = yield call(request, `/api/pets/${id}`, {
        headers: {
          'content-type': 'application/json',
        },
        method: 'PUT',
        body: JSON.stringify(data)
      });
      console.log(rsp);
      console.log('succfully editOne');
      yield put({ type: 'queryList' });
      return rsp;
    },

    *deleteOne({ payload: id }, { call, put }) {
      console.log(`model - deleteOne: payload id = ${id}`);
      console.log('request, get response:');
      const rsp = yield call(request, `/api/pets/${id}`, {
        method: 'DELETE'
      });
      console.log(rsp);
      console.log('succfully deleteOne');
      yield put({ type: 'queryList' });
      return rsp;
    },

    *addOne({ payload: data }, { call, put }) {
      console.log(`model - addOne: payload data = ${JSON.stringify(data)}`);
      console.log('request, get response:');
      const rsp = yield call(request, '/api/pets', {
        headers: {
          'content-type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify(data),
      });
      console.log(rsp);
      console.log('successfully addOne');
      yield put({ type: 'queryList' });
      return rsp;
    },
  },

  reducers: {
    saveList(state, { payload: { petsList } }) {
      return {
        ...state,
        petsList,
      }
    },
  },
};
