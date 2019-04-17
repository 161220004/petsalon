import request from '../util/request';

export default {

  namespace: 'owners',

  state: {
    owner: [],
    ownersList: []
  },

  effects: {
    *queryList({ _ }, { call, put }) {
      console.log('model - queryList: get/refresh page:');
      const rsp = yield call(request, '/api/owners');
      console.log(rsp);
      yield put({ type: 'saveList', payload: { ownersList: rsp } });
    },

    *queryOne({ payload: { id } }, { call, put }) {
      console.log('model - queryOne: get/refresh page:');
      const rsp = yield call(request, `/api/owners/${id}`);
      console.log(rsp);
      yield put({ type: 'saveOne', payload: { owner: rsp } });
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
      console.log('successfully addOne');
      return rsp;
    },
    
    *editOne({ payload: { id, data } }, { call, put }) {
      console.log(`model - editOne: payload id = ${id}, data = ${JSON.stringify(data)}`);
      console.log('request, get response:');
      const rsp = yield call(request, `/api/owners/${id}`, {
        headers: {
          'content-type': 'application/json',
        },
        method: 'PUT',
        body: JSON.stringify(data)
      });
      console.log(rsp);
      console.log('succfully editOne');
      return rsp;
    },

    *deleteOne({ payload: id }, { call, put }) {
      console.log(`model - deleteOne: payload id = ${id}`);
      console.log('request, get response:');
      const rsp = yield call(request, `/api/owners/${id}`, {
        method: 'DELETE'
      });
      console.log(rsp);
      console.log('succfully deleteOne');
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
    
    saveOne(state, { payload: { owner } }) {
      return {
        ...state,
        owner,
      }
    },
  },
};
