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
};

exports.get_login = (req, res) => {
  // console.log("---->", req.flash());
  res.render("accounts/login.html", { flashMessage: req.flash().error });
};

exports.post_login = (req, res) => {
  res.send('<script>alert("로그인 성공");\
  location.href="/accounts/success";</script>');
};

exports.get_success = (req, res) => {
  res.send(req.user);
};

exports.get_logout = (req, res) => {
  req.logout();
  res.redirect("/accounts/login");
};
