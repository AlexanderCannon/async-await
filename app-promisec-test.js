const users = [
  {
    id: 1,
    name: 'Tarquin',
    schoolId: 2
  },
  {
    id: 2,
    name: 'Quentin',
    schoolId: 1
  }
];
const grades = [
  {
    id: 1,
    schoolId: 2,
    grade: 88
  }, {
    id: 2,
    schoolId: 1,
    grade: 40
  }, {
    id: 3,
    schoolId: 2,
    grade: 70
  }, {
    id: 4,
    schoolId: 2,
    grade: 49
  }, {
    id: 5,
    schoolId: 1,
    grade: 90
  }
];

const getUser = (id) => {
  return new Promise((resolve, reject) => {
    const user = users.find((user) => user.id == id);
    if (user) {
      resolve(user);
    } else {
      reject('Unable to find user');
    }
  });
};
const getGrades = (schoolId) => {
  return new Promise((resolve, reject) => {
    resolve(grades.filter((grade) => grade.schoolId == schoolId))
  });
};

const getStatus = (userId) => {
  let user;
  return getUser(userId).then((res) => {
    user = res;
    return getGrades(user.schoolId).then((grades) => {
      let average = 0;
      if (grades.length > 0) {
        average = grades.map((grade) => grade.grade).reduce((a, b) => a + b) / grades.length;
      }
      return `${user.name} has an average of ${average}%.`
    });
  });
};

const getStatusAwait = async (userId) => {
  const user = await getUser(userId);
  const grades = await getGrades(user.schoolId);
  let average = 0;
  if (grades.length > 0) {
    average = grades.map((grade) => grade.grade).reduce((a, b) => a + b) / grades.length;
  }
  return `${user.name} has an average of ${average}%.`;
};


getStatusAwait(1).then((res) => {
  console.log(res);
}).catch((e) => console.log(e));

// getUser(1).then((user) => {
//   console.log(user);
// }).catch((e) => {
//   console.log(e);
// });
// getGrades(2).then((grades) => {
//   console.log(grades);
// }).catch((e) => {
//   console.log(e);
// });
// getStatus(3).then((status) => {
//   console.log(status);
// }).catch((e) => {
//   console.log(e);
// })