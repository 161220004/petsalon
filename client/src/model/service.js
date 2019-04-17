import request from '../util/request';

export default {

  namespace: 'service',

  state: {
    serviceList: []
  },

  effects: {
    *queryList({ _ }, { call, put }) {
      console.log('model - queryList: get/refresh page:');
      const rsp = yield call(request, '/api/service');
      console.log(rsp);
      yield put({ type: 'saveList', payload: { serviceList: rsp } });
    },

    *queryOne({ _ }, { call, put }) {
      console.log('model - queryOne: get/refresh page:');
      const rsp = yield call(request, `/api/service/${id}`);
      console.log(rsp);
      yield put({ type: 'saveList', payload: { serviceList: rsp } });
    },

    *editOne({ payload: { id, data } }, { call, put }) {
      console.log(`model - editOne: payload id = ${id}, data = ${JSON.stringify(data)}`);
      console.log('request, get response:');
      const rsp = yield call(request, `/api/service/${id}`, {
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
      const rsp = yield call(request, `/api/service/${id}`, {
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
      const rsp = yield call(request, '/api/service', {
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
    saveList(state, { payload: { serviceList } }) {
      return {
        ...state,
        serviceList,
      }
    },
  },
};
