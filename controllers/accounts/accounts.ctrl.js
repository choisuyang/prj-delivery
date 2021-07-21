const models = require("../../models");
const User = require("../../models/User");

exports.get_join = (_, res) => {
  res.render("accounts/join.html");
};

exports.post_join = async (req, res) => {
  const userCheck = await models.User.findOne({
    where: {
      username: req.body.username,
    },
  });
  try {
    if (userCheck.dataValues.username !== req.body.username) {
      await models.User.create(req.body);
      res.send('<script>alert("회원가입 성공");\
      location.href="/accounts/login"</script>');
    } else {
      res.send('<script>alert("이미 존재하는 아이디입니다.");\
  location.href="/accounts/join"</script>');
    }
  } catch (e) {
    console.log(e);
  }
  // await models.User.create(req.body);
  // res.send('<script>alert("회원가입 성공");\
  // location.href="/accounts/login"</script>');
};

exports.get_login = (_, res) => {
  res.render("accounts/login.html");
};
