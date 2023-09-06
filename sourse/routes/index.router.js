const router = require('express').Router();
const bcrypt = require('bcrypt');
const Main = require('../views/Main');
const Registration = require('../views/Registration');
const Login = require('../views/Login');
const Profile = require('../views/Profile');
const Forum = require('../views/Forum');
const NewPost = require('../views/NewPost');
const renderTemplate = require('../lib/renderTemplate');
const { User, Post, Comment } = require('../../db/models');

router.get('/', (req, res) => {
  renderTemplate(Main, { user: req.session.user }, res);
});

router.get('/registration', (req, res) => {
  renderTemplate(Registration, {}, res);
});

router.post('/registration', async (req, res) => {
  try {
    const {
      name, password, email, faction,
    } = req.body;
    const hashPassword = await bcrypt.hash(password, 10);
    let userreputa = '';
    if (faction === 'Wastlander') {
      userreputa = 'Выживающий';
    } else if (faction === 'Brotherhood') {
      userreputa = 'Инициат';
    } else if (faction === 'NCR') {
      userreputa = 'Пехотинец НКР';
    } else if (faction === 'Legion') {
      userreputa = 'Легионер';
    } else if (faction === 'Raider') {
      userreputa = 'Торчок-Рейдер';
    } else if (faction === 'Supermutants') {
      userreputa = 'Тупая башка';
    } else if (faction === 'Enclave') {
      userreputa = 'Патриот';
    } else if (faction === 'Robot') {
      userreputa = 'Протектрон';
    } else if (faction === 'Tribal') {
      userreputa = 'Дикарь';
    } else if (faction === 'Vault-dweller') {
      userreputa = 'Только что прошел G.O.A.T';
    } else if (faction === 'Shi') {
      userreputa = 'Прислужник армии';
    } else if (faction === 'Follower') {
      userreputa = 'Начинающий Последователь';
    } else if (faction === 'Ghoul') {
      userreputa = 'Парень, которому не повезло с радиацией';
    }
    const user = await User.create({
      name, password: hashPassword, email, faction, reputation: userreputa,
    });
    const rawData = user.get({ plain: true });
    console.log(rawData);
    req.session.user = {
      id: user.id,
      name: user.name,
    };
    res.redirect('/');
  } catch (err) {
    console.log(err);
  }
});

router.get('/login', (req, res) => {
  renderTemplate(Login, {}, res);
});

router.post('/login', async (req, res) => {
  try {
    const { name, password } = req.body;
    const user = await User.findOne({ where: { name }, raw: true });
    const checkPassword = await bcrypt.compare(password, user.password);
    if (checkPassword) {
      req.session.user = {
        id: user.id,
        name: user.name,
      };
      res.redirect('/');
    } else {
      res.redirect('/login');
    }
  } catch (err) {
    console.log(err);
  }
});

router.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.log(err);
      res.redirect('/');
    } else {
      res.clearCookie('Fallout');
      res.redirect('/');
    }
  });
});

router.get('/profile', async (req, res) => {
  try {
    const { id } = req.session.user;
    const person = await User.findOne({ where: { id }, raw: true });
    const forum = await Post.findAll({ where: { user_id: person.id } });
    const comment = await Comment.findAll({ where: { user_id: person.id } });
    renderTemplate(Profile, {
      user: req.session.user, person, forum, comment,
    }, res);
  } catch (err) {
    console.log(err);
  }
});

router.get('/forum', async (req, res) => {
  try {
    const posts = await Post.findAll({ include: User, nest: true, raw: true });
    for (let i = 0; i < posts.length; i += 1) {
      const comment = await Comment.findAll({ where: { id: i + 1 } });
      posts[i].comments = comment;
    }
    renderTemplate(Forum, { user: req.session.user, posts }, res);
  } catch (err) { console.log(err); }
});

router.get('/newpost', (req, res) => {
  renderTemplate(NewPost, { user: req.session.user }, res);
});

