/*
let data = [
  {
    id: 1,
    name: '张三',
    url: 'http://localhost:8000/owners/1',
    pets_url: 'http://localhost:8000/pets'
  },
  {
    id: 2,
    name: '李四',
    url: 'http://localhost:8000/owners/2',
    pets_url: 'http://localhost:8000/pets'
  },
  {
    id: 3,
    name: '王五',
    url: 'http://localhost:8000/owners/3',
    pets_url: 'http://localhost:8000/pets'
  }
];

export default {
  'get /api/owners': function (req, res, next) {
    setTimeout(() => {
      res.json({
        result: data,
      })
    }, 250)
  },
  'delete /api/owners/:id': function (req, res, next) {
    data = data.filter(v => v.id !== parseInt(req.params.id));
    console.log(req.params);
    console.log(req.body);
    setTimeout(() => {
      res.json({
        success: true,
      })
    }, 250)
  },
  'post /api/owners': function (req, res, next) {
    data = [...data, {
      ...req.body,
      id: data[data.length - 1].id + 1,
    }];
    console.log(req.params);
    console.log(req.body);
    res.json({
      success: true,
    });
  },
  'patch /api/owners/:id': function (req, res, next) {
    data = data.filter(v => v.id !== parseInt(req.params.id));
    data = [...data, {
      ...req.body,
      id: parseInt(req.params.id),
    }];
    console.log(req.params);
    console.log(req.body);
    setTimeout(() => {
      res.json({
        success: true,
      })
    }, 250)
  },
}
*/