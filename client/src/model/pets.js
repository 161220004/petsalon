import request from '../util/request';

export default {

  namespace: 'pets',

  state: {
    pet: [],
    petsList: []
  },

  effects: {
    *queryList({ _ }, { call, put }) {
      console.log('model - queryList: get/refresh page:');
      const rsp = yield call(request, '/api/pets');
      console.log(rsp);
      yield put({ type: 'saveList', payload: { petsList: rsp } });
    },

    *queryOne({ payload: { id } }, { call, put }) {
      console.log('model - queryOne: get/refresh page:');
      const rsp = yield call(request, `/api/pets/${id}`);
      console.log(rsp);
      yield put({ type: 'saveOne', payload: { pet: rsp } });
    },

    *queryMine({ payload: { ownerId } }, { call, put }) {
      console.log('model - queryMine: get/refresh page:');
      const rsp = yield call(request, `/api/owners/${ownerId}/pets`);
      console.log(rsp);
      yield put({ type: 'saveList', payload: { petsList: rsp } });
    },

    *addOne({ payload: { ownerId, data } }, { call, put }) {
      console.log(`model - addOne: payload ownerId = ${ownerId}, data = ${JSON.stringify(data)}`);
      console.log('request, get response:');
      const rsp = yield call(request, `/api/owners/${ownerId}/pets`, {
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
      const rsp = yield call(request, `/api/pets/${id}`, {
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
      const rsp = yield call(request, `/api/pets/${id}`, {
        method: 'DELETE'
      });
      console.log(rsp);
      console.log('succfully deleteOne');
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

    saveOne(state, { payload: { pet } }) {
      return {
        ...state,
        pet,
      }
    },
  },
};