router.post('/newpost', async (req, res) => {
  try {
    const { title, body } = req.body;
    const { id } = req.session.user;
    await Post.create({ title, body, user_id: id });
    const posts = await Post.findAll({ where: { user_id: id }, raw: true });
    const comments = await Comment.findAll({ where: { user_id: id }, raw: true });
    const user = await User.findOne({ where: { id }, raw: true });
    if (posts.length + comments.length > 500) {
      if (user.faction === 'Brotherhood') {
        await User.update({ reputation: 'Старейшина' }, { where: { id } });
      } else if (user.faction === 'Wastlander') {
        await User.update({ reputation: 'Легенда Пустоши' }, { where: { id } });
      } else if (user.faction === 'Enclave') {
        await User.update({ reputation: 'Полковник Анклава' }, { where: { id } });
      } else if (user.faction === 'NCR') {
        await User.update({ reputation: 'Полковник НКР' }, { where: { id } });
      } else if (user.faction === 'Supermutants') {
        await User.update({ reputation: 'Бегемот' }, { where: { id } });
      } else if (user.faction === 'Robot') {
        await User.update({ reputation: 'Калькулятор' }, { where: { id } });
      } else if (user.faction === 'Tribal') {
        await User.update({ reputation: 'Вождь' }, { where: { id } });
      } else if (user.faction === 'Vault-dweller') {
        await User.update({ reputation: 'Смотритель' }, { where: { id } });
      } else if (user.faction === 'Shi') {
        await User.update({ reputation: 'Рука Императора' }, { where: { id } });
      } else if (user.faction === 'Follower') {
        await User.update({ reputation: 'Верховный последователь' }, { where: { id } });
      } else if (user.faction === 'Ghoul') {
        await User.update({ reputation: 'Бывалый светящийся' }, { where: { id } });
      } else if (user.faction === 'Raider') {
        await User.update({ reputation: 'Босс Банды' }, { where: { id } });
      } else if (user.faction === 'Legion') {
        await User.update({ reputation: 'Легат' }, { where: { id } });
      }
    } else if (posts.length + comments.length > 400) {
      if (user.faction === 'Brotherhood') {
        await User.update({ reputation: 'Паладин' }, { where: { id } });
      } else if (user.faction === 'Wastlander') {
        await User.update({ reputation: 'Бывалый искатель' }, { where: { id } });
      } else if (user.faction === 'Enclave') {
        await User.update({ reputation: 'Майор Анклава' }, { where: { id } });
      } else if (user.faction === 'NCR') {
        await User.update({ reputation: 'Майор НКР' }, { where: { id } });
      } else if (user.faction === 'Supermutants') {
        await User.update({ reputation: 'Овебрсс' }, { where: { id } });
      } else if (user.faction === 'Robot') {
        await User.update({ reputation: 'Разумный штурматрон' }, { where: { id } });
      } else if (user.faction === 'Tribal') {
        await User.update({ reputation: 'Правая рука вождя' }, { where: { id } });
      } else if (user.faction === 'Vault-dweller') {
        await User.update({ reputation: 'Руководство' }, { where: { id } });
      } else if (user.faction === 'Shi') {
        await User.update({ reputation: 'Агент Императора' }, { where: { id } });
      } else if (user.faction === 'Follower') {
        await User.update({ reputation: 'Старший исследователь' }, { where: { id } });
      } else if (user.faction === 'Ghoul') {
        await User.update({ reputation: 'Старый довенный гуль, что поведал некоторое дерьмо' }, { where: { id } });
      } else if (user.faction === 'Raider') {
        await User.update({ reputation: 'Любимчик Босса' }, { where: { id } });
      } else if (user.faction === 'Legion') {
        await User.update({ reputation: 'Центурион' }, { where: { id } });
      }
    } else if (posts.length + comments.length > 300) {
      if (user.faction === 'Brotherhood') {
        await User.update({ reputation: 'Старший рыцарь' }, { where: { id } });
      } else if (user.faction === 'Wastlander') {
        await User.update({ reputation: 'Опытный путешественник' }, { where: { id } });
      } else if (user.faction === 'Enclave') {
        await User.update({ reputation: 'Лейтенант Анклава' }, { where: { id } });
      } else if (user.faction === 'NCR') {
        await User.update({ reputation: 'Лейтенант НКР' }, { where: { id } });
      } else if (user.faction === 'Supermutants') {
        await User.update({ reputation: 'Мастер' }, { where: { id } });
      } else if (user.faction === 'Robot') {
        await User.update({ reputation: 'Штурматрон' }, { where: { id } });
      } else if (user.faction === 'Tribal') {
        await User.update({ reputation: 'Первый воин племени' }, { where: { id } });
      } else if (user.faction === 'Vault-dweller') {
        await User.update({ reputation: 'Исследователь Пустоши' }, { where: { id } });
      } else if (user.faction === 'Shi') {
        await User.update({ reputation: 'Командир Империи' }, { where: { id } });
      } else if (user.faction === 'Follower') {
        await User.update({ reputation: 'Дознаватель' }, { where: { id } });
      } else if (user.faction === 'Ghoul') {
        await User.update({ reputation: 'Бывший армейский гуль' }, { where: { id } });
      } else if (user.faction === 'Raider') {
        await User.update({ reputation: 'Чувак, что повидал некоторую дичь' }, { where: { id } });
      } else if (user.faction === 'Legion') {
        await User.update({ reputation: 'Деканус' }, { where: { id } });
      }
    } else if (posts.length + comments.length > 200) {
      if (user.faction === 'Brotherhood') {
        await User.update({ reputation: 'Рыцарь' }, { where: { id } });
      } else if (user.faction === 'Wastlander') {
        await User.update({ reputation: 'Провел в пустоше почти всю жизнь' }, { where: { id } });
      } else if (user.faction === 'Enclave') {
        await User.update({ reputation: 'Ветеран Анклава' }, { where: { id } });
      } else if (user.faction === 'NCR') {
        await User.update({ reputation: 'Ветеран НКР' }, { where: { id } });
      } else if (user.faction === 'Supermutants') {
        await User.update({ reputation: 'Мясник' }, { where: { id } });
      } else if (user.faction === 'Robot') {
        await User.update({ reputation: 'Часовой' }, { where: { id } });
      } else if (user.faction === 'Tribal') {
        await User.update({ reputation: 'Опытный воин' }, { where: { id } });
      } else if (user.faction === 'Vault-dweller') {
        await User.update({ reputation: 'Специалист' }, { where: { id } });
      } else if (user.faction === 'Shi') {
        await User.update({ reputation: 'Специалист Империи' }, { where: { id } });
      } else if (user.faction === 'Follower') {
        await User.update({ reputation: 'Уверенный доктор' }, { where: { id } });
      } else if (user.faction === 'Ghoul') {
        await User.update({ reputation: 'Я смирился со своей судьбой' }, { where: { id } });
      } else if (user.faction === 'Raider') {
        await User.update({ reputation: 'А может, стоит убить всех?' }, { where: { id } });
      } else if (user.faction === 'Legion') {
        await User.update({ reputation: 'Легионер-Ветеран' }, { where: { id } });
      }
    } else if (posts.length + comments.length > 100) {
      if (user.faction === 'Brotherhood') {
        await User.update({ reputation: 'Начинающий рыцарь' }, { where: { id } });
      } else if (user.faction === 'Wastlander') {
        await User.update({ reputation: 'Обычный житель пустоши' }, { where: { id } });
      } else if (user.faction === 'Enclave') {
        await User.update({ reputation: 'Солдат Анклава' }, { where: { id } });
      } else if (user.faction === 'NCR') {
        await User.update({ reputation: 'Сержант НКР' }, { where: { id } });
      } else if (user.faction === 'Supermutants') {
        await User.update({ reputation: 'Брут' }, { where: { id } });
      } else if (user.faction === 'Robot') {
        await User.update({ reputation: 'Мистер Гатси' }, { where: { id } });
      } else if (user.faction === 'Tribal') {
        await User.update({ reputation: 'Следопыт' }, { where: { id } });
      } else if (user.faction === 'Vault-dweller') {
        await User.update({ reputation: 'Обычный житель Убежища' }, { where: { id } });
      } else if (user.faction === 'Shi') {
        await User.update({ reputation: 'Солдат Империи' }, { where: { id } });
      } else if (user.faction === 'Follower') {
        await User.update({ reputation: 'Доктор' }, { where: { id } });
      } else if (user.faction === 'Ghoul') {
        await User.update({ reputation: 'Курю по сто пачек в день' }, { where: { id } });
      } else if (user.faction === 'Raider') {
        await User.update({ reputation: 'Что общего между Рейдером и Винтокрылом? Оба работают от винта' }, { where: { id } });
      } else if (user.faction === 'Legion') {
        await User.update({ reputation: 'Легионер-Прайм' }, { where: { id } });
      }
    } else if (posts.length + comments.length > 10) {
      if (user.faction === 'Brotherhood') {
        await User.update({ reputation: 'Уже не послушник' }, { where: { id } });
      } else if (user.faction === 'Wastlander') {
        await User.update({ reputation: 'Только покинул родной дом, в поисках приключений' }, { where: { id } });
      } else if (user.faction === 'Enclave') {
        await User.update({ reputation: 'Рекрут Анклава' }, { where: { id } });
      } else if (user.faction === 'NCR') {
        await User.update({ reputation: 'Копрал НКР' }, { where: { id } });
      } else if (user.faction === 'Supermutants') {
        await User.update({ reputation: 'Супермутант' }, { where: { id } });
      } else if (user.faction === 'Robot') {
        await User.update({ reputation: 'Мистер Помощник' }, { where: { id } });
      } else if (user.faction === 'Tribal') {
        await User.update({ reputation: 'Воин племени' }, { where: { id } });
      } else if (user.faction === 'Vault-dweller') {
        await User.update({ reputation: 'Молодой житель убежища' }, { where: { id } });
      } else if (user.faction === 'Shi') {
        await User.update({ reputation: 'Рекрут Империи' }, { where: { id } });
      } else if (user.faction === 'Follower') {
        await User.update({ reputation: 'Помощник Доктора' }, { where: { id } });
      } else if (user.faction === 'Ghoul') {
        await User.update({ reputation: 'Ну, не всё так плохо, хочу сказать вам' }, { where: { id } });
      } else if (user.faction === 'Raider') {
        await User.update({ reputation: 'Печень перестала работать' }, { where: { id } });
      } else if (user.faction === 'Legion') {
        await User.update({ reputation: 'Уже не пушечное мясо' }, { where: { id } });
      }
    }
    res.redirect('/forum');
  } catch (err) { console.log(err); }
});

router.get('*', (req, res) => {
  res.redirect('/');
});

module.exports = router;
