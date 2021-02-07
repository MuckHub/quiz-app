import { axios } from './axios';

export const getUserData = (email) => {
  return axios.get(`/users/?email=${email}`);
};

export const updateUserData = (id, data) => {
  return axios.put(`/users/${id}`, data);
};

export const addUserPack = async (email, data) => {
  const newPack = {
    id: data.id,
    title: data.title,
    questions: data.questions,
  };

  newPack.questions.map((el) => (el.correct = false));
  const userData = await getUserData(email);
  const newData = userData.data[0];
  newData.packs.push(newPack);
  await updateUserData(newData.id, newData);
};

export const removeUserPack = async (email, id) => {
  const userData = await getUserData(email);
  const newData = userData.data[0];
  const updatedPacks = newData.packs.filter((el) => el.id !== id);
  newData.packs = updatedPacks;
  await updateUserData(newData.id, newData);
};

export const resetUserPack = async (email, packId) => {
  const userData = await getUserData(email);
  const newData = userData.data[0];

  const packData = newData.packs.map((el) => {
    if (el.id === packId) {
      el.questions.forEach((el) => {
        el['correct'] = false;
      });
      return el;
    }
    return el;
  });
  newData.packs = packData;
  await updateUserData(newData.id, newData);
};

export const updateCorrectAnswer = async (email, data, question) => {
  const userData = await getUserData(email);

  const updatedUserData = userData.data[0].packs.map((el) => {
    if (el.id === data.id) {
      el.questions.map((el) => {
        if (el.question === question.question) {
          el.correct = true;
          return el;
        }
        return el;
      });
    }
    return el;
  });

  userData.data[0].packs = updatedUserData;
  await updateUserData(userData.data[0].id, userData.data[0]);
};

export const getUnansweredQuestions = async (email, packId) => {
  const userData = await getUserData(email);
  const packData = userData.data[0].packs.filter(
    (el) => el.id === parseInt(packId)
  );
  const activeQuestions = packData[0].questions.filter((el) => {
    if (el.correct === false) return el;
  });
  packData[0].questions = activeQuestions;
  return packData[0];
};
