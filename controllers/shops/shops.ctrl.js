const models = require("../../models");

exports.get_shops_detail = async (req, res) => {
  try {
    const shop = await models.Shops.findOne({
      where: { id: req.params.id },
      include: ["Menu", "LikeUser", "Tag"],
    });

    let active = false;
    if (req.isAuthenticated()) {
      const user = await models.User.findByPk(req.user.id);
      active = await shop.hasLikeUser(user);
    }

    const countLike = await shop.countLikeUser();

    let cartList = {}; //장바구니 리스트
    //쿠키가 있는지 확인해서 뷰로 넘겨준다
    let cartLength = 0;
    let sameShops = true;

    if (typeof req.cookies.cartList !== "undefined") {
      //장바구니데이터
      cartList = JSON.parse(unescape(req.cookies.cartList));

      cartLength = Object.keys(cartList).length;
      // console.log("--->cartList", cartList);

      for (let key in cartList) {
        if (cartList[key].shop_id !== parseInt(req.params.id)) sameShops = false;

        // console.log("11111111", cartList[key].shop_id);
        // console.log("22222222", req.params.id);
        // console.log("333333", cartList[key].shop_id !== parseInt(req.params.id));
      }
    }

    res.render("shops/detail.html", { shop, countLike, active, cartLength, sameShops });
  } catch (e) {}
};

exports.post_shops_like = async (req, res) => {
  try {
    const shop = await models.Shops.findByPk(req.params.shop_id);
    const user = await models.User.findByPk(req.user.id);

    const status = await shop.addLikeUser(user);

    res.json({
      status,
    });
  } catch (e) {
    console.log(e);
  }
};

exports.delete_shops_like = async (req, res) => {
  try {
    const shop = await models.Shops.findByPk(req.params.shop_id);
    const user = await models.User.findByPk(req.user.id);

    await shop.removeLikeUser(user);
    res.json({
      message: "success",
    });
  } catch (e) {
    console.log(e);
  }
};
